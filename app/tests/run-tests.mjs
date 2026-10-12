// Bundles the TypeScript checks with esbuild (installed with Vite) and runs them in Node.
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const here = dirname(fileURLToPath(import.meta.url));
const out = join(mkdtempSync(join(tmpdir(), "bto-tests-")), "branches.mjs");
await build({ entryPoints: [join(here, "branches.test.ts")], bundle: true, platform: "node", format: "esm", outfile: out, logLevel: "error" });
await import(pathToFileURL(out).href);
