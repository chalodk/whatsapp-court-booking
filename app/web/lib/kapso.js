const DEFAULT_BASE = "https://api.kapso.ai";

function baseUrl() {
  const raw = (process.env.KAPSO_API_BASE_URL || DEFAULT_BASE).replace(/\/+$/, "");
  if (raw.endsWith("/platform/v1")) return raw.slice(0, -"/platform/v1".length);
  return raw.replace(/\/meta\/whatsapp.*$/, "");
}

function apiKey() {
  const key = process.env.KAPSO_API_KEY;
  if (!key) {
    const error = new Error("Falta KAPSO_API_KEY en las variables de Netlify.");
    error.code = "missing_key";
    throw error;
  }
  return key;
}

async function kapsoFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "X-API-Key": apiKey(),
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
    redirect: "error",
  });
  const text = await response.text();
  let data = text;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { ok: response.ok, status: response.status, data };
}

function clip(value) {
  const text = JSON.stringify(value);
  if (text.length <= 6000) return value;
  return { truncated: true, preview: text.slice(0, 6000) };
}

export async function listNumbers() {
  const url = new URL(`${baseUrl()}/platform/v1/whatsapp/phone_numbers`);
  const result = await kapsoFetch(url);
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, numbers: clip(result.data) };
}

export async function listTemplates(businessAccountId) {
  const version = process.env.META_GRAPH_VERSION || "v24.0";
  const url = new URL(`${baseUrl()}/meta/whatsapp/${version}/${businessAccountId}/message_templates`);
  url.searchParams.set("limit", "50");
  const result = await kapsoFetch(url);
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, templates: clip(result.data) };
}

export async function sendTemplate({ phoneNumberId, to, templateName, languageCode, components }) {
  const version = process.env.META_GRAPH_VERSION || "v24.0";
  const url = `${baseUrl()}/meta/whatsapp/${version}/${phoneNumberId}/messages`;
  const template = {
    name: templateName,
    language: { code: languageCode || "es" },
  };
  if (components) template.components = components;
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template,
    }),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, message: clip(result.data) };
}

export async function createTemplate(businessAccountId, payload) {
  const version = process.env.META_GRAPH_VERSION || "v24.0";
  const url = `${baseUrl()}/meta/whatsapp/${version}/${businessAccountId}/message_templates`;
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, template: clip(result.data) };
}

export async function createFlow({ phoneNumberId, name, flowJson, publish }) {
  const url = `${baseUrl()}/platform/v1/whatsapp/flows`;
  const body = { phone_number_id: phoneNumberId };
  if (name) body.name = name;
  if (flowJson) body.flow_json = flowJson;
  if (publish) body.publish = true;
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, flow: clip(result.data) };
}

export async function publishFlow({ flowId, phoneNumberId }) {
  const url = `${baseUrl()}/platform/v1/whatsapp/flows/${flowId}/publish`;
  const body = phoneNumberId ? { phone_number_id: phoneNumberId } : {};
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, flow: clip(result.data) };
}

export async function sendFlow({ phoneNumberId, to, flowId, bodyText, flowCta, mode }) {
  const version = process.env.META_GRAPH_VERSION || "v24.0";
  const url = `${baseUrl()}/meta/whatsapp/${version}/${phoneNumberId}/messages`;
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "interactive",
      interactive: {
        type: "flow",
        body: { text: bodyText },
        action: {
          name: "flow",
          parameters: {
            flow_message_version: "3",
            flow_id: flowId,
            flow_cta: flowCta || "Elegir horario",
            flow_token: flowId,
            ...(mode ? { mode } : {}),
          },
        },
      },
    }),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, message: clip(result.data) };
}

export async function sendText({ phoneNumberId, to, body }) {
  const version = process.env.META_GRAPH_VERSION || "v24.0";
  const url = `${baseUrl()}/meta/whatsapp/${version}/${phoneNumberId}/messages`;
  const result = await kapsoFetch(url, {
    method: "POST",
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body },
    }),
  });
  if (!result.ok) return { ok: false, status: result.status, error: clip(result.data) };
  return { ok: true, message: clip(result.data) };
}
