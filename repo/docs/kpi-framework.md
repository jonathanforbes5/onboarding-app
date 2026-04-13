# KPI Framework — Layer 1 & Layer 2 Diagnostics

This is one of the most important frameworks pod managers must internalize. Get this wrong and you waste hours optimizing the wrong thing.

---

## The Core Rule

> **If Layer 1 is healthy, do not look at Layer 2.**

With 25+ accounts to manage, your time is the bottleneck. The Layer system protects it.

---

## Layer 1: Outcome Metrics

These answer: **"Is the account producing results?"**

| Metric | Definition | Where to Find |
|--------|-----------|---------------|
| Booked Appointments | Confirmed appointments (VA called, lead booked, qualified tag applied) | Logbook → filter by Qualified/Booked |
| Bookings vs Target | Current bookings ÷ agreed target (e.g., 8/15 = 53%) | Command Center |
| Cost per Booking | Total ad spend ÷ total booked appointments | Calculate manually |
| Health Status | Green / Yellow / Orange / Red | Command Center |
| Days Elapsed | Days since ads launched ÷ cycle length | Account Master Dashboard |

**Health thresholds (rough guide):**
- 🟢 Green: On track to hit 80%+ target by cycle end
- 🟡 Yellow: 10–20% behind pace
- 🟠 Orange: 20–40% behind pace, VA escalation needed
- 🔴 Red: 40%+ behind pace, immediate action + Jonathan escalation

---

## Layer 2: Diagnostic Metrics

These answer: **"Why isn't Layer 1 working?"** — Only look here when Layer 1 is failing.

| Metric | Benchmark | Problem Signal |
|--------|-----------|---------------|
| Cost per Link Click (CPC) | < $4–6 for roofing | > $8 = creative fatigue or wrong audience |
| Link Click-Through Rate (CTR) | > 0.8–1.5% | < 0.5% = ad creative not resonating |
| Survey Conversion Rate | > 2.5% | < 1.5% = survey too long or mismatch with ad promise |
| Out-of-Service-Area (OSA) Rate | < 15% | > 25% = targeting issue or creative calling wrong market |
| Lead-to-Booking Rate | > 50% | < 30% = VA performance issue or low-quality leads |

**Diagnostic flow:**
```
Layer 1 failing
    ↓
Check Logbook — lead quality OK? (are leads in-area, qualified, responsive?)
    ↓
Yes: Check Layer 2 → high CPC/low CTR? → Creative problem → Creative refresh
No: Check survey → question mismatch? → Survey update
    ↓
Still failing after 5–7 days post-refresh?
    → Escalate to Jonathan immediately
```

---

## Cost per Booking Calculation

**CRITICAL:** Pod 1 managers consistently confused CPL (cost per lead) with cost per booking. They are different.

```
CPL (cost per lead):
    Ad Spend ÷ Total Form Submissions

Cost per Booking (what we report):
    Ad Spend ÷ Total Booked Appointments

Example:
    $5,000 ad spend
    80 form submissions
    22 booked appointments

    CPL = $5,000 / 80 = $62.50
    Cost per Booking = $5,000 / 22 = $227.27
```

**Always report cost per booking. CPL is a Layer 2 metric — only relevant when bookings are low.**

---

## The Pixel Layer (Below Layer 2)

When both Layer 1 and Layer 2 look bad, check the pixel:

**Pixel Conditioning:** Manually sending conversion events back to Meta via CAPI (Conversion API). Tells Meta: "This is what a qualified booking looks like — go find more of these people."
- Set up via GHL automation: when "Qualified" tag is applied → fire Schedule event to CAPI
- If pixel has 0 conversion events, Meta is spending blind

**Pixel Seasoning:** Adding qualification criteria to the survey itself so only certain homeowners trigger the conversion event.
- Example: Only fire conversion event if homeowner selects "Asphalt Shingle" or "Metal" (not if they select "I'm not sure")
- Ensures Meta optimizes for the right type of lead, not just anyone who fills out a form

**Rule:** Don't add pixel seasoning until you have at least 30–50 raw leads. Too early = not enough signal.

---

## Context Before Action

> Before making any changes based on Layer 1 or Layer 2 data, check context first.

**Context checklist:**
- Was there a holiday in the last 7 days? (Easter, Thanksgiving, Labor Day, etc.)
- Is this a new account? (First 7–10 days have unreliable data — learning phase)
- Was there a payment failure that paused ads? (Every paused day = dead data)
- Did you just do a creative refresh? (New campaigns need 48–72 hours to stabilize)
- Is it a weekend? (Some markets perform significantly differently Mon–Thu vs Fri–Sun)

**Example:** An account showing terrible 7-day metrics during Easter week. The 4 days from Good Friday → Easter Monday had zero leads. Adjusting the window to the 4 days post-Easter → excellent performance. No action needed.

---

## Account Health Escalation Protocol

| Situation | Action |
|-----------|--------|
| Yellow status (slightly behind) | Increase monitoring frequency. Note in Monday/Thursday update. |
| Orange status | Message VAs in #internal-team to prioritize this account's open leads. Note context and action steps in Slack update. |
| Red status | (1) Update Command Center to red. (2) Tag Leila in #internal-team: "X account is red — all open leads need immediate follow-up." (3) Check Layer 2. (4) If creative issue → escalate to Emmanuel/Ken. (5) Report at Tuesday review call with full action plan. |
| 42+ days, still behind | Full escalation to Jonathan. Creative overhaul, targeting review, potential offer pivot. |
| Client threatening to leave | Loop in Oscar. He plays the "CEO card." This almost always retains the client. |

---

## KPI Diagnostic Reference Table

The standard diagnosis table pod managers use at review calls:

| Problem | Symptoms | Prescription | Who Executes |
|---------|----------|-------------|--------------|
| Low lead flow | Few form submissions, CPC normal | Check CTR — creative refresh if CTR < 0.8% | You (task Ken/Emmanuel) |
| Poor survey conversion | Clicks high, leads low | Shorten survey, adjust headline, match ad promise | You + Emmanuel |
| High OSA rate | Many out-of-area leads | Check targeting vs account-specific doc, exclude problem zips | You (ad account changes) |
| Low booking rate | Leads in, bookings low | Check open leads in Logbook — tag Leila to escalate VA calling | You → Leila |
| Creative fatigue | CPC rising, CTR falling, CPL climbing | Post-Andromeda protocol: duplicate ad set without top-reach ads | You + Emmanuel |
| Ads not spending (billing fail) | Card declined, ads paused | CALL the client immediately — every paused day = delayed cycle | You (phone call) |
| Pixel has zero events | No conversion data in Meta | Set up CAPI in GHL automations, backfill all existing qualified leads | Emmanuel |
