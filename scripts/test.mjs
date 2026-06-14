import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { demoData } from "../src/fixtures/demo-data.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const requiredRoutes = ["/", "/dashboard", "/growth-sprint", "/chat", "/approvals", "/reports", "/studio", "/agents"];
const requiredFixtureKeys = ["dashboard", "growthSprint", "chatDemo", "approvalQueue", "reports", "studioPipeline", "agents"];
const internalRuntimeNames = [
  ["open", "claw"],
  ["her", "mes"],
].map((parts) => new RegExp(parts.join(""), "i"));
const secretTokenPatterns = [
  ["SUPABASE", "_SERVICE", "_ROLE"],
  ["sk", "_live", "_"],
  ["pk", "_live", "_"],
  ["wh", "sec", "_"],
  ["posthog", "_personal"],
  ["/Users", "/yuhua"],
  ["claw", "mini"],
  ["worker", " log", ":"],
].map((parts) => new RegExp(parts.join(""), "i"));
const forbiddenPatterns = [
  ...secretTokenPatterns,
  /service[-_ ]?role/i,
  /private[_-]?key/i,
  /BEGIN (RSA |EC |OPENSSH |)PRIVATE KEY/i,
  ...internalRuntimeNames,
];

async function walk(dir, files = []) {
  for (const entry of await readdir(dir)) {
    if ([".git", "node_modules", "dist"].includes(entry)) continue;
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) await walk(path, files);
    else files.push(path);
  }
  return files;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

for (const key of requiredFixtureKeys) {
  assert(demoData[key], `Missing fixture key: ${key}`);
}

const app = await readFile(join(root, "src", "app.js"), "utf8");
for (const route of requiredRoutes) {
  assert(app.includes(`"${route}"`) || route === "/", `Route not registered: ${route}`);
}

const files = await walk(root);
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const pattern of forbiddenPatterns) {
    assert(!pattern.test(text), `Forbidden sensitive pattern ${pattern} found in ${file}`);
  }
}

console.log(`Sanitized demo checks passed across ${files.length} files.`);
