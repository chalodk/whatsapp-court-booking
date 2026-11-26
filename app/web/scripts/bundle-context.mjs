import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(here, "..");
const workspaceRoot = path.resolve(webRoot, "../..");

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

const instructions = files
  .map((relativePath) => {
    const full = path.join(workspaceRoot, relativePath);
    const body = fs.readFileSync(full, "utf8");
    return `# ${relativePath}\n\n${body}`;
  })
  .join("\n\n---\n\n");

const out = path.join(webRoot, "lib/context-bundle.json");
fs.writeFileSync(out, JSON.stringify({ instructions }));
console.log(`wrote ${out} (${instructions.length} chars)`);
