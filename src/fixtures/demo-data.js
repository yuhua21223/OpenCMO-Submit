export const demoData = {
  generatedAt: "2026-06-14T00:00:00.000Z",
  guardrails: [
    "Mock data only",
    "No auto-publishing",
    "Founder approval required",
    "No production connectors",
    "No billing or analytics integrations",
  ],
  dashboard: {
    company: "OpenCMO",
    workspace: "CurbAlarm Demo Workspace",
    status: "Hackathon review mode",
    headline: "AI CMO operating loop for founder-led growth",
    metrics: [
      { label: "Market signals", value: "42", detail: "Seeded parking confusion leads" },
      { label: "Approval items", value: "7", detail: "Drafts waiting for founder review" },
      { label: "Next metric", value: "First alarm set rate", detail: "Primary activation target" },
      { label: "Publishing mode", value: "Manual", detail: "No platform actions are executed" },
    ],
    proofTrace: [
      "Market signal scan",
      "Pain clustering",
      "Campaign draft generation",
      "Founder review queue",
      "CMO brief",
    ],
  },
  growthSprint: {
    title: "CurbAlarm Growth Sprint",
    wedge: "Ticket anxiety is the clearest acquisition wedge.",
    audience: "Drivers who cannot confidently parse street parking signs.",
    recommendation: "Lead with peace-of-mind parking alarms, then show visual rule parsing as the proof.",
    artifacts: [
      "Founder LinkedIn launch post",
      "Reddit-safe educational reply",
      "Landing page hero rewrite",
      "Short-form UGC script",
      "Activation metric plan",
      "AI-search FAQ cluster",
      "Weekly CMO memo",
    ],
  },
  chatDemo: {
    intro: "Ask the AI CMO about positioning, approvals, CMO reports, Studio pipeline, or the seeded CurbAlarm sprint.",
    starters: [
      "What should the CurbAlarm sprint say first?",
      "What is waiting in approvals?",
      "Summarize the CMO brief.",
      "How does Studio stay safe?",
    ],
  },
  approvalQueue: [
    {
      id: "approval-001",
      title: "LinkedIn founder post",
      channel: "LinkedIn",
      status: "Needs review",
      risk: "Low",
      decision: "Approve after founder voice pass",
    },
    {
      id: "approval-002",
      title: "Reddit educational reply",
      channel: "Community",
      status: "Needs edits",
      risk: "Medium",
      decision: "Remove product link unless directly requested",
    },
    {
      id: "approval-003",
      title: "Landing page activation copy",
      channel: "Website",
      status: "Ready",
      risk: "Low",
      decision: "Ship to demo page only",
    },
  ],
  reports: {
    title: "Weekly CMO Brief",
    summary: "OpenCMO found a narrow CurbAlarm message: drivers want confidence before they park, not more parking data.",
    sections: [
      { title: "What changed", body: "Confusion around sign interpretation is the strongest repeatable pain signal." },
      { title: "What to ship", body: "Lead with alarm confidence, not automation breadth." },
      { title: "What to measure", body: "Track first alarm set rate, saved location starts, and support questions per scan." },
    ],
  },
  studioPipeline: {
    stages: [
      { name: "Radar", state: "Seeded", detail: "Static fixture replay" },
      { name: "Strategy", state: "Ready", detail: "CurbAlarm wedge selected" },
      { name: "Drafts", state: "Queued", detail: "Seven reviewable artifacts" },
      { name: "Approvals", state: "Manual", detail: "Founder review required" },
      { name: "Report", state: "Generated", detail: "CMO brief assembled" },
    ],
  },
  agents: [
    {
      name: "Radar Surface",
      purpose: "Cluster market pain from seeded public-style signals.",
      mode: "Read-only fixture",
    },
    {
      name: "Writer Surface",
      purpose: "Draft campaign assets for manual review.",
      mode: "Local draft only",
    },
    {
      name: "CMO Analyst Surface",
      purpose: "Turn signals, drafts, and approvals into a weekly brief.",
      mode: "Mocked report generation",
    },
  ],
};

export const demoChatResponses = {
  default:
    "OpenCMO is in mocked review mode. I can explain positioning, seeded radar findings, approval decisions, reports, and Studio flow without touching production systems.",
  radar:
    "The seeded radar flow says CurbAlarm should lead with ticket anxiety: help drivers know when to move before they get fined.",
  approvals:
    "Three representative items are waiting: a founder LinkedIn post, a Reddit-safe educational reply, and landing activation copy. All require manual review before use.",
  report:
    "The CMO brief recommends focusing on first alarm set rate, saved location starts, and support questions per scan.",
  studio:
    "Studio moves from radar to strategy to drafts to approvals to a CMO brief. This demo never publishes, scrapes, or calls external platforms.",
};
