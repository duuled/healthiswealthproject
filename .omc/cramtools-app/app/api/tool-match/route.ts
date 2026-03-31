import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are an AI tool strategist for freelancers and solopreneurs. Users describe their job and workflow, and you recommend the EXACT AI tool stack they need.

Be specific, opinionated, and honest about trade-offs. Do not recommend tools just because they are popular — recommend them because they genuinely fit the described workflow.

Respond ONLY with a valid JSON object matching this exact structure:
{
  "tools": [
    {
      "name": "Tool Name",
      "category": "Category (e.g. Writing, Coding, Design, Automation, Research)",
      "why_you_need_it": "Specific reason tied to their workflow",
      "monthly_cost": "$X/mo or Free",
      "affiliate_link_placeholder": "https://cramtools.dev/go/toolname",
      "rating_out_of_10": 9
    }
  ],
  "summary": "2-3 sentence summary of the recommended stack and why it fits this person",
  "estimated_monthly_cost_total": "$X-Y/mo",
  "pro_tip": "One actionable tip for getting the most out of this stack"
}

Include 4-7 tools. Ratings should be honest (not everything is a 10). Monthly costs should be accurate as of 2024.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { useCase?: string; role?: string };
    const { useCase, role } = body;

    if (!useCase || !role) {
      return new Response(
        JSON.stringify({ error: "useCase and role are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (useCase.length > 2000) {
      return new Response(
        JSON.stringify({ error: "useCase must be under 2000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const messageStream = client.messages.stream({
            model: "claude-opus-4-6",
            max_tokens: 64000,
            thinking: { type: "adaptive" },
            system: SYSTEM_PROMPT,
            messages: [
              {
                role: "user",
                content: `Role: ${role}\n\nWorkflow description: ${useCase}`,
              },
            ],
          });

          for await (const event of messageStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }

          controller.close();
        } catch (streamError) {
          const errorMessage =
            streamError instanceof Anthropic.APIError
              ? `Claude API error ${streamError.status}: ${streamError.message}`
              : "An unexpected error occurred";

          controller.enqueue(
            encoder.encode(`\n\n__ERROR__: ${errorMessage}`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return new Response(
        JSON.stringify({ error: "Invalid API key. Check ANTHROPIC_API_KEY." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (error instanceof Anthropic.RateLimitError) {
      return new Response(
        JSON.stringify({ error: "Rate limit reached. Please try again shortly." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    if (error instanceof Anthropic.APIError) {
      return new Response(
        JSON.stringify({ error: `API error: ${error.message}` }),
        { status: error.status ?? 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
