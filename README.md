# OpenCMO Submit

It showcases the founder-facing dashboard, CurbAlarm Growth Sprint, AI CMO chat shell, approval queue, CMO brief, Studio pipeline, and stable agent surfaces using mocked data only.

## Setup

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Scripts

```bash
npm run install
npm run dev
npm run build
npm run test
```

## Routes To View

- `/` - product overview and route launcher
- `/dashboard` - OpenCMO mission control
- `/growth-sprint` - CurbAlarm Growth Sprint proof trace
- `/chat` - guarded AI CMO chat demo
- `/approvals` - founder approval queue
- `/reports` - CMO brief and weekly report
- `/studio` - Studio pipeline
- `/agents` - radar, writer, and analyst surfaces
- `/api/opencmo/bootstrap` - mocked bootstrap payload
- `/api/opencmo/chat` - mocked chat response

## Architecture Note

The backend in this repository is intentionally mocked for hackathon review. The demo uses local static fixtures and a small Node development server to simulate API responses. Production integrations are not included: no Supabase production connections, Stripe, PostHog, RevenueCat, private worker execution, connector internals, real auth, raw worker logs, or customer data.

## Excluded From This Submission

- Production environment files and service keys
- Production backend architecture and private execution services
- Billing, analytics, and subscription integrations
- Internal docs, worker logs, and source connector internals
- Real customer data and production commit history

## Copyright

Copyright © 2026 Yuhua “Gavin” Wu. All rights reserved.
This repository is provided for hackathon review and demonstration only. No license is granted for commercial use, redistribution, or derivative products without written permission.
