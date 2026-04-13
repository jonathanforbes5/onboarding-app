# Build Prompt: ContractorsIgnite Pod Manager Onboarding System v2

**You are building the definitive onboarding experience for ContractorsIgnite pod managers.** This is a split test against v1. Your job is not to replicate v1 — it's to beat it. Go above and beyond. Think like a product designer, instructional designer, and engineer simultaneously.

Read every file in this repository before writing a single line of code.

---

## The Mission

ContractorsIgnite (RoofIgnite) is a digital marketing agency that runs Facebook/Meta ad campaigns for roofing, HVAC, and gutter contractors. They manage clients in "pods" — each pod has 2 pod managers who own ~25 client accounts each by the end of ramp.

Pod 4 is Sam and Patrick, starting April 14, 2026. This onboarding system is what they use for their first 10 days. It's also a permanent reference document they'll return to throughout their first 90 days.

Jonathan Forbes (Director of Operations) is the admin. He needs visibility into both users' progress.

**Primary users:** Sam (Pod Manager), Patrick (Pod Manager)  
**Admin user:** Jonathan Forbes  
**Starting date:** April 14, 2026

---

## v1 Summary (What Already Exists)

v1 is a single self-contained HTML file (~215KB). It includes:

- **Login screen** — 3 users (Sam, Patrick, Jonathan), per-user progress in localStorage
- **Worksheet tab** — 10-day checklist with embedded recording links, section quizzes after each day group
- **6 Quizzes** — Day 1 (7Q), Day 2 (7Q), Day 3 (6Q), Days 4-5 (5Q), Week 2 (6Q), Final (15Q) = 46 total
- **Presentation tab** — Interactive 75-slide viewer with sidebar nav, keyboard controls
- **Team directory, KPI table, Meta rules, communication standards** all included

### v1 Strengths
- Comprehensive content coverage
- Working quiz system with explanations
- Slide presentation with sidebar nav
- Per-user progress tracking (localStorage)
- Single-file portability

### v1 Gaps (What v2 Must Fix)
1. **No day unlock/gating** — all content is accessible from Day 1, removing urgency
2. **No admin dashboard** — Jonathan can't see Sam & Patrick's progress
3. **Static slides** — no transitions, no zoom, slides feel like reading a document
4. **No glossary** — first-timers encounter terms like CAPI, A2P, Andromeda, Layer 1/2 with no quick lookup
5. **No scenario practice** — quizzes are multiple choice only, no "what would you do" judgment calls
6. **No daily accountability** — no prompt to "did you post your Monday/Thursday update today?"
7. **No notes** — users can't annotate sections
8. **No mobile optimization** — desktop-only experience
9. **Recordings are just links** — no embedded video or chapter markers
10. **No celebration/milestone moments** — completing Day 5 or passing the final quiz feels the same as clicking a checkbox
11. **No quick-reference mode** — returning after Week 2, you have to scroll to find the billing failure SOP
12. **Presentation and worksheet are separate tabs** — no in-context slide preview while reading day content

---

## v2 Requirements

### Must Have
- [ ] **Day unlock system** — Days are locked until the previous day's quiz is passed with 80%+. Day 1 is always open. Failure gives targeted feedback on weak areas, allows retry.
- [ ] **Admin view (Jonathan)** — Dedicated admin panel showing: Sam & Patrick's last active time, % complete per day, quiz scores, which checklist items are done, and any items flagged as stuck. No login friction for Jonathan — recognize admin session.
- [ ] **Glossary** — Searchable quick-reference panel (slide-out or modal). 30+ terms: Layer 1, Layer 2, CAPI, A2P (GHL), Andromeda, Logbook, Command Center, Account Master Dashboard, 80% Rule, Pixel Seasoning, Pixel Conditioning, Pod, Cycle, Setup Fee, Retainer, OSA, CPL, Cost per Booking, Creative Fatigue, Live Transfer, B2C (campaign keyword), etc.
- [ ] **Progress persistence** — Keep localStorage but structure it better. Store: day completion, quiz scores, timestamp of completion, checklist item states.
- [ ] **Mobile-first layout** — Responsive at 375px+. Touch-friendly checkboxes. Swipeable slides on mobile.
- [ ] **Milestone celebrations** — Visual/animated moments at: first quiz pass, Day 5 completion, final quiz pass. Keep them tasteful and brand-aligned (not cringe).
- [ ] **Yellow/Black/White brand only** — See `docs/brand-guidelines.md`. The RoofIgnite brand is yellow (#F5C800), near-black (#0A0A0A), white (#F5F5F5). No other accent colors.

### Should Have
- [ ] **Scenario practice** — After each quiz, 1-2 short "what would you do?" judgment call scenarios relevant to that day's content. Text input + model answer reveal (no right/wrong scoring). Helps with real situations they'll face.
- [ ] **Daily accountability prompt** — On Mon/Thu: reminder to post status update. On Tue/Fri: reminder about review call. Appears as a non-blocking banner, dismiss-able.
- [ ] **Inline slide previews** — When Day 1 mentions "Company Foundations deck," the relevant slide should be previewable inline without switching tabs.
- [ ] **Notes system** — Each user can write private notes on any day section. Notes persist in localStorage. Jonathan can't see notes (privacy).
- [ ] **Quick-reference mode** — A condensed single-page view of: key contacts, key rules, key links. Printable. No login required to view (or auto-opens for returning users who've completed onboarding).
- [ ] **Better slide viewer** — Smooth CSS transitions between slides. Fullscreen mode. Zoom on click for diagrams. Keyboard navigation (already exists in v1, keep it).
- [ ] **Search** — Global search across worksheet content, glossary, and slide titles.

### Nice to Have
- [ ] **Progress export** — Jonathan can export a CSV or JSON of both users' completion data.
- [ ] **Custom welcome message** — Jonathan can set a message that Sam and Patrick see on their first login.
- [ ] **Streak tracker** — "You've logged in 3 days in a row." Encourages daily return during ramp period.
- [ ] **Completion certificate** — A generated "Jonathan Forbes certifies that [Name] has completed Pod 4 Onboarding" badge/card after final quiz pass.

---

## Technical Requirements

### Deliverable Format
Prefer a **single self-contained HTML file** for easy deployment and A/B comparison. This means:
- All CSS inlined
- All JavaScript inlined
- No external dependencies except Google Fonts and the logo URL
- No build step required — drag-and-drop opens in browser
- Target: under 400KB total

If you genuinely believe a different approach (e.g., two-file HTML+JS) serves the goals better, make that case in a comment at the top of the output and proceed.

### Data Architecture
All app data should be defined as JavaScript constants near the top of the script section, making it easy for future editors to update content without touching logic. Structure:
```js
const TEAM = [...];       // from data/team.json
const RECORDINGS = {...}; // from data/recordings.json
const QUIZ_BANK = {...};  // from data/quiz-bank.json
const SLIDES = [...];     // from data/slides-75.json
const DAYS = [...];       // from data/day-content.json
const GLOSSARY = [...];   // build from docs/meta-advertising-standards.md + kpi-framework.md
```

### State Management
Use a single state object. All localStorage reads/writes go through two functions: `saveState(state)` and `loadState()`. Never call `localStorage` directly from component logic. This makes it easy to swap out storage later.

```js
const STATE_KEY = 'ci_onboarding_v2';
function saveState(state) { localStorage.setItem(STATE_KEY, JSON.stringify(state)); }
function loadState() { 
  try { return JSON.parse(localStorage.getItem(STATE_KEY)) || defaultState(); }
  catch { return defaultState(); }
}
```

### CSS Architecture  
Use CSS custom properties (already done in v1). v2 should extend this with a proper component system:
```css
/* All spacing from a base 4px grid */
/* All typography from a type scale */
/* All colors from custom properties only — no hardcoded hex in component CSS */
```

---

## Content & Curriculum

All content is in `docs/onboarding-curriculum.md` and `data/day-content.json`. Key facts:

- **Pod 4 start date:** April 14, 2026
- **Target:** 10–15 accounts in first 2 weeks
- **Cashflow urgency:** Every day an account isn't launched = delayed revenue
- **Operating rhythm:** Mon/Thu status updates → Tue/Fri review calls with Jonathan + Oscar
- **Company name:** ContractorsIgnite (brand). RoofIgnite = legacy domain still in use.

See `docs/onboarding-curriculum.md` for the full day-by-day breakdown.

---

## What "Better" Looks Like

The split test measures:
1. **Quiz retention** — Do Sam & Patrick score higher on the final quiz in v2 vs a hypothetical v1 cohort?
2. **Day completion rate** — Do they complete more days in v2 (gated) vs v1 (open)?
3. **Return engagement** — Do they open v2 more than once in a 10-day period?
4. **Jonathan's confidence** — Does Jonathan feel like he has enough visibility without being in a constant Slack thread with them?

---

## Brand & Design Direction

Full guidelines in `docs/brand-guidelines.md`. Key points:

- **Only 3 colors:** Yellow `#F5C800`, Near-black `#0A0A0A`, White `#F5F5F5`
- **Display font:** Barlow Condensed (700, 800, 900 weights) for headers and impact moments
- **Body font:** DM Sans (300–600) for readability
- **Logo:** `https://cdn.prod.website-files.com/688dfce195a98c50607b16ab/6896b5e75baf4cd978e8f1bf_Primary%20Logo.png`
- Reference: `docs/brand-guidelines.md` and the Creative Mastery PDF for visual aesthetic

The design language: **industrial, direct, no-nonsense.** This is not a startup SaaS onboarding — it's a production environment for people who need to perform from Day 2. Design should feel capable, not cute.

---

## Things to Get Right That v1 Got Wrong

1. **A2P is GoHighLevel, not Meta.** Every time A2P is mentioned, be explicit: "A2P registration via GHL A2P Wizard — this is a GoHighLevel phone compliance process, not a Meta/Facebook function."

2. **Cost per Booking ≠ Cost per Lead.** Pod 1 managers made this mistake for weeks. Reinforce: Cost per Booking = Ad Spend ÷ Appointments (not leads). Make this a dedicated callout, not buried in a checklist.

3. **Layer 1 before Layer 2.** The framework is: if Layer 1 (bookings vs target) is healthy, you don't look at Layer 2 (CPC, CTR) at all. This sequencing must be clear.

4. **ClickUp, not Asana.** All task management is ClickUp. Asana was legacy.

5. **Leila is Head of VA Management** (not just a VA manager). Logbook access comes from Leila. VA escalations go to Leila first.

6. **Mervin** supports Emmanuel on setups and ongoing media buying — same role/tier, not subordinate.

---

## Starting Checklist for Claude Code

Before writing any code:
- [ ] Read all files in `/docs/`
- [ ] Read all files in `/data/`
- [ ] Study `docs/v1-feature-analysis.md` thoroughly
- [ ] Note which content requires the most cognitive load (those are your highest-priority pedagogy moments)
- [ ] Plan your component/section architecture before writing HTML
- [ ] Define your full state schema before writing any logic
- [ ] Design the admin view as a distinct UX mode, not just an overlay

When you're ready to build:
- [ ] Start with the data layer (constants + state management)
- [ ] Build the layout shell (login → app → tabs)
- [ ] Build the worksheet with day unlock logic
- [ ] Build the quiz engine
- [ ] Build the glossary
- [ ] Build the slide viewer
- [ ] Build the admin panel
- [ ] Polish: animations, mobile, search, celebrations
- [ ] Final check: all content accurate, all links working, no hardcoded colors

---

## You Have Full Creative Latitude

If you see an opportunity to build something not listed here that serves the mission — **build it.** Document what you built and why in a comment block at the top of the file. This is about building the best possible onboarding system, not checking off a requirements list.

Ideas worth considering that aren't explicitly required:
- Day timeline visualization (visual roadmap of the 10-day journey)
- "Ask Jonathan" quick-draft messages (pre-written Slack templates for common situations)
- Side-by-side comparison mode for Pod 3 vs Pod 4 timeline
- Audio/visual toggle for accessibility
- "I'm stuck" button that surfaces escalation guidance for common blockers

This is a real product used by real people on a real start date. Make it excellent.
