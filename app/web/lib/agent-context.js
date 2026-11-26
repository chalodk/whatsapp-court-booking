import fs from "fs";
import path from "path";
import bundle from "./context-bundle.json";

const files = [
  "CLAUDE.md",
  "CONTEXT.md",
  "club-context/identity.md",
  "shared/club-schema.md",
  "shared/booking-rules.md",
  "shared/message-voice.md",
  "shared/flow-modes.md",
  "shared/value-framework.md",
  "shared/player-schema.md",
  "shared/kapso-setup.md",
  "stages/01-club-context/CONTEXT.md",
  "stages/02-messages/CONTEXT.md",
  "stages/03-players/CONTEXT.md",
  "stages/04-send-test/CONTEXT.md",
  "skills/integrate-whatsapp/SKILL.md",
  "skills/automate-whatsapp/SKILL.md",
  "skills/observe-whatsapp/SKILL.md",
];

function liveRoot() {
  const starts = [process.cwd(), path.resolve(process.cwd(), ".."), path.resolve(process.cwd(), "../..")];
  for (const start of starts) {
    let dir = start;
    for (let i = 0; i < 5; i += 1) {
      if (fs.existsSync(path.join(dir, "CLAUDE.md")) && fs.existsSync(path.join(dir, "stages"))) {
        return dir;
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }
  }
  return null;
}

function liveInstructions() {
  const root = liveRoot();
  if (!root) return "";
  return files
    .map((relativePath) => {
      const full = path.join(root, relativePath);
      if (!fs.existsSync(full)) return "";
      return `# ${relativePath}\n\n${fs.readFileSync(full, "utf8")}`;
    })
    .filter(Boolean)
    .join("\n\n---\n\n");
}

export function agentInstructions() {
  return liveInstructions() || bundle.instructions;
}

export const agentPreamble = `Eres el agente del club. El admin solo habla contigo, en este chat.
Sigue los archivos del workspace que vienen abajo, en orden. Empieza por la etapa 01.
Habla en español, claro y corto. Una pregunta a la vez.
No menciones carpetas, archivos ni Netlify.
Cuando tengas el club de esta semana, muestra el JSON y pide confirmación antes de seguir con mensajes, jugadores y envíos.
La semana vive en esta conversación. Al cerrar la semana, la próxima conversación empieza vacía.
Puedes enviar WhatsApp tú mismo con las herramientas kapso_list_numbers, kapso_list_templates, kapso_send_template y kapso_send_text.
No pidas al admin que use la terminal ni la API. Si falta la clave, dilo en una frase.
Antes de enviar, busca el phone_number_id. El número largo de Meta no es el teléfono del destinatario.`;
