# ContractorsIgnite — Pod Manager Onboarding System

**Client:** RoofIgnite / ContractorsIgnite  
**Director of Operations:** Jonathan Forbes  
**Project:** Pod Manager Onboarding — v1 complete, v2 in development (split test)

---

## What This Repo Is

This repository contains everything needed to build the **v2 Pod Manager Onboarding System** — a split test against v1. It includes complete company context, brand guidelines, all onboarding curriculum content, quiz banks, slide data, team structure, and a detailed build prompt for Claude Code.

The v1 was built as a single self-contained HTML file (~215KB). It works. The v2 should be meaningfully better — not cosmetically, but structurally, pedagogically, and experientially.

---

## Quick Navigation

| File | What It Is |
|------|-----------|
| [`prompt/CLAUDE_CODE_PROMPT.md`](prompt/CLAUDE_CODE_PROMPT.md) | **Start here.** The full build brief for Claude Code |
| [`prompt/CONTEXT.md`](prompt/CONTEXT.md) | Supplementary context and constraints |
| [`docs/company-overview.md`](docs/company-overview.md) | ContractorsIgnite business model, mission, structure |
| [`docs/brand-guidelines.md`](docs/brand-guidelines.md) | Colors, fonts, design system |
| [`docs/team-directory.md`](docs/team-directory.md) | Full team roster with roles and contact guidance |
| [`docs/onboarding-curriculum.md`](docs/onboarding-curriculum.md) | Day-by-day content: what gets taught and when |
| [`docs/meta-advertising-standards.md`](docs/meta-advertising-standards.md) | Meta ad rules, CAPI, creative standards |
| [`docs/kpi-framework.md`](docs/kpi-framework.md) | Layer 1 vs Layer 2, diagnostics, account health |
| [`docs/live-review-insights.md`](docs/live-review-insights.md) | Hard lessons from real Pod 1 account review calls |
| [`docs/v1-feature-analysis.md`](docs/v1-feature-analysis.md) | v1 inventory, strengths, gaps, improvement areas |
| [`data/team.json`](data/team.json) | Structured team data |
| [`data/recordings.json`](data/recordings.json) | All Fathom recording links |
| [`data/quiz-bank.json`](data/quiz-bank.json) | All 46 quiz questions (6 quizzes) |
| [`data/slides-75.json`](data/slides-75.json) | 75-slide Company Foundations deck |
| [`data/day-content.json`](data/day-content.json) | Structured day-by-day onboarding checklist data |

---

## The Split Test

**v1** (`ci_onboarding.html`) — single HTML file, dark yellow/black theme, login screen, 10-day worksheet, day quizzes, final 15-question quiz, embedded 75-slide presentation, per-user progress in localStorage.

**v2** (what you're building) — should win on: quiz retention scores, engagement depth, day-completion rate, and return usage (coming back after Day 1). The build prompt details specific improvements.

**Users:** Sam and Patrick (Pod 4, starting April 14, 2026). Jonathan Forbes (admin view).

---

## Key External Links

- **Ad Set Reviewer:** https://ad-set-reviewer.vercel.app/
- **Service Delivery SOP:** https://docs.google.com/document/d/10aoaz3edxvQBsDrwPsHjEO2CgZa0FPA8KltuXDf-IeQ/edit
- **RoofIgnite Website (brand reference):** https://roofignite.com
- **Logo:** `https://cdn.prod.website-files.com/688dfce195a98c50607b16ab/6896b5e75baf4cd978e8f1bf_Primary%20Logo.png`

---

## Repo Conventions

- All content is sourced from real internal calls, docs, and briefings — not fabricated
- Names: Mani (not Manny), Leila (not Layla), Aica (not AICA), Mervin (not Raymond)
- Task management: **ClickUp** (not Asana, not Monday — those are legacy)
- A2P registration = GoHighLevel process, NOT a Meta/Facebook function
- Pod 3 = Kyle & Abdullah (started March 25, 2026)
- Pod 4 = Sam & Patrick (started April 14, 2026)
