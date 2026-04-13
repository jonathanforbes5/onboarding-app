# v1 Feature Analysis — What Was Built, What Works, What Doesn't

This document is for Claude Code building v2. Study this before writing any code.

---

## v1 Architecture

**Type:** Single self-contained HTML file  
**Size:** ~215KB  
**Dependencies:** Google Fonts (Syne, DM Sans, Barlow Condensed), logo URL  
**State:** localStorage only, per-user key  
**Build:** None. Open in browser.

---

## v1 Feature Inventory

### ✅ Login System
- 3 hardcoded users: Sam, Patrick, Jonathan
- User selection on login screen (click a card, no password)
- Per-user progress stored in `localStorage` with key `ri_user`
- Avatar colors: Sam = yellow gradient, Patrick = amber gradient, Jonathan = slate
- Header shows: logo, tabs, user pill with name + avatar, progress bar + %
- Logout function clears current session (but not saved progress)

**What works:** Simple, fast, zero friction. Good for a single cohort.  
**What doesn't:** No admin panel. Jonathan sees the same view as Sam/Patrick. No visibility into both users from one session.

---

### ✅ Worksheet Tab (10-Day Onboarding)

Sections:
1. **Overview** — stat boxes (start date, account targets, pod #, cashflow urgency alert)
2. **Your Role** — compensation breakdown, operating rhythm, responsibility checklist
3. **Your Team** — 12+ team cards across Leadership, Pod Managers, Media Buying, VA Management
4. **Days 1–10** — structured day-by-day checklists with embedded recording links
5. **KPI Reference** — Layer 1 vs Layer 2 framework, 6-row diagnosis table
6. **Meta Advertising** — 6 approved placements, campaign rules, Facebook page troubleshooting
7. **Communication Standards** — daily routine, 24–48hr rule, revenue activities
8. **Creative Resources** — Ad Set Reviewer link, Creative Mastery summary
9. **Live Review Insights** — 7 lessons from real Pod 1 calls
10. **Final Quiz** — 15-question comprehensive test

**Checklist mechanics:**
- `<li onclick="toggle(this)">` — click to toggle checked state
- Checked state stored in localStorage by group ID + item index
- Progress bar updates on every toggle (counts all checked items / all items)

**What works:** Comprehensive content. Recording links embedded directly. Team directory is useful.  
**What doesn't:**  
- All days visible from Day 1 (no lock/gate)
- No way to mark "Day 1 complete" as a milestone
- Checklist progress mixes days (completing Day 10 items counts same as Day 1)
- No differentiation between "I read this" checkmarks vs "I did this" task items

---

### ✅ Quiz System

**6 quizzes:**
| Quiz ID | Label | Questions |
|---------|-------|-----------|
| `day1` | Day 1 | 7 |
| `day2` | Day 2 | 7 |
| `day3` | Day 3 | 6 |
| `day4` | Days 4–5 | 5 |
| `week2` | Week 2 Wrap | 6 |
| `final` | Final Comprehensive | 15 |

All questions are in `data/quiz-bank.json`.

**Quiz mechanics:**
- Single-select multiple choice (4 options)
- Correct answer highlighted on selection
- Explanation shown after each answer
- Score tracked (X / total)
- Pass message for 100%, encouragement for others
- Retake button
- Progress stored in localStorage (score + whether quiz was passed)

**What works:** Good question variety. Explanations add real value. Retake is fast.  
**What doesn't:**  
- No pass/fail gating (quiz doesn't unlock next day)
- Score tracked but doesn't affect anything
- No spaced repetition or second-chance questions
- No scenario/judgment questions (all multiple choice)
- Quizzes placed at end of day sections but feel disconnected from content

---

### ✅ Presentation Tab — 75 Slides

**Viewer features:**
- Left sidebar with slide list (numbered, grouped by section)
- Active slide highlight in sidebar
- Prev/Next navigation buttons
- Keyboard arrow key support (←→)
- Slide counter (X / 75)
- 5 slide types with distinct CSS rendering: cover, section, content, statement, closing, agenda

**Slide CSS (v1 improved → same in v2 target):**
- Cover: dark bg, yellow bottom bar, Barlow Condensed title, eyebrow label, logo
- Section: centered, yellow top bar, ultra-bold 58px title
- Content: header row (slide number + Barlow Condensed title), DM Sans body
- Statement: large centered text, decorative quotation mark
- Closing: yellow top and bottom border bars

Slide data: `data/slides-75.json`

**What works:** Complete deck, good variety, keyboard navigation feels professional.  
**What doesn't:**  
- No slide transition animations
- Can't fullscreen a slide
- No zoom on click for dense content slides
- Sidebar doesn't group by section header with collapsible groups
- When reading Day 1 worksheet, can't preview the slide being referenced without switching tabs

---

### ✅ Progress System

**What's tracked:**
- Checklist item state (checked/unchecked) per user per group
- Quiz scores per quiz per user
- Active user in localStorage

**What's missing:**
- No per-day completion milestone
- No admin visibility
- No timestamps (when was Day 1 completed?)
- Progress calculation counts all items equally (Day 1 checkbox = Day 10 checkbox)

---

### ❌ Not in v1 (Build for v2)

| Feature | Priority | Notes |
|---------|----------|-------|
| Day unlock/gating | Critical | Days 2–10 should unlock as quizzes are passed |
| Admin panel for Jonathan | Critical | See both users' progress from one view |
| Glossary | Critical | 30+ terms, searchable |
| Mobile-first layout | High | v1 is desktop only |
| Scenario practice questions | High | "What would you do if..." after each quiz |
| Milestone celebrations | Medium | Confetti or animation on Day completion, final quiz pass |
| Notes system | Medium | User-private annotations on sections |
| Daily accountability prompts | Medium | Mon/Thu update reminder, Tue/Fri call reminder |
| Inline slide preview | Medium | Preview slide without switching tabs |
| Quick-reference mode | Medium | Condensed view for returning users post-ramp |
| Global search | Low | Search across all content |
| Progress export | Low | Jonathan exports CSV/JSON |
| Completion certificate | Low | Generated badge for final quiz passers |
| Streak tracker | Low | Daily return encouragement |

---

## v1 Code Architecture Notes

### What to Learn From
- CSS custom properties (`--acc`, `--surf`, etc.) — good pattern, extend in v2
- Inlined data as JS constants (`SLIDES_DATA`, `DAYS_DATA`) — keep this approach
- Toggle function for checklists — simple, works well
- `answerQ(quizId, qIdx, optIdx, correctIdx)` — clean quiz answer function

### What to Improve
- State is written to localStorage on every individual toggle — should batch writes
- No separation between data and rendering — interleaved in the HTML
- Quiz state and checklist state stored with different key patterns — unify into one state object
- Admin view is `login('jonathan')` which renders same as sam/patrick — needs its own rendering path
- No loading states or optimistic UI — fine for now but glossary/search will need it

### CSS Issues in v1
- Some colors were hardcoded instead of using CSS variables (partially fixed in v1 updates)
- Slide CSS was rebuilt mid-project and has some legacy compatibility rules that can be cleaned up
- Mobile styles are absent — need full responsive layer

---

## v1 Known Content Gaps

1. **Logbook** — described but no visual of what it looks like or how to read it
2. **Command Center** — referenced but not shown
3. **ClickUp task format** — "task via ClickUp with full client details + 48hr deadline" — what fields? what format?
4. **Pre-onboarding email template** — referenced but not included
5. **Pre-onboarding checklist** (sent to clients) — referenced but not shown
6. **Account-specific document** — mentioned in review calls but not explained
7. **Creative Forge** — mentioned as an AI tool for creative refreshes but not explained
8. **Andromeda playbook** — referenced in calls but content not included

These are opportunities for v2 to go deeper.

---

## v1 Files Reference

| File | Description |
|------|-------------|
| `ci_onboarding.html` | The v1 deliverable (~215KB, self-contained) |
| `data/slides-75.json` | 75-slide deck content |
| `data/quiz-bank.json` | All 46 quiz questions across 6 quizzes |
| `data/team.json` | Structured team data |
| `data/recordings.json` | All Fathom recording links |
| `data/day-content.json` | Day-by-day structured checklist content |
