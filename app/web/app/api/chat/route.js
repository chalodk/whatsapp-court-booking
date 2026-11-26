import { convertToModelMessages, stepCountIs, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { agentInstructions, agentPreamble } from "../../../lib/agent-context";
import { kapsoTools } from "../../../lib/kapso-tools";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      "Falta OPENAI_API_KEY en las variables de Netlify. Agrégala y vuelve a publicar.",
      { status: 500 }
    );
  }

  const { messages } = await request.json();
  const result = streamText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4.1-mini"),
    system: `${agentPreamble}\n\n${agentInstructions()}\n\n${agentPreamble}`,
    messages: await convertToModelMessages(messages),
    tools: kapsoTools,
    stopWhen: stepCountIs(8),
  });

  return result.toUIMessageStreamResponse();
}
