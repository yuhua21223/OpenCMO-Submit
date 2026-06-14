import { demoData, demoChatResponses } from "./fixtures/demo-data.js";

const routes = [
  { path: "/", label: "Overview", title: "OpenCMO Submit" },
  { path: "/dashboard", label: "Dashboard", title: "OpenCMO Mission Control" },
  { path: "/growth-sprint", label: "Growth Sprint", title: "CurbAlarm Growth Sprint" },
  { path: "/chat", label: "AI CMO Chat", title: "AI CMO Chat Demo" },
  { path: "/approvals", label: "Approvals", title: "Approval Queue" },
  { path: "/reports", label: "Reports", title: "CMO Brief" },
  { path: "/studio", label: "Studio", title: "Studio Pipeline" },
  { path: "/agents", label: "Agents", title: "Agent Surfaces" },
];

const view = document.querySelector("#view");
const pageTitle = document.querySelector("#page-title");
const navList = document.querySelector("#nav-list");

function html(strings, ...values) {
  return strings.reduce((result, string, index) => `${result}${string}${values[index] ?? ""}`, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderNav(activePath) {
  navList.innerHTML = routes
    .map(
      (route) => html`
        <a class="nav-link ${route.path === activePath ? "active" : ""}" href="${route.path}" data-route="${route.path}">
          ${route.label}
        </a>
      `,
    )
    .join("");
}

function renderOverview() {
  const cards = routes
    .filter((route) => route.path !== "/")
    .map(
      (route) => html`
        <a class="route-card" href="${route.path}" data-route="${route.path}">
          <strong>${route.label}</strong>
          <span>${route.title}</span>
        </a>
      `,
    )
    .join("");

  return html`
    <div class="hero-grid">
      <section class="hero-panel">
        <p class="eyebrow">Product surface, sanitized</p>
        <h2>Founder growth loop, ready to review.</h2>
        <p class="lead">
          This standalone repository shows the OpenCMO frontend experience with mocked
          fixtures for dashboard data, CurbAlarm campaign work, approvals, reports,
          Studio operations, and agent surfaces.
        </p>
        <div class="badge-row">
          ${demoData.guardrails.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join("")}
        </div>
      </section>
      <section class="panel">
        <p class="eyebrow">Routes</p>
        <h2>Review map</h2>
        <div class="route-grid">${cards}</div>
      </section>
    </div>
  `;
}

function renderDashboard() {
  const metrics = demoData.dashboard.metrics
    .map(
      (metric) => html`
        <article class="metric">
          <strong>${escapeHtml(metric.label)}</strong>
          <b>${escapeHtml(metric.value)}</b>
          <span>${escapeHtml(metric.detail)}</span>
        </article>
      `,
    )
    .join("");
  const proof = demoData.dashboard.proofTrace.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return html`
    <section class="panel">
      <p class="eyebrow">${escapeHtml(demoData.dashboard.status)}</p>
      <h2>${escapeHtml(demoData.dashboard.headline)}</h2>
      <p class="lead">
        Workspace: ${escapeHtml(demoData.dashboard.workspace)}. Every number and
        artifact here is seeded for review.
      </p>
      <div class="metric-grid">${metrics}</div>
    </section>
    <section class="split" style="margin-top: 18px">
      <div class="paper-panel">
        <p class="eyebrow">Proof trace</p>
        <h2>How a founder sees the work</h2>
        <ul class="proof-list">${proof}</ul>
      </div>
      <div class="panel">
        <p class="eyebrow">Safety posture</p>
        <h2>Review before action</h2>
        <p class="lead">
          OpenCMO demonstrates recommendations and drafts only. Nothing in this
          submission can publish content, charge money, track users, or call
          production data stores.
        </p>
      </div>
    </section>
  `;
}

function renderGrowthSprint() {
  const items = demoData.growthSprint.artifacts.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return html`
    <section class="split">
      <div class="hero-panel">
        <p class="eyebrow">Dogfood sprint</p>
        <h2>${escapeHtml(demoData.growthSprint.title)}</h2>
        <p class="lead">${escapeHtml(demoData.growthSprint.recommendation)}</p>
        <div class="badge-row">
          <span class="badge">${escapeHtml(demoData.growthSprint.wedge)}</span>
          <span class="badge">${escapeHtml(demoData.growthSprint.audience)}</span>
        </div>
      </div>
      <div class="paper-panel">
        <p class="eyebrow">Generated review pack</p>
        <h2>Seven safe artifacts</h2>
        <ul class="proof-list">${items}</ul>
      </div>
    </section>
  `;
}

function renderApprovals() {
  return html`
    <section class="panel">
      <p class="eyebrow">Manual control</p>
      <h2>Founder approval queue</h2>
      <div class="card-grid">
        ${demoData.approvalQueue
          .map(
            (item) => html`
              <article class="queue-card" data-risk="${escapeHtml(item.risk)}">
                <p class="eyebrow">${escapeHtml(item.channel)} · ${escapeHtml(item.status)}</p>
                <strong>${escapeHtml(item.title)}</strong>
                <span>Risk: ${escapeHtml(item.risk)}</span>
                <span>${escapeHtml(item.decision)}</span>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderReports() {
  return html`
    <section class="paper-panel">
      <p class="eyebrow">Report</p>
      <h2>${escapeHtml(demoData.reports.title)}</h2>
      <p class="lead">${escapeHtml(demoData.reports.summary)}</p>
    </section>
    <section class="card-grid" style="margin-top: 18px">
      ${demoData.reports.sections
        .map(
          (section) => html`
            <article class="panel">
              <p class="eyebrow">${escapeHtml(section.title)}</p>
              <p class="lead">${escapeHtml(section.body)}</p>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function renderStudio() {
  return html`
    <section class="panel">
      <p class="eyebrow">Studio operations</p>
      <h2>Radar to report pipeline</h2>
      <div class="card-grid">
        ${demoData.studioPipeline.stages
          .map(
            (stage) => html`
              <article class="stage-card">
                <p class="eyebrow">${escapeHtml(stage.state)}</p>
                <strong>${escapeHtml(stage.name)}</strong>
                <span>${escapeHtml(stage.detail)}</span>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderAgents() {
  return html`
    <section class="panel">
      <p class="eyebrow">Stable demo surfaces</p>
      <h2>Agents, radar, writer</h2>
      <div class="card-grid">
        ${demoData.agents
          .map(
            (agent) => html`
              <article class="agent-card">
                <p class="eyebrow">${escapeHtml(agent.mode)}</p>
                <strong>${escapeHtml(agent.name)}</strong>
                <span>${escapeHtml(agent.purpose)}</span>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function pickLocalChatResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes("approval")) return demoChatResponses.approvals;
  if (lower.includes("report") || lower.includes("brief")) return demoChatResponses.report;
  if (lower.includes("studio") || lower.includes("pipeline")) return demoChatResponses.studio;
  if (lower.includes("radar") || lower.includes("curbalarm")) return demoChatResponses.radar;
  return demoChatResponses.default;
}

function renderChat() {
  return html`
    <section class="chat-shell">
      <div class="chat-log" id="chat-log">
        <div class="message">
          ${escapeHtml(demoData.chatDemo.intro)}
          <div class="badge-row">
            ${demoData.chatDemo.starters
              .map((starter) => `<button class="button secondary starter" type="button">${escapeHtml(starter)}</button>`)
              .join("")}
          </div>
        </div>
      </div>
      <form class="chat-form" id="chat-form">
        <input id="chat-input" autocomplete="off" placeholder="Ask for a CurbAlarm sprint angle..." />
        <button class="button" type="submit">Ask</button>
      </form>
    </section>
  `;
}

function attachChatHandlers() {
  const form = document.querySelector("#chat-form");
  const input = document.querySelector("#chat-input");
  const log = document.querySelector("#chat-log");
  if (!form || !input || !log) return;

  function appendMessage(text, isUser = false) {
    const message = document.createElement("div");
    message.className = `message${isUser ? " user" : ""}`;
    message.textContent = text;
    log.append(message);
    message.scrollIntoView({ block: "nearest" });
  }

  function ask(text) {
    const message = text.trim();
    if (!message) return;
    appendMessage(message, true);
    appendMessage(pickLocalChatResponse(message));
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    ask(input.value);
    input.value = "";
  });

  document.querySelectorAll(".starter").forEach((button) => {
    button.addEventListener("click", () => ask(button.textContent || ""));
  });
}

function render() {
  const activePath = routes.some((route) => route.path === window.location.pathname) ? window.location.pathname : "/";
  const route = routes.find((item) => item.path === activePath) || routes[0];
  pageTitle.textContent = route.title;
  renderNav(activePath);

  const renderers = {
    "/": renderOverview,
    "/dashboard": renderDashboard,
    "/growth-sprint": renderGrowthSprint,
    "/chat": renderChat,
    "/approvals": renderApprovals,
    "/reports": renderReports,
    "/studio": renderStudio,
    "/agents": renderAgents,
  };

  view.innerHTML = renderers[activePath]();
  if (activePath === "/chat") attachChatHandlers();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-route]");
  if (!link) return;
  event.preventDefault();
  window.history.pushState({}, "", link.getAttribute("href"));
  render();
});

window.addEventListener("popstate", render);

render();
