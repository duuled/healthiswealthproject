/**
 * Supabase Edge Function — welcome-email
 *
 * Triggered by a Supabase Database Webhook on INSERT to newsletter_subscribers.
 * Sends a 3-email welcome sequence via Resend.
 *
 * Deploy:
 *   supabase functions deploy welcome-email
 *
 * Set secrets:
 *   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
 *   supabase secrets set FROM_EMAIL=wellness@healthiswealth.live
 *
 * Database Webhook (set in Supabase Dashboard → Database → Webhooks):
 *   Table: newsletter_subscribers
 *   Event: INSERT
 *   URL: https://<project-ref>.supabase.co/functions/v1/welcome-email
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? 'wellness@healthiswealth.live';
const FROM_NAME = 'Health Is Wealth | The FlavorCrave Network';

// ─── Email sequence ───────────────────────────────────────────────────────────

function email1(toEmail: string, source: string) {
  return {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: toEmail,
    subject: "You're in — here's your free Power 5 Smoothie Recipe 🥤",
    html: `
      <div style="max-width:600px;margin:0 auto;font-family:sans-serif;color:#1a1a1a;">
        <div style="background:#000;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:24px;letter-spacing:0.2em;margin:0;">HEALTH IS WEALTH</h1>
          <p style="color:#888;font-size:11px;letter-spacing:0.3em;margin:8px 0 0;">THE FLAVORCRAVE NETWORK · MARINA DEL REY, CA</p>
        </div>
        <div style="padding:32px;">
          <h2 style="font-size:22px;">Welcome to The FlavorCrave Network.</h2>
          <p style="color:#444;line-height:1.7;">
            You just joined something bigger than a newsletter — you're connected to 18 channels,
            9 platforms, and a full wellness ecosystem built from Marina Del Rey, California.
          </p>
          <p style="color:#444;line-height:1.7;"><strong>Your Power 5 Smoothie Recipe:</strong></p>
          <div style="background:#f8f8f8;border-left:4px solid #22c55e;padding:20px;border-radius:4px;margin:16px 0;">
            <p style="margin:0 0 8px;font-weight:bold;">The Morning Stack</p>
            <ul style="color:#444;line-height:2;margin:0;padding-left:20px;">
              <li>1 tsp Moringa Powder</li>
              <li>¼ tsp Neem Powder</li>
              <li>1 bag Chaga Mushroom Tea (brewed, cooled)</li>
              <li>¼ tsp Chaga Powder</li>
              <li>5–10 drops Shilajit</li>
            </ul>
            <p style="color:#666;font-size:13px;margin:12px 0 0;">Blend with banana, almond milk, and a teaspoon of honey. Drink within 30 minutes of waking.</p>
          </div>
          <a href="https://healthiswealth.live/supplements?utm_source=email&utm_medium=welcome_seq&utm_campaign=flavorcrave_network&utm_content=email1"
             style="display:inline-block;background:#000;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin-top:16px;">
            Shop The Full Stack →
          </a>
        </div>
        <div style="padding:16px 32px;border-top:1px solid #eee;text-align:center;">
          <p style="color:#aaa;font-size:12px;">© The FlavorCrave Network · Marina Del Rey, CA 90292</p>
          <p style="color:#aaa;font-size:12px;">Joined via: ${source} · <a href="https://healthiswealth.live/links" style="color:#888;">All channels</a></p>
        </div>
      </div>
    `,
  };
}

// ─── Handler ──────────────────────────────────────────────────────────────────

serve(async (req) => {
  try {
    const body = await req.json();

    // Supabase webhook payload: { type: 'INSERT', table: '...', record: {...} }
    const record = body?.record;
    if (!record?.email) {
      return new Response(JSON.stringify({ error: 'No email in payload' }), { status: 400 });
    }

    const { email, source } = record;

    // Send Email 1 immediately
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(email1(email, source ?? 'direct')),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: data }), { status: 500 });
    }

    console.log(`Welcome email sent to ${email} (source: ${source})`);
    return new Response(JSON.stringify({ success: true, id: data.id }), { status: 200 });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
