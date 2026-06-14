import { mkdir, cp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { demoData } from "../src/fixtures/demo-data.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "src"), dist, { recursive: true });
await mkdir(join(dist, "api", "opencmo"), { recursive: true });
await writeFile(
  join(dist, "api", "opencmo", "bootstrap.json"),
  `${JSON.stringify({ mode: "mocked", data: demoData }, null, 2)}\n`,
);

console.log("Built sanitized static demo in dist/.");
