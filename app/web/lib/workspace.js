import fs from "fs";
import path from "path";

export const workspaceRoot = path.resolve(process.cwd(), "../..");

const stages = [
  { slug: "01-club-context", label: "Club", href: "/club" },
  { slug: "02-messages", label: "Mensajes", href: "/mensajes" },
  { slug: "03-players", label: "Jugadores", href: "/jugadores" },
  { slug: "04-send-test", label: "Envíos", href: "/envios" },
];

export function readText(relativePath) {
  const full = path.join(workspaceRoot, relativePath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

export function stageState(slug) {
  const dir = path.join(workspaceRoot, "stages", slug, "output");
  if (!fs.existsSync(dir)) return { state: "PENDING", files: [] };
  const files = fs.readdirSync(dir).filter((name) => name !== ".gitkeep");
  return { state: files.length > 0 ? "COMPLETE" : "PENDING", files };
}

export function pipeline() {
  return stages.map((stage) => ({ ...stage, ...stageState(stage.slug) }));
}

export function sections(markdown) {
  const blocks = [];
  let current = { title: "", body: [] };
  for (const line of markdown.split("\n")) {
    if (line.startsWith("## ")) {
      if (current.title || current.body.length) blocks.push(current);
      current = { title: line.slice(3).trim(), body: [] };
    } else if (line.startsWith("# ")) {
      continue;
    } else {
      current.body.push(line);
    }
  }
  if (current.title || current.body.length) blocks.push(current);
  return blocks
    .map((block) => ({
      title: block.title,
      body: block.body.join("\n").trim(),
    }))
    .filter((block) => block.title && block.body);
}
