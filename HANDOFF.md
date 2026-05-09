# RoofIgnite Portal Build — Handoff

Compact reference for continuing work across sessions. Keep this updated.

## What this is

Two related apps + a shared Google Sheet:

- **`onboarding.roofignite.com`** — Next.js portal for new pod managers. Repo: `jonathanforbes5/onboarding-app` (Jon's Vercel project: `onboarding-app-iazc`). Deploy branch: `claude/build-manager-onboarding-app-lkZbn`.
- **`dashboard.roofignite.com`** — Vanilla HTML/JS Command Center. Repo: `cole506/roofignite-scripts` (folder `Command Centre (Master Dashboard Frontend)/v2/`). Cole's Vercel projects: `roofignite-dashboard`, `roofignite-client-dashboard`. Deploy branch: `master`.
- **Client Check-In Sheet** — Google Sheet `15xYnNomoGM3bQn0TGsIaQaH7bks4ZY3_N3ESFJKIl1Q`, tab `Main`. 50 columns. Source of truth for client data; mirrors to Airtable via existing sync.

## Where things live

| What | Repo | File |
|---|---|---|
| Onboarding portal home + tabs | onboarding-app | `app/page.tsx`, `components/Layout/AppLayout.tsx` |
| Sections (1–20) | onboarding-app | `components/Sections/S{NN}_*.tsx` + meta in `data/sections.ts` |
| ClientMap (US map + cycle profiles) | onboarding-app | `components/Diagrams/ClientMap.tsx` + `app/api/clients-map/route.ts` |
| Embed-only map for iframes | onboarding-app | `app/embed/clientele/page.tsx` |
| Approval Video SOP | onboarding-app | `components/Diagrams/ApprovalVideoSOP.tsx` |
| Big Picture (Miro + Loom) | onboarding-app | embedded in `S06_ServiceDelivery.tsx` (slot keys `s06_miro_journey` + `s06_journey_loom`) |
| Loom slot system | onboarding-app | `components/Diagrams/LoomSlot.tsx` + `app/api/media-links/route.ts` |
| Worksheet (Pod 5) | onboarding-app | `repo/data/day-content-pod5.json` |
| Geocache (city → lat/lng) | onboarding-app | `data/geo/locations.json` |
| Market difficulty tiers | onboarding-app | `data/marketDifficulty.ts` |
| Client Check-In write proxy | onboarding-app | `app/api/client-checkin/route.ts` |
| SPA path rewrites | onboarding-app | `middleware.ts` (replaces old next.config.js rewrites) |
| Dashboard sidebar + tabs | roofignite-scripts | `Command Centre.../v2/{dashboard,account,billing,...}.html` |
| Dashboard Client Info form | roofignite-scripts | `Command Centre.../v2/shared.js` (function `renderClientCheckInForm` ~line 5562) |
| Dashboard Clientele Map page | roofignite-scripts | `Command Centre.../v2/clientele.html` (currently iframes onboarding) |
| Dashboard config (incl. APPS_SCRIPT_URL) | roofignite-scripts | `Command Centre.../v2/config.js` |

## Vercel env vars (project: `onboarding-app-iazc`)

All on Production + Preview, NOT marked Sensitive (Vercel's "Sensitive" flag bit us twice — see "Pitfalls" below):

- `AIRTABLE_TOKEN`        — Airtable PAT (powers `/api/clients-map`)
- `ANTHROPIC_API_KEY`     — for Ask RI chatbot
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` + `SUPABASE_SERVICE_ROLE_KEY` — auth
- `SUPABASE_MANAGEMENT_TOKEN` — for auto-creating tables
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` — server-side Sheets API write proxy. Values live in Vercel only; never paste into this repo. If they ever need rotating, regenerate via OAuth Playground with scope `https://www.googleapis.com/auth/spreadsheets`.
- `NEXT_PUBLIC_INTRO_VIDEO_URL` — set when Jon records the intro Loom

The sketchy "wrong project" trap: there's also a dead `onboarding-app` project — never put env vars there. Always use `onboarding-app-iazc`.

## Supabase tables (project ref `keceufndfmmcpwferudo`)

- `allowed_users`   — auth allowlist (super_admin role gates /admin)
- `chat_logs`       — Ask RI Q&A history
- `chat_knowledge`  — approved Q&A injected into Ask RI prompt
- `search_logs`     — every Cmd+K query (debounced)
- `media_links`     — slot_key → {url, title, transcript} for LoomSlot/MiroBoard

All tables are auto-created on first hit by their respective API routes (using `SUPABASE_MANAGEMENT_TOKEN`). Manual SQL only needed when the auto-creation can't catch a column-missing error.

## Architecture decisions worth remembering

1. **Reads are public via gviz/tq** for the Client Check-In Sheet. Writes go through `/api/client-checkin` which uses Oscar's OAuth refresh token server-side. Browser never sees Google credentials.
2. **Loom transcripts** are stored in the `media_links.transcript` column. LoomSlot renders a "📝 Read transcript" toggle when present.
3. **The Big Picture** (`s06_miro_journey` + `s06_journey_loom`) is required first-watch. Pinned in Quick Access on Resources tab + as the FIRST item on Worksheet Day 1 + Day 4 re-watch.
4. **Map embedding strategy** — currently `dashboard.roofignite.com/clientele.html` iframes `onboarding.roofignite.com/embed/clientele`. NEXT STEP (in progress): switch to native vanilla JS that fetches `/api/clients-map` directly. Eliminates Cole's Vercel as a dependency for the map view.
5. **Tab refocus bug** — Supabase's `auth.onAuthStateChange` re-fires SIGNED_IN on tab focus. We dedupe via `lastHandledEmail` so the page doesn't go blank.

## 20 training sections + their phases

- **Foundation** (1–3): Vision, Industry, Business Model
- **Delivery** (4–6): How We Generate Results, Sales Process, Service Delivery
- **Operations** (7–9): Org Structure, Metrics (L1/L2/L3), KPI Diagnosis
- **Mastery** (10–13): Culture, Account Mgmt, Onboarding Call, Tools
- **Mindset** (14–16): Mindset & Communication, Layered Thinking, Revenue Partner
- **Context** (17–20): Weekly Rhythm, Other Departments, Brand Partners, Time Allocation

## Outstanding loom slots (placeholder until recorded)

- `intro_video` (Jon — required for first-login gate)
- `s17_cole_day`, `s17_tyler_day`
- `s18_sales`, `s18_media-buying`, `s18_creative`, `s18_va`, `s18_finance`, `s18_ops`
- `s20_report_prep`
- `s16_approaching_client_calls`
- `s13_clickup_walkthrough`, `s13_preferences_setup`
- `s06_approval_video_example` (gold-standard reference)

Filled (no longer placeholder): `s06_miro_journey`, `s06_journey_loom`, `s06_creative_construction_mastery`, `s06_approval_example_1/2/3`, `s06_approval_case_*`.

## Known pitfalls

1. **Vercel "Sensitive" env var trap** — saving an env var with Sensitive flag, then editing it later, shows an empty value field. Saving from there wipes the var to empty. Always save with Sensitive UNCHECKED.
2. **Wrong Vercel project** — always confirm you're editing `onboarding-app-iazc`, not the dead `onboarding-app`.
3. **Empty git commits don't bust Vercel CDN cache** — the file content hash is the cache key. To force fresh deploy of a file, change the file content (e.g. add a build-marker comment).
4. **Cole's Vercel deploys can fail** — happens silently sometimes. Last successful deploy stays live. Check `gh api repos/cole506/roofignite-scripts/deployments/<id>/statuses` for state.
5. **Next.js path-to-regexp negative lookaheads are unreliable** — use middleware.ts with explicit JS logic instead of `source: '/:path((?!api|...))'` patterns in next.config.js rewrites.
6. **Static prerender vs middleware** — Next.js can prerender 'use client' pages at build time and Vercel CDN serves the prerender, which means middleware doesn't run. Add `export const dynamic = 'force-dynamic'` to routes that must always go through middleware.

## Map embed — current status

- `onboarding.roofignite.com/embed/clientele` route exists and renders ONLY the ClientMap (no chrome). Currently being deployed.
- `dashboard.roofignite.com/clientele.html` iframes that URL. Cole's Vercel has been failing to deploy the latest version of this file — needs Oscar/Cole to manually inspect the failed deployment in Vercel UI.
- **Next move**: build native vanilla-JS map in `clientele.html` to eliminate iframe + Cole's-Vercel as the dependency. Source data still pulled from `onboarding.roofignite.com/api/clients-map`.

## Conventions

- No emojis in commit messages, code, or docs unless explicitly requested.
- `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` line at the bottom of every commit.
- Always prefer Edit over Write for existing files. Always Read before Edit.
- TypeScript clean (`npx tsc --noEmit`) before push.
