import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a world-class prompt engineering expert. Users paste a weak or vague prompt, and you return structured improvements.

Analyze the prompt's weaknesses, then produce three improved versions:
1. Concise — stripped down to maximum signal with minimum words
2. Detailed — comprehensive, with full context and constraints
3. Chain-of-Thought — structured to guide the AI through a reasoning process step-by-step

Respond ONLY with a valid JSON object matching this exact structure:
{
  "original_issues": [
    "Specific issue 1 with the original prompt",
    "Specific issue 2",
    "Specific issue 3"
  ],
  "variations": [
    {
      "name": "Concise",
      "prompt": "The full improved prompt text",
      "why_it_works": "Explanation of what makes this version effective"
    },
    {
      "name": "Detailed",
      "prompt": "The full improved prompt text",
      "why_it_works": "Explanation of what makes this version effective"
    },
    {
      "name": "Chain-of-Thought",
      "prompt": "The full improved prompt text",
      "why_it_works": "Explanation of what makes this version effective"
    }
  ],
  "key_improvements": [
    "Core improvement 1 applied across all variations",
    "Core improvement 2",
    "Core improvement 3"
  ]
}

Be specific and actionable. The improved prompts must be complete and ready to paste directly into an AI chat.`;

interface PromptLabRequest {
  prompt?: string;
  context?: string;
}

interface PromptVariation {
  name: string;
  prompt: string;
  why_it_works: string;
}

interface PromptLabResponse {
  original_issues: string[];
  variations: PromptVariation[];
  key_improvements: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as PromptLabRequest;
    const { prompt, context } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "prompt is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (prompt.length > 3000) {
      return new Response(
        JSON.stringify({ error: "prompt must be under 3000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userMessage = context
      ? `Original prompt:\n${prompt}\n\nContext (what this prompt is for): ${context}`
      : `Original prompt:\n${prompt}`;

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 16000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const textBlock = response.content.find(
      (block): block is Anthropic.TextBlock => block.type === "text"
    );

    if (!textBlock) {
      return new Response(
        JSON.stringify({ error: "No response generated" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    let parsed: PromptLabResponse;
    try {
      // Strip markdown code fences if present
      const raw = textBlock.text.trim();
      const jsonText = raw.startsWith("```")
        ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
        : raw;
      parsed = JSON.parse(jsonText) as PromptLabResponse;
    } catch {
      return new Response(
        JSON.stringify({
          error: "Failed to parse Claude response as JSON",
          raw: textBlock.text,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(parsed), {
      status: 200,
      headers: { "Content-Type": "application/json" },
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
