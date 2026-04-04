/**
 * Supabase Edge Function — godmode
 *
 * Activates all 12 FC-AGENT protocols simultaneously using Claude Opus 4.6
 * with adaptive thinking. Returns a synthesized master intelligence brief.
 *
 * Deploy:
 *   supabase functions deploy godmode
 *
 * Set secrets:
 *   supabase secrets set ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxx
 *
 * Call:
 *   POST https://<project-ref>.supabase.co/functions/v1/godmode
 *   { "context": "What should I focus on this week?" }
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY') ?? '';
const MODEL = 'claude-opus-4-6';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are the FlavorCrave Network GOD MODE Intelligence System — a multi-agent orchestrator that synthesizes intelligence from 12 specialist AI agents simultaneously.

You operate for The FlavorCrave Network: a creator commerce company with 18 properties across 9 platforms. Founded by Keaton Tyler (DJ, producer, creator, AI strategist). Based in Marina Del Rey, CA. Subsidiaries: Taste Table (food & flavor), Health Is Wealth Store (supplements), 7 TikTok channels, YouTube, Instagram, LinkedIn, X, WordPress blog, Rapchat, Pinterest, and OfferUp. Primary monetization: Amazon affiliate (keatontyler-20) and TikTok affiliate links.

When GOD MODE is activated, you run all 12 agents in sequence and deliver a unified master brief. Each agent section must be clearly labeled. The final section must be a "GOD MODE SYNTHESIS" that connects all agent outputs into one actionable command.

Format:
- Use bold headers for each agent
- Be specific to The FlavorCrave Network's actual assets
- No generic advice
- End with 3 immediate action items ranked by impact`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  try {
    const { context } = await req.json();

    if (!context || typeof context !== 'string') {
      return new Response(
        JSON.stringify({ error: 'context is required' }),
        { status: 400, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    const userPrompt = `SITUATION / CONTEXT:
${context}

Activate all 12 FC-AGENT protocols against this situation. Deliver the master intelligence brief.`;

    // Call Claude Opus 4.6 with adaptive thinking via streaming
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8192,
        thinking: { type: 'adaptive' },
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
        stream: true,
      }),
    });

    if (!anthropicRes.ok) {
      const err = await anthropicRes.text();
      console.error('Anthropic error:', err);
      return new Response(
        JSON.stringify({ error: 'Anthropic API error', detail: err }),
        { status: 502, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
      );
    }

    // Stream the response directly to the client
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = anthropicRes.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            if (
              parsed.type === 'content_block_delta' &&
              parsed.delta?.type === 'text_delta'
            ) {
              await writer.write(
                encoder.encode(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`)
              );
            }
          } catch {
            // skip malformed lines
          }
        }
      }

      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
    })();

    return new Response(readable, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (err) {
    console.error('GOD MODE error:', err);
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' } }
    );
  }
});
