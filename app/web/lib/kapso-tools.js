import { tool } from "ai";
import { z } from "zod";
import {
  createFlow,
  createTemplate,
  listNumbers,
  listTemplates,
  publishFlow,
  sendFlow,
  sendTemplate,
  sendText,
} from "./kapso";

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
  kapso_create_template: tool({
    description: "Crea una plantilla de WhatsApp en Meta a través de Kapso. La envía a revisión.",
    inputSchema: z.object({
      businessAccountId: z.string(),
      name: z.string(),
      language: z.string(),
      category: z.enum(["UTILITY", "MARKETING", "AUTHENTICATION"]),
      components: z.array(z.record(z.string(), z.any())),
    }),
    execute: guard(({ businessAccountId, ...payload }) => createTemplate(businessAccountId, payload)),
  }),
  kapso_create_flow: tool({
    description: "Crea un WhatsApp Flow en Kapso. Si publish es true, también lo publica.",
    inputSchema: z.object({
      phoneNumberId: z.string(),
      name: z.string(),
      flowJson: z.record(z.string(), z.any()),
      publish: z.boolean().optional(),
    }),
    execute: guard((input) => createFlow(input)),
  }),
  kapso_publish_flow: tool({
    description: "Publica un Flow que ya existe. Publicar en Meta es irreversible.",
    inputSchema: z.object({
      flowId: z.string(),
      phoneNumberId: z.string().optional(),
    }),
    execute: guard((input) => publishFlow(input)),
  }),
  kapso_send_flow: tool({
    description: "Envía un Flow al teléfono del admin. Usa mode draft para probar un Flow no publicado.",
    inputSchema: z.object({
      phoneNumberId: z.string(),
      to: z.string(),
      flowId: z.string(),
      bodyText: z.string(),
      flowCta: z.string().optional(),
      mode: z.enum(["draft", "published"]).optional(),
    }),
    execute: guard((input) => sendFlow(input)),
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
