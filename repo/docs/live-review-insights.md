# Live Review Insights — From Real Pod 1 Account Review Calls

These are hard-won lessons from actual Tuesday/Friday review calls with Pod 1 (Gianmarco + Gregory) during their first month. Dated March 20 – April 10, 2026. These are the mistakes, corrections, and patterns that emerged from running real accounts.

---

## Metric Calculation Errors

### CPL vs Cost per Booking (discovered ~March 20)
Pod 1 managers were calculating "cost per lead" by dividing spend by total form submissions — and calling it cost per booking. This inflated perceived performance.

**Correct formula:**
- CPL = ad spend ÷ leads (form fills) — Layer 2 metric
- Cost per Booking = ad spend ÷ confirmed booked appointments — **the number you report**

Jonathan's callout (verbatim tone): "So this is a little bit alarming — we never realized we've been looking at this the wrong way for weeks. For all your accounts, you've been calculating cost per lead, not cost per appointment."

**Implication for v2:** Make this a dedicated callout card in the KPI section. Not buried in a checklist.

---

## Context Before Action

### Easter Weekend Effect (April 10 call)
Multiple accounts showed terrible 7-day metrics during Easter week. On close inspection: leads dropped to near zero from April 2–5 (Good Friday → Easter Sunday). Oscar was about to recommend creative refreshes. Jonathan pulled up the Logbook.

Finding: since April 6, the accounts were generating 3–4 leads/day — strong performance. The 7-day window was poisoned by the holiday. No action was needed on any accounts except Lee Collier, which had genuinely been slow before Easter too.

**Lesson:** Always check for macro events before diagnosing a performance problem. A 7-day window that includes a 4-day holiday tells you nothing.

**Quote from Jonathan:** "Different holidays will have a different effect. Easter, it could have a positive effect or a negative effect. You always want to take in as much consideration [as possible]. The one thing I lack is I don't know local-specific events... this is where client communication at a super micro level can help."

---

## Creative Quality vs Quantity

### The Same Photo Used 8x (discovered ~March 31)
A US Shingle creative refresh was done with what appeared to be new ads — but on close inspection, the same roofer-and-truck photo was used in 8–9 different ads with minor variations.

Jonathan's observation: "We're reusing a lot of damn near the same content across the board. There's that one with the guy on the phone used nine times. And it's not even a good creative to begin with."

**Standard violated:** Creative Mastery requires unique photos for each of the 15 ads in a set. Repeating a photo is not creative variety.

**Implication:** Before tasking a creative refresh, specify: "Follow Creative Mastery standards — 15 unique creatives, no photo used more than once."

---

## Post-Andromeda Framework

### Spend Concentration = Top 3–4 Ads (March 31)
Oscar demonstrated the Andromeda framework live with a US Shingle account:

"Best practice post-Andromeda: you'll notice that spend is not equal anymore. It's going to go towards the top three or four ads typically. If you see creative fatigue and the spend is biasing towards top two, three, or four — turn off those ads, go to the ad set level, click duplicate, republish it again, then turn off the existing one once the new one's published."

**Important nuance Oscar added:** This is a 50/50 shot. Half the time the duplicated set resets and performs well. Half the time it flops. If it flops and cost per lead is significantly higher → do the actual full creative refresh (replace everything).

---

## Pixel Conditioning Discovery

### US Shingles Running with Zero Pixel Events (March 31)
A US Shingles account had been running for weeks. When checking the CAPI setup, they found zero conversion events were being sent back to Meta. The pixel had no data to optimize on.

Oscar: "The team needs to set up pixel conditioning and let the team know. Lead as booked, mark them as qualified, and set up conversions API."

**Immediate action:** Set up CAPI in GHL automation (when "Qualified" tag applied → fire Schedule event). Then backfill: go to all existing booked leads and manually apply the Qualified tag to push historical data.

---

## Campaign Naming

### Missing "B2C" = Missing from Dashboard (March 20)
Oscar spotted that some campaigns weren't showing up in the Account Master Dashboard. Root cause: they didn't have "B2C" in the campaign name.

"If you look on the dashboard, Falcon's Eye Roofing doesn't come up. They haven't gotten leads." — Actually, it showed up once they added "B2C" to the campaign name. The automation pulls only campaigns containing this keyword.

**Rule:** All campaigns must have "B2C" in the name. Check this when launching or duplicating any campaign.

---

## Facebook Page Access Without Business Manager

### Workaround Demonstrated (April 10)
Sharp Exteriors had a Facebook page that no one could get admin access to through Business Manager. Jonathan demonstrated the workaround:

Process:
1. Ask client to go to their Facebook page directly (not through Meta Business Suite)
2. Client goes to Page Settings → Page Access
3. Client adds you as an individual with "Run Ads" permission
4. This requires sending the client a Facebook friend request first
5. Once accepted and added → you can run ads from that page without it being in a Business Manager

"It's not ideal, but you can do it if needed. I had to do this a few times with clients."

**When to use:** When a client has an existing Facebook page but no Business Manager, or their BM is locked/banned. **Never create a BM for the client** — liability.

---

## Account Insights from Real Accounts

### Billing Failure Protocol
From the April 10 call, a client had ads paused 3 days due to a billing failure. Lesson: **call the client immediately**. Don't send a Slack message. Don't email. Call. Every paused day delays the cycle and cashflow.

"CALL the client. Get card updated or bank contacted same day. Meta threshold rises with consistent spend."

### Renewal Conversations
From multiple calls: pod managers were letting cycles expire without initiating renewal conversations. The rule: start the renewal conversation 5–7 days before cycle end. "Proactive renewals feel like a win; surprise renewals create friction."

### Lead Quality Allegations
Multiple clients claimed "the leads suck." Jonathan's response framework:
1. Ask for sales data — how are they tracking leads? What's the CRM? Can they show you a pattern?
2. "Usually the issue is not even on the marketing side. It's usually on the sales side. But they don't know it. But by prompting and asking them for sales data, you're getting them more involved."
3. If they go ghost after you ask → they don't actually have data supporting the claim.
4. If they send data → look for patterns (specific lead types, geographic clusters, etc.) before making any pixel adjustments.

### Open Leads Are Revenue
From the April 10 call: a Lindsey account had 17 open leads and the client was panicking about poor results. Jonathan's analysis: the open leads haven't been called back. Making the account red and having VAs triple-dial those leads should produce several bookings quickly.

Lesson: before assuming a performance problem, always check the ratio of open leads to total leads. If you have a high % of open leads, that's a VA/follow-up problem — not a media problem.

---

## Review Call Operating Norms

**What to bring to Tuesday/Friday calls:**
- Current status for every single account (no "I need to check on that")
- Health color and reason for that color
- Specific action steps with dates — not "I'm going to look at it"
- Questions you've already tried to solve yourself

**What happens in the call:**
- Pod managers share screen and walk through their accounts
- Jonathan and Oscar identify issues and prescribe fixes
- Action items are expected to be executed same day where possible
- Feedback is direct — "this should never have passed through" is a normal statement, not a personal attack

**Operating rhythm for accounts:**
- Mon/Thu: status update posted in channel
- Tue/Fri: review call where that update is discussed and actioned
- Jonathan may send pre-call notes or action items based on the written update before the call happens

---

## Glossary of Recurring Terms from Calls

These came up repeatedly and caused confusion for new pod managers:

| Term | Definition |
|------|-----------|
| CPL | Cost per Lead — NOT cost per booking. Divide spend by form fills. Layer 2 metric only. |
| Cost per Booking | Spend ÷ confirmed appointments. The number that matters. Layer 1. |
| Andromeda | Meta's AI algorithm update that concentrates spend on top-performing ads. |
| Creative Fatigue | When a performing ad deteriorates — increasing CPC, declining CTR, falling bookings. |
| CAPI | Conversion API. Technical pipeline that sends booked appointment data back to Meta pixel. |
| Pixel Conditioning | Manually sending qualified lead data back to CAPI to tell Meta what to optimize for. |
| Pixel Seasoning | Adding survey question filters so only specific homeowner types trigger a conversion event. |
| Logbook | Central spreadsheet where VAs document every lead from every account. Ground truth for lead data. |
| Command Center | Dashboard showing account health by color (red/orange/yellow/green). Daily triage tool. |
| B2C | Keyword that must be in all campaign names for the Account Master Dashboard to track them. |
| OSA | Out of Service Area. Lead generated outside the client's agreed service area. |
| Open Lead | A lead in the Logbook that hasn't been booked or disqualified yet — still chasing. |
| White Lead | Logbook term for open/unbooked lead (not yet resolved one way or another). |
| Live Transfer | VA calls lead → if interested, transfers live to client's sales rep. |
| A2P / 10DLC | 10-digit long code phone registration via GHL. NOT a Meta function. 2–3 week approval. |
