/**
 * GOD MODE client utility
 * Calls the Supabase godmode edge function and streams the response.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export async function runGodMode(
  context: string,
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (msg: string) => void
): Promise<void> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/godmode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ context }),
    });

    if (!res.ok || !res.body) {
      const errText = await res.text();
      onError(`GOD MODE failed: ${errText}`);
      return;
    }

    const reader = res.body.getReader();
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
        const data = line.slice(6).trim();
        if (data === '[DONE]') { onDone(); return; }
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) onChunk(parsed.text);
        } catch {
          // skip
        }
      }
    }

    onDone();
  } catch (err) {
    onError(String(err));
  }
}

/** Generate the master mega-prompt — all 12 agents chained into one copyable string */
export function buildMasterPrompt(agents: { agentId: string; title: string; prompt: string }[]): string {
  const header = `# THE FLAVORCRAVE NETWORK — GOD MODE MASTER BRIEF
# Multi-Agent Intelligence System | All ${agents.length} Agents Active
# Powered by: Claude Opus 4.6 + Adaptive Thinking
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

You are the FlavorCrave Network GOD MODE Intelligence System.
Run all ${agents.length} specialist agents in sequence. After each agent's analysis,
carry the intelligence forward into the next agent's context.
End with a GOD MODE SYNTHESIS that unifies all outputs into 3 immediate action items.

Applied to: The FlavorCrave Network — 18 properties, 9 platforms, Marina Del Rey, CA.

`;

  const agentBlocks = agents.map((a, i) =>
    `${'═'.repeat(60)}
## AGENT ${i + 1} OF ${agents.length} | ${a.agentId} — ${a.title}
${'═'.repeat(60)}

${a.prompt}

`).join('\n');

  const footer = `${'═'.repeat(60)}
## GOD MODE SYNTHESIS
${'═'.repeat(60)}

Connect all ${agents.length} agent outputs above into one master brief.
Identify the 3 highest-leverage actions for The FlavorCrave Network right now.
Rank by: (reversibility × leverage) ÷ time cost.
Be specific. No generic advice.`;

  return header + agentBlocks + footer;
}
