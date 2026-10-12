// Inlines assets/icons/*.svg (Fluent System Icons, MIT) into index.html as <symbol>s,
// between the ICONS:START / ICONS:END markers, so glyphs can take currentColor.
// Usage: node tools/inline-icons.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "assets/icons");
const symbols = readdirSync(dir)
  .filter((f) => f.endsWith(".svg"))
  .sort()
  .map((f) => {
    const svg = readFileSync(join(dir, f), "utf8");
    const viewBox = svg.match(/viewBox="([^"]+)"/)[1];
    const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"[^>]*\/?>/g)].map((m) => `<path d="${m[1]}"/>`).join("");
    return `<symbol id="i-${f.replace(/\.svg$/, "")}" viewBox="${viewBox}">${paths}</symbol>`;
  })
  .join("\n");

const file = join(root, "index.html");
const html = readFileSync(file, "utf8");
const out = html.replace(/<!--ICONS:START-->[\s\S]*?<!--ICONS:END-->/, `<!--ICONS:START-->\n${symbols}\n<!--ICONS:END-->`);
if (out === html && !html.includes("<!--ICONS:START-->")) throw new Error("markers not found");
writeFileSync(file, out);
console.log(`inlined ${symbols.split("\n").length} icons`);
