import { tool } from "ai";
import { z } from "zod";
import { listNumbers, listTemplates, sendTemplate, sendText } from "./kapso";

function guard(run) {
  return async (input) => {
    try {
      return await run(input);
    } catch (error) {
      return { ok: false, error: error.message || String(error) };
    }
  };
}

export const kapsoTools = {
  kapso_list_numbers: tool({
    description: "Lista los números de WhatsApp del proyecto Kapso, con phone_number_id y business_account_id.",
    inputSchema: z.object({}),
    execute: guard(() => listNumbers()),
  }),
  kapso_list_templates: tool({
    description: "Lista las plantillas de un WhatsApp Business Account.",
    inputSchema: z.object({
      businessAccountId: z.string().describe("WABA id, business_account_id"),
    }),
    execute: guard(({ businessAccountId }) => listTemplates(businessAccountId)),
  }),
  kapso_send_template: tool({
    description: "Envía una plantilla de WhatsApp ya aprobada a un número.",
    inputSchema: z.object({
      phoneNumberId: z.string().describe("Meta phone_number_id del número que envía"),
      to: z.string().describe("Teléfono destino con código de país, sin signos"),
      templateName: z.string(),
      languageCode: z.string().optional(),
      components: z.array(z.record(z.string(), z.any())).optional(),
    }),
    execute: guard((input) => sendTemplate(input)),
  }),
  kapso_send_text: tool({
    description: "Envía un texto de WhatsApp dentro de una conversación abierta.",
    inputSchema: z.object({
      phoneNumberId: z.string(),
      to: z.string(),
      body: z.string(),
    }),
    execute: guard((input) => sendText(input)),
  }),
};
