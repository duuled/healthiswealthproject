#!/usr/bin/env node
/**
 * find-unmapped-websites.js
 *
 * Searches Google Maps (via Places API) for businesses matching a keyword + location,
 * then identifies website URLs that have NO linked / claimed Google Business Profile.
 *
 * Detection logic:
 *   A listing is flagged as "unmapped" when:
 *     1. It has a website URL in the Places record, AND
 *     2. The business profile is sparse: missing at least 2 of
 *        { opening_hours, formatted_phone_number, photos, rating }.
 *   Additionally the script fetches the website and checks whether it contains
 *   structured-data (JSON-LD LocalBusiness) that references a Google Maps place ID.
 *   If neither condition is met the listing is marked fully-linked.
 *
 * Usage:
 *   node scripts/find-unmapped-websites.js \
 *     --keyword "supplement store" \
 *     --location "Atlanta, GA" \
 *     --radius 10000 \
 *     --api-key YOUR_GOOGLE_PLACES_API_KEY \
 *     [--output results.csv]
 *
 * Environment variable alternative (takes priority if set):
 *   GOOGLE_PLACES_API_KEY=...
 *
 * Requires Node 18+ (native fetch). No extra npm packages needed.
 */

import { writeFileSync } from "fs";
import { parseArgs } from "util";

// ─── CLI args ──────────────────────────────────────────────────────────────────
const { values: args } = parseArgs({
  options: {
    keyword:  { type: "string", short: "k", default: "health store" },
    location: { type: "string", short: "l", default: "New York, NY" },
    radius:   { type: "string", short: "r", default: "5000" },
    "api-key":{ type: "string", short: "a" },
    output:   { type: "string", short: "o", default: "" },
    "max-results": { type: "string", default: "60" },
    help:     { type: "boolean", short: "h", default: false },
  },
});

if (args.help) {
  console.log(`
Usage: node scripts/find-unmapped-websites.js [options]

Options:
  -k, --keyword       Search keyword  (default: "health store")
  -l, --location      City/address    (default: "New York, NY")
  -r, --radius        Search radius in metres (default: 5000)
  -a, --api-key       Google Places API key (or set GOOGLE_PLACES_API_KEY env var)
      --max-results   Max businesses to inspect (default: 60, max: 60 per 3 pages)
  -o, --output        Write CSV to this file (default: print to stdout)
  -h, --help          Show this help
`);
  process.exit(0);
}

const API_KEY = process.env.GOOGLE_PLACES_API_KEY || args["api-key"];
if (!API_KEY) {
  console.error(
    "ERROR: Provide a Google Places API key via --api-key or GOOGLE_PLACES_API_KEY env var.\n" +
    "Get one at: https://console.cloud.google.com/apis/library/places-backend.googleapis.com"
  );
  process.exit(1);
}

const KEYWORD    = args.keyword;
const LOCATION   = args.location;
const RADIUS     = parseInt(args.radius, 10);
const MAX        = parseInt(args["max-results"], 10);
const OUTPUT     = args.output;

const PLACES_BASE = "https://maps.googleapis.com/maps/api/place";

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Sleep ms milliseconds */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Geocode a free-text location to { lat, lng } */
async function geocode(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  const res  = await fetch(url);
  const data = await res.json();
  if (data.status !== "OK") throw new Error(`Geocode failed: ${data.status} – ${data.error_message ?? ""}`);
  return data.results[0].geometry.location; // { lat, lng }
}

/** Collect up to maxResults place stubs from Text Search (paginates automatically) */
async function textSearch(query, lat, lng, radius, maxResults) {
  const places  = [];
  let pageToken = null;

  while (places.length < maxResults) {
    let url = `${PLACES_BASE}/textsearch/json?query=${encodeURIComponent(query)}`
            + `&location=${lat},${lng}&radius=${radius}&key=${API_KEY}`;
    if (pageToken) url += `&pagetoken=${pageToken}`;

    const res  = await fetch(url);
    const data = await res.json();

    if (!["OK", "ZERO_RESULTS"].includes(data.status)) {
      throw new Error(`Places Text Search error: ${data.status} – ${data.error_message ?? ""}`);
    }

    for (const p of data.results ?? []) {
      places.push(p);
      if (places.length >= maxResults) break;
    }

    pageToken = data.next_page_token ?? null;
    if (!pageToken) break;
    // Google requires a short delay before the next_page_token becomes valid
    await sleep(2000);
  }

  return places;
}

/** Fetch full Place Details (website, phone, hours, photos, rating) */
async function placeDetails(placeId) {
  const fields = "place_id,name,formatted_address,website,formatted_phone_number,opening_hours,photos,rating,user_ratings_total,url";
  const url    = `${PLACES_BASE}/details/json?place_id=${placeId}&fields=${fields}&key=${API_KEY}`;
  const res    = await fetch(url);
  const data   = await res.json();
  if (data.status !== "OK") return null;
  return data.result;
}

/**
 * Fetch the business website and look for structured-data (JSON-LD) that
 * references a Google Maps place ID — a strong signal the site is "claimed"
 * and linked back to its Google Business Profile.
 *
 * Returns: "linked" | "unlinked" | "unreachable"
 */
async function checkWebsiteLinkage(websiteUrl) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res   = await fetch(websiteUrl, {
      signal:  controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; GMBChecker/1.0)" },
      redirect: "follow",
    });
    clearTimeout(timer);

    if (!res.ok) return "unreachable";

    const html = await res.text();

    // 1. JSON-LD blocks
    const jsonLdMatches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    for (const [, raw] of jsonLdMatches) {
      try {
        const obj = JSON.parse(raw);
        const str = JSON.stringify(obj);
        // Contains a Google Maps URL or place ID reference
        if (/maps\.google\.|google\.com\/maps|goo\.gl\/maps/i.test(str)) return "linked";
        // sameAs pointing at maps
        if (/"sameAs"[^"]*maps/i.test(str)) return "linked";
      } catch { /* malformed JSON-LD – skip */ }
    }

    // 2. Inline <a> or widget pointing to Google Maps (common on claimed profiles)
    if (/maps\.google\.|google\.com\/maps|goo\.gl\/maps/i.test(html)) return "linked";

    return "unlinked";
  } catch {
    return "unreachable";
  }
}

/**
 * Score how "sparse" a Place Details record is.
 * Returns a count of missing profile signals (0 = complete, 4 = totally bare).
 */
function sparsityScore(detail) {
  let missing = 0;
  if (!detail.opening_hours)           missing++;
  if (!detail.formatted_phone_number)  missing++;
  if (!detail.photos?.length)          missing++;
  if (!detail.rating)                  missing++;
  return missing;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍  Searching Google Maps for "${KEYWORD}" near "${LOCATION}" (radius ${RADIUS}m) …\n`);

  // 1. Geocode location
  let coords;
  try {
    coords = await geocode(LOCATION);
  } catch (e) {
    console.error("Geocoding error:", e.message);
    process.exit(1);
  }
  console.log(`   📍 Coordinates: ${coords.lat}, ${coords.lng}`);

  // 2. Text search
  let stubs;
  try {
    stubs = await textSearch(KEYWORD, coords.lat, coords.lng, RADIUS, MAX);
  } catch (e) {
    console.error("Text search error:", e.message);
    process.exit(1);
  }
  console.log(`   Found ${stubs.length} place(s). Fetching details …\n`);

  // 3. Details + website linkage check
  const results = [];

  for (let i = 0; i < stubs.length; i++) {
    const stub   = stubs[i];
    process.stdout.write(`   [${i + 1}/${stubs.length}] ${stub.name} … `);

    const detail = await placeDetails(stub.place_id);
    if (!detail) {
      console.log("(details unavailable, skipped)");
      continue;
    }

    const website  = detail.website ?? null;
    const sparse   = sparsityScore(detail);

    let websiteStatus = "no-website";
    if (website) {
      websiteStatus = await checkWebsiteLinkage(website);
    }

    const unmapped =
      !website ||                            // no website at all
      (websiteStatus === "unlinked" && sparse >= 2) || // website exists but not linked back + sparse profile
      (websiteStatus === "unreachable" && sparse >= 3); // can't reach site + very sparse profile

    results.push({
      name:          detail.name,
      address:       detail.formatted_address,
      phone:         detail.formatted_phone_number ?? "",
      website:       website ?? "",
      mapsUrl:       detail.url ?? `https://www.google.com/maps/place/?q=place_id:${detail.place_id}`,
      rating:        detail.rating ?? "",
      reviewCount:   detail.user_ratings_total ?? 0,
      sparsity:      sparse,
      websiteStatus,
      unmapped,
    });

    console.log(unmapped ? "⚠️  UNMAPPED" : "✅  linked");

    // Be kind to the API
    await sleep(200);
  }

  // 4. Output
  const unmappedOnly = results.filter((r) => r.unmapped);
  console.log(`\n📊  Results: ${unmappedOnly.length} unmapped out of ${results.length} inspected.\n`);

  const headers = ["name","address","phone","website","mapsUrl","rating","reviewCount","sparsity","websiteStatus","unmapped"];
  const csvRows = [
    headers.join(","),
    ...results.map((r) =>
      headers.map((h) => `"${String(r[h]).replace(/"/g, '""')}"`).join(",")
    ),
  ];
  const csv = csvRows.join("\n");

  if (OUTPUT) {
    writeFileSync(OUTPUT, csv, "utf8");
    console.log(`💾  Full results written to ${OUTPUT}`);
  } else {
    console.log("── Unmapped websites ────────────────────────────────────────────────────\n");
    if (unmappedOnly.length === 0) {
      console.log("  (none found — all detected businesses appear to have linked profiles)");
    } else {
      for (const r of unmappedOnly) {
        console.log(`  ${r.name}`);
        console.log(`    Address : ${r.address}`);
        console.log(`    Website : ${r.website || "(none)"}`);
        console.log(`    Maps    : ${r.mapsUrl}`);
        console.log(`    Status  : website=${r.websiteStatus}, sparsity=${r.sparsity}/4`);
        console.log();
      }
    }
    console.log("── All results (CSV) ────────────────────────────────────────────────────\n");
    console.log(csv);
  }
}

main().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
