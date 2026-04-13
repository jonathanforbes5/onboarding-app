# Meta Advertising Standards

## Approved Placements (Exactly 6)

This is non-negotiable. No exceptions.

| # | Placement |
|---|-----------|
| 1 | Facebook Feed |
| 2 | Instagram Feed |
| 3 | Facebook Stories |
| 4 | Instagram Stories |
| 5 | Facebook Reels |
| 6 | Instagram Reels |

**Never approve:**
- Facebook Marketplace
- Facebook Messenger
- Audience Network (any partner apps/sites)
- Instagram Explore
- Any other placement

When setting up campaigns, **manually select** these 6 placements. Never leave it on "Advantage+ Placements" (Meta will add everything).

---

## Campaign Setup Rules

### Campaign Level
- **Objective:** Always "Leads"
- **Campaign name:** Must include "B2C" — required for Account Master Dashboard tracking
- **Advantage+ Campaign Budget:** OFF — use standard campaign budget
- **Budget control:** Set at ad set level, not campaign level

### Ad Set Level  
- **Optimization:** "Maximize number of leads" (not value, not conversions)
- **Attribution:** 7-day click, 1-day view
- **Placements:** Manual — select the 6 approved placements only
- **Limited spend to excluded placements:** OFF (check this after duplicating — Meta sometimes re-enables)
- **Advantage+ Audience:** OFF
- **Audience targeting:** Broad targeting in service area (radius or zip codes)

### Ad Level
- **Display URL:** Domain only, no HTTPS:// prefix (e.g., `roofingcompany.com` not `https://roofingcompany.com`)
- **Call to action:** "Get Quote" or "Learn More"
- **Primary text:** Use approved copy variants (Main, No, Owner, Thousands Less, Market Sophisticated)

---

## A2P (10DLC) — What Every Pod Manager Needs to Know

**What it is:** A federal compliance requirement for businesses sending SMS messages. The phone number(s) used to text leads must be registered and approved.

**Critical facts:**
- A2P is a **GoHighLevel (GHL)** registration process — NOT related to Meta/Facebook in any way
- Emmanuel handles all A2P registrations via GHL's A2P Wizard
- Approval takes 2–3 weeks from submission
- A rejected application = 2–3 more weeks before you can reapply
- Pod managers **never touch A2P** — always task Emmanuel via ClickUp

**When to task Emmanuel for A2P:**
- When a new client is onboarded (before or during setup)
- Include in the ClickUp task: client name, GHL sub-account link, 48hr deadline label

**What happens if A2P is delayed:**
- VAs can still make outbound calls — A2P only affects SMS texting
- Outbound calling continues as normal
- Text follow-up sequences are paused until A2P is approved

---

## Facebook Page Access

### Standard Access (Best Practice)
1. Client has a Facebook Business Manager (Meta Business Suite)
2. Client adds ContractorsIgnite as a Partner
3. We get access to their Facebook page and can run ads from it within our own BM

### When Client Doesn't Have BM or Can't Access Their Page
Individual page access workaround:
1. Ask client to go directly to their Facebook Page
2. Client goes to Page Settings → Page Access
3. Client adds you as an individual with "Run Ads" permission
4. **Requires:** Client must send you a Facebook friend request first (and you accept)
5. Once accepted and added, you can run ads from that page

**Never:** Create a Facebook Business Manager for the client. Liability risk — if Meta flags the client's business activities, the BM (which we control) becomes our liability.

**What to do with brand new Facebook pages:**
- Boost the new page by having team members and other accounts we manage follow it
- Target: 200+ followers before launch looks more credible in ads

---

## CAPI — Conversion API Setup

CAPI sends conversion data (booked appointments) from GoHighLevel back to Meta, so Meta's pixel knows what a qualified lead looks like.

### Why CAPI Matters
Without CAPI, Meta spends money generating form fills — but doesn't know if those leads turned into booked appointments. With CAPI, Meta learns to target people who are more likely to book, not just fill out forms.

**Effect:** Accounts with CAPI configured consistently outperform accounts without it as they scale. The pixel "learns" faster.

### How It's Set Up (Emmanuel handles this)
1. In GHL automation builder: find the "Qualified" tag trigger
2. Add a step: "Meta Conversion API → Schedule event"
3. Enter the Meta pixel ID and CAPI access token for that client's pixel
4. Save and test

### Pod Manager's Role
1. Verify CAPI is active for each account (check Meta Events Manager — should see "Schedule" events)
2. When you apply the "Qualified" tag to a lead, it fires the conversion event to Meta
3. Backfill: for any account with zero CAPI events, ask Emmanuel to set it up, then retroactively apply the Qualified tag to all existing booked leads

### Pixel Conditioning vs Pixel Seasoning
| Term | What It Is |
|------|-----------|
| Pixel Conditioning | Manually sending booked appointment data back to Meta via CAPI. Tells Meta: "find more people like this booked lead." |
| Pixel Seasoning | Adding filtering criteria to the survey so only specific homeowner types trigger a conversion event. Example: only fire conversion for homeowners who select "metal roof" or "shingle." |

Use pixel seasoning only after you have 30–50 leads (need enough data first).

---

## Creative Fatigue & The Post-Andromeda Protocol

### Signs of Creative Fatigue
- CPC (cost per link click) increasing week over week
- CTR (click-through rate) declining week over week
- Lead volume dropping with same or higher spend
- Top 3–4 ads getting 90%+ of spend while others get nothing

### The Protocol (in order)

**Step 1: Context check first**
- Was there a holiday in the data window?
- Is this a new campaign (< 7 days)? Normal volatility.
- Was there a billing failure that paused ads?
- If yes to any → wait before acting.

**Step 2: Check Layer 1**
- If bookings are on target → do nothing. Layer 2 metrics don't matter.

**Step 3: Post-Andromeda Duplicate**
1. In the ad set, sort by reach
2. Note the top 3–4 ads (getting ~90% of spend)
3. At the **ad set level**, duplicate the ad set
4. In the new ad set, turn off those top-reach ads
5. Turn on the new (duplicated) ad set
6. Turn off the old ad set
7. Wait 48 hours

This is a 50/50 shot. If the duplicated set performs equally or better → success. If it flops (higher CPC, same or worse results) → go to Step 4.

**Step 4: Full Creative Refresh**
- Build new campaign with 15 all-new creatives (5 Singles + 5 Two-Folds + 5 Tri-Folds)
- No reused photos from previous sets
- Task Ken for AI images, Emmanuel/Bren for Canva
- Creative brief must include: client brand info, target market, reference images, due date

### Frequency Benchmark
- Frequency > 2.5 = creative fatigue incoming
- Frequency > 3.5 = definitely fatigued, act immediately

---

## Common Campaign Audit Checklist

Use this when reviewing any active campaign:

- [ ] Campaign name includes "B2C"
- [ ] Objective: Leads
- [ ] Exactly 6 placements selected (manual, not Advantage+)
- [ ] Advantage+ Audience: OFF
- [ ] Limited spend to excluded placements: OFF
- [ ] Display URL: domain only (no HTTPS://)
- [ ] CAPI configured in GHL and firing (check Meta Events Manager)
- [ ] Survey: 4 questions max (not 7)
- [ ] Survey conversion rate: > 2.5% (if not, check survey length/headline)
- [ ] Creative set: 15 ads, diverse photo types, no repeats
- [ ] Frequency: under 2.5
- [ ] Facebook page: has 100+ followers (not brand new ghost page)
