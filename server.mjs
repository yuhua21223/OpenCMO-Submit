import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

import { demoData, demoChatResponses } from "./src/fixtures/demo-data.js";

const root = fileURLToPath(new URL(".", import.meta.url));
const srcDir = join(root, "src");
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml; charset=utf-8",
};

function json(response, statusCode, payload) {
  response.writeHead(statusCode, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

async function readRequestBody(request) {
  let body = "";
  for await (const chunk of request) body += chunk;
  if (!body) return {};
  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}

function pickChatResponse(message = "") {
  const lower = String(message).toLowerCase();
  if (lower.includes("approval")) return demoChatResponses.approvals;
  if (lower.includes("report") || lower.includes("brief")) return demoChatResponses.report;
  if (lower.includes("studio") || lower.includes("pipeline")) return demoChatResponses.studio;
  if (lower.includes("radar") || lower.includes("curbalarm")) return demoChatResponses.radar;
  return demoChatResponses.default;
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);

  if (url.pathname === "/api/opencmo/bootstrap") {
    json(response, 200, { mode: "mocked", generatedAt: demoData.generatedAt, data: demoData });
    return;
  }

  if (url.pathname === "/api/opencmo/chat") {
    const body = request.method === "POST" ? await readRequestBody(request) : {};
    json(response, 200, {
      mode: "mocked",
      response: pickChatResponse(body.message),
      guardrails: demoData.guardrails,
    });
    return;
  }

  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const normalizedPath = normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(srcDir, normalizedPath);

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      "content-type": contentTypes[extname(filePath)] || "application/octet-stream",
    });
    response.end(file);
  } catch {
    const file = await readFile(join(srcDir, "index.html"));
    response.writeHead(200, { "content-type": contentTypes[".html"] });
    response.end(file);
  }
});

server.listen(port, () => {
  console.log(`OpenCMO Submit demo running at http://localhost:${port}`);
});
