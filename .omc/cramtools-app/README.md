# CramTools

AI tools for freelancers and solopreneurs. Two Claude-powered features:

- **ToolMatch** — Describe your workflow, get a personalized AI tool stack
- **PromptLab** — Paste a weak prompt, get 3 optimized variations

Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Claude Opus 4.6.

---

## Environment Variables

Create a `.env.local` file in the project root:

```
ANTHROPIC_API_KEY=your_key_here
```

Get your API key from [console.anthropic.com](https://console.anthropic.com).

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel (One-Click)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. In the **Environment Variables** section, add:
   - `ANTHROPIC_API_KEY` = your Anthropic API key
4. Click **Deploy**

That's it. Vercel auto-detects Next.js and configures everything.

### Manual Vercel deploy via CLI

```bash
npm install -g vercel
vercel
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

---

## Affiliate Links

Tool recommendations in ToolMatch include `affiliate_link_placeholder` values like `https://cramtools.dev/go/toolname`.

To activate affiliate revenue:
1. Sign up for affiliate programs for tools you recommend (e.g. Notion, Jasper, Copy.ai, etc.)
2. Replace the `cramtools.dev/go/toolname` slugs with your actual affiliate URLs
3. Optionally create redirect routes at `/go/[tool]` in the Next.js app to manage links centrally

Current placeholder format: `https://cramtools.dev/go/{lowercase-tool-name}`

---

## Project Structure

```
app/
  page.tsx                  # Homepage
  layout.tsx                # Root layout + metadata
  globals.css               # Tailwind base styles
  tool-match/
    page.tsx                # ToolMatch UI
  prompt-lab/
    page.tsx                # PromptLab UI
  api/
    tool-match/
      route.ts              # ToolMatch API (streaming, claude-opus-4-6)
    prompt-lab/
      route.ts              # PromptLab API (structured JSON, claude-opus-4-6)
```

---

## Model Details

Both features use `claude-opus-4-6`.

- **ToolMatch** uses `thinking: {type: "adaptive"}` with streaming for deep workflow analysis
- **PromptLab** uses a direct structured JSON call (fast, no streaming needed)

Never hardcode API keys. All secrets come from environment variables.
