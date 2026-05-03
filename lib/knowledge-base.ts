import sopsData from '@/repo/data/sops.json';
import recordingsData from '@/repo/data/recordings.json';
import teamData from '@/repo/data/team.json';

export function buildKnowledgeBase(): string {
  const sops = sopsData.sops.map((s) => `• ${s.title}: ${s.description} — ${s.url}`).join('\n');
  const resources = sopsData.resources.map((r) => `• ${r.title}: ${r.description} — ${r.url}`).join('\n');
  const tools = sopsData.tools.map((t) => `• ${t.title}: ${t.description} — ${t.url}`).join('\n');
  const recordings = recordingsData.recordings.map((r) => `• [${r.category.toUpperCase()}] ${r.title}: ${r.description} — ${r.url}`).join('\n');
  const looms = (recordingsData.training_looms as any[]).map((l) => `• [${l.category}${l.priority === 'core' ? ' · CORE' : ''}] ${l.title}: ${l.description} — ${l.url}`).join('\n');
  const refRecordings = (recordingsData.reference_recordings as any[]).map((r) => `• ${r.title} (${r.date}): ${r.description} — ${r.url}`).join('\n');
  const team = (teamData as any[]).map((m) => `• ${m.name} — ${m.role}${m.contact ? ` | Contact: ${m.contact}` : ''}${m.notes ? ` | Notes: ${m.notes}` : ''}`).join('\n');

  return `
=== COMPANY OVERVIEW ===
Roof Ignite (also "RI") is a performance marketing agency co-founded by Mani Asadi and Oscar Sey when they were 15.
- Revenue: ~$300K/month currently, target $1M/month by end of summer 2026
- Niches: Roofing (80-90% of revenue), HVAC, Gutters, Home Services
- Client ICP (Ideal Customer Profile): $2.5M+ annual revenue, 3+ years in business, $3,000+/month ad spend budget
- Model: 5 pods of managers, each pod = 20-30 client accounts managed by 1-2 pod managers
- Total target: 25 accounts per pod × 5 pods = $1M/month

=== BUSINESS MODEL ===
- 28-day performance cycle: clients only pay when targets are hit (performance-based)
- Setup fee: $1,500–$5,000 one-time (covers GHL sub-account setup, landing pages, surveys, ad campaigns, VA assignment, A2P)
- Retainer: ~$4,000 + 10% of ad spend per cycle (minimum ~$3,200)
- The 80% Rule: If 80% of the appointment booking target is hit, the client CAN be billed. Below 80% = extend cycle or negotiate.
- Winter retainer: reduced rate November–February for seasonal roofing clients (weather dependency)
- Funnel flow: Meta Ads → Landing Page → Survey (qualification) → GHL CRM → VA Speed-to-Lead Call → Booked Appointment → Client's Sales Team closes

=== YOUR ROLE — POD MANAGER ===
You are NOT:
- A landing page builder
- A Meta ads specialist or media buyer
- A GHL (GoHighLevel) technician
- A VA (virtual assistant) manager
- A "busy-work doer"

You ARE:
- A pod leader managing 20-30 client accounts
- The client's single point of contact from Day 1 onboarding through renewal
- A KPI diagnostician — you read data and prescribe solutions
- A specialist coordinator — you task the right people at the right time
- A revenue retention engine — churn = your failure

You report to: Jonathan Forbes (Director of Operations / COO)

=== THE QUARTERBACK ANALOGY ===
You call the plays. Specialists run the routes. You own the OUTCOME — not the tasks.
If a client underperforms, the question is: did you diagnose it and coordinate the right fix in time?

=== 9-PHASE CLIENT JOURNEY ===
Phase 1: Lead Generation — Michael Dallara runs B2B ads to attract roofing businesses
Phase 2: Sales Call — Mani's team (setters + closers) sells the service
Phase 3: Client Closed — Closers assign to a pod. You get a Slack notification.
Phase 4: Onboarding Call (YOU run this):
  - Run call with client, record via Fathom
  - After call: use Fathom transcript → Custom GPT → post update to #ops-manager-discussion → create ClickUp task for Emmanuel (setup) → WhatsApp message to client confirming next steps
Phase 5: Service Delivery Setup — Emmanuel & Mervin (5–10 business days):
  - GHL sub-account creation
  - Landing pages built
  - Survey (4-question or 7-question based on client)
  - Meta ad campaigns structured and launched
  - A2P (10DLC) registration submitted
  - VA team assigned
  - CAPI (Conversions API) configured
Phase 6: Launch — Campaigns go live. VA team begins calling leads within 5 minutes of form submission.
Phase 7: Ongoing Optimization (YOU lead this):
  - Daily: Check Layer 1 metrics in Command Center
  - Weekly: Monday + Thursday Slack updates in #ops-manager-discussion
  - Weekly: Tuesday + Friday review calls with Jonathan & Oscar
  - If Layer 1 fails: diagnose Layer 2, prescribe fix, task specialist
Phase 8: Cycle Completion — Verify if 80% or 100% of booking target was hit. Review with client. Prepare billing.
Phase 9: Renewal — Start renewal conversation 5-7 days before cycle end. Never wait until the last day.

=== DEATH VALLEY (Days 7–21) ===
Days 7-21 of any campaign are the highest-risk window. New campaigns often show inflated early results (the "honeymoon" period), then performance dips as Meta's algorithm optimizes. This is called Death Valley. DO NOT panic. DO NOT turn off campaigns. Do report to clients proactively: "We're in the algorithm learning phase — this is normal and expected." Most performance recovers by Day 21 if the setup was correct.

=== KPI FRAMEWORK — TWO LAYERS ===
ALWAYS check Layer 1 first. Only go to Layer 2 if Layer 1 fails.

LAYER 1 — OUTCOMES (check daily):
• Total Booked Appointments vs. cycle target — #1 metric. Are we booking enough?
• Target Achievement % — at 80%+ = can bill. Below 80% = optimize or extend.
• Cost Per Booked Appointment — must be less than $250. Formula: total ad spend ÷ booked appointments (NOT cost per lead, NOT cost per form submission)

LAYER 2 — DIAGNOSIS (only check when Layer 1 is red):
• CTR (Click-Through Rate) — target: >0.8%. If low → creative problem → task Ken
• Cost Per Link Click (CPLC) — target: <$6. If high → targeting or creative → task Emmanuel
• Survey Conversion Rate (CVR) — target: >2.5%. If low → survey too long/confusing → task Emmanuel to simplify
• VA Booking Rate — target: >30%. If low → VA quality/script/speed issue → escalate to Leila
• Show Rate (appointments that actually show up) — target: >60%. If low → reminder automation issue → task Emmanuel
• Speed to Lead — target: <5 minutes. If >15 minutes → escalate to Leila immediately
• OSA Rate (Out-of-Service-Area) — target: <20%. If high → audit zip codes + Meta targeting alignment → task Emmanuel

CRITICAL: Cost per Booking = spend ÷ BOOKED appointments. NOT cost per lead. NOT cost per click. Never confuse these.

=== ACCOUNT HEALTH COLOR SYSTEM ===
🟢 GREEN: ≥70% to target by Day 21 — On track. Celebrate with client. Scale what's working.
🟡 YELLOW: 40–70% to target by Day 14 — Monitor closely. Layer 2 diagnosis needed. Communicate proactively with client.
🔴 RED: <40% to target by Day 14 — Immediate action. Coordinate specialists. Flag to Jonathan if unresolved after 48 hours.
⚫ BLACK: Client is threatening to cancel — Escalate to Jonathan immediately, BEFORE the client calls him themselves.

=== MONDAY & THURSDAY SLACK UPDATE FORMAT ===
Post in #ops-manager-discussion for EVERY active client account, every Monday and Thursday:

Format:
[Client Name] — Cycle X, Day Y
Bookings: X/Y target (Z%)
Health: 🟢/🟡/🔴
Action: [what you're doing about it]

Example:
ABC Roofing — Cycle 3, Day 14
Bookings: 18/25 target (72%)
Health: 🟡
Action: Layer 2 showing CTR at 0.6% — tasked Ken with creative refresh, due Thursday

=== KPIS BY AD SPEND TIER ===
$3,000–$5,000/month: expect 8–15 booked appointments per month
$5,000–$10,000/month: expect 15–30 booked appointments per month
$10,000+/month: expect 30+ booked appointments per month
These are benchmarks only. Adjust expectations based on market, season, and service area density.

=== PROBLEM DIAGNOSIS PLAYBOOK ===

PROBLEM: Survey Conversion < 2%
Symptoms: High landing page traffic, low survey completions
Root Cause: Survey too long, confusing language, friction in questions
Fix: Switch 7-question → 4-question survey. Simplify language. A/B test shorter version.
Task: Emmanuel via ClickUp

PROBLEM: Rising CPL / Falling CTR
Symptoms: Spend increasing, fewer leads per dollar, CTR dropping week-over-week
Root Cause: Ad creative fatigue — frequency climbing, same images dominating
Fix: Creative refresh. Use Post-Andromeda protocol (duplicate existing ad sets WITHOUT Advantage+, fresh images). Task Ken with brand, market, reference images.
Task: Ken + Emmanuel via ClickUp

PROBLEM: High OSA Rate (>20%)
Symptoms: VAs reporting leads outside client's service zone
Root Cause: Radius mismatch between Account Specific Doc, Meta targeting, and actual service area
Fix: Audit all 3 sources. Add exclusion zip codes. Align GHL service area with Meta targeting.
Task: Emmanuel or Mervin via ClickUp

PROBLEM: Low VA Booking Rate (<30%)
Symptoms: Leads coming in but not converting to appointments
Root Cause: VAs not calling within 5 min, outdated Account Specific Document, or script issues
Fix: Flag to Leila/Aica with specific lead examples + call timestamps. Request call recording review.
Task: Leila directly via Slack with screenshot evidence

PROBLEM: Ads Not Spending
Symptoms: Zero or minimal spend 3+ days in a row
Root Cause: Campaign paused (billing failure), ad disapproval, or accidentally turned off
Fix: Check Meta Ads Manager — campaign status → billing → ad approval status. Then assign fix to Emmanuel.
Task: You audit Meta first → Emmanuel via ClickUp

PROBLEM: Billing Failure / Card Declined
Symptoms: Meta flags billing issue, campaign pauses
Root Cause: Client card declined, threshold limit hit, or bank blocked Meta charges
Fix: CALL the client immediately (NOT Slack, NOT email — phone call). Every day paused = missed appointments and delayed cashflow. Get card updated or bank contacted same day.
Note: This is YOUR job — phone call, you. Do not delegate this.

PROBLEM: Low Client Close Rate on Appointments
Symptoms: Appointments booked but client says they're not converting to jobs
Root Cause: Could be lead quality OR client's own sales team weakness — need data to distinguish
Fix: Get full CRM sales data first. If confirmed lead quality issue → escalate to Mani. If sales issue → client coaching conversation.
Task: You (data gathering) → Mani if confirmed lead quality issue

PROBLEM: Low Show Rate (<60%)
Symptoms: Appointments booked but homeowners not showing up for inspections
Root Cause: Reminder automation failure, poor qualification, or too long between booking and appointment
Fix: Audit SMS/email reminder automations in GHL. Improve confirmation flow. Requalify long-pending leads.
Task: Emmanuel + Leila/Aica via ClickUp

PROBLEM: Open Leads Not Getting Called (White leads in Logbook)
Symptoms: Logbook has uncalled leads sitting open (white status)
Root Cause: VA bandwidth issue, calling hours not aligned with leads, or scheduling gap
Fix: Flag to Leila with Logbook screenshot + timestamps of open leads. Request immediate reassignment.
Task: Leila directly via Slack + screenshot

PROBLEM: No New Leads for 3+ Days
Symptoms: Form submissions stopped completely
Root Cause: Campaign paused, ad disapproval, billing failure, or extreme creative fatigue
Fix: Check Meta Ads Manager (is campaign running? billing active? ads approved?). If all OK → creative refresh.
Task: You audit → Emmanuel via ClickUp

PROBLEM: Client Threatening to Cancel
Fix: Loop in Oscar Sey (CEO) IMMEDIATELY. Do NOT try to handle this alone. Oscar plays the "CEO card" and retains clients. You warn Jonathan at the same moment.
Note: NEVER let the client call Oscar before you've warned Oscar/Jonathan. They need to know first.

=== META ADS SETUP — NON-NEGOTIABLE RULES ===
1. Advantage+ Audience: MUST be OFF when duplicating ad sets (post-Andromeda protocol)
2. Approved placements (6 only): Facebook Feed, Instagram Feed, Facebook Stories, Instagram Stories, Facebook Reels, Instagram Reels
   NEVER USE: Marketplace, Messenger, Audience Network
3. Campaign objective: ALWAYS Leads (not Conversions, not Traffic)
4. Campaign names: MUST include 'B2C' in the name
5. Ad set structure: Each ad set = 5 Singles + 5 Two-Folds + 5 Tri-Folds = 15 ads minimum
6. Photo types required:
   - Trust photos: person (homeowner or contractor in professional setting)
   - Service photos: completed work (installed roof, new gutters, etc.)
   - Brand photos: vehicle, branded clothes, sign, truck
7. Photo reuse rule: Once a photo is used in one ad set, NEVER reuse it in future ad sets (creative fatigue prevention)
8. Business Manager: NEVER create a Business Manager for a client — the client must own their own BM. You request access only.
9. CAPI setup: When 'Qualified' tag is applied in GHL → fires conversion event back to Meta. This is how Meta knows a good lead was generated. Emmanuel handles CAPI setup.

=== POST-ANDROMEDA PROTOCOL (Duplicate Ad Sets) ===
When creative fatigue hits and you need fresh ad sets:
1. Duplicate the existing top-performing ad set
2. BEFORE publishing: turn OFF Advantage+ Audience
3. Swap ALL images with brand-new photos (never reuse)
4. Keep the same targeting parameters
5. Post the ClickUp task to Ken first (he needs 24-48hrs for new creative)
Note: "Andromeda" refers to Meta's algorithm change that made Advantage+ Audience the default — it must be manually disabled.

=== A2P (10DLC) — EVERYTHING YOU NEED TO KNOW ===
A2P stands for "Application-to-Person" — it's the process of registering a GHL phone number so it can legally send SMS messages to leads in the US.
- A2P has NOTHING to do with Meta or Facebook ads. It's a GHL/telecom thing.
- NEVER submit A2P yourself — always task Emmanuel via ClickUp
- Required info for A2P task: client name + GHL sub-account link + 48-hour deadline
- If A2P is rejected: 2-3 week wait before you can reapply. This delays the entire launch.
- A2P registration takes 2-5 business days to process once submitted
- Without A2P, the VA team cannot text leads — speed to lead is critically impaired

=== VA TEAM OPERATIONS ===
- VAs call EVERY new lead within 5 minutes of form submission (speed to lead = non-negotiable)
- VA script: Qualify the lead, confirm service area, book an appointment, update GHL Logbook
- Logbook: Every lead gets a status in the Logbook — white (uncalled), in progress, booked, not qualified
- Check your Logbook DAILY for white (uncalled) leads
- VA quality escalation path: escalate issues to Leila (NOT to individual VAs, NOT to Aica first unless Leila is unavailable)
- When escalating VA issues to Leila: always bring specific data — lead examples, call timestamps, recording links
- Account-specific VA notes go in #internal-team Slack channel (ex: "ABC Roofing — they only serve zip codes 30301-30318")
- OSA (Out-of-Service-Area) rate >20%? The issue is usually targeting mismatch, not VA performance. Audit Meta targeting first.
- Booking rate drops below 30%? Escalate to Leila with evidence.

=== ESCALATION PATH (in order) ===
1. Small issues (creative delays, minor KPI dips) → Handle yourself. Diagnose and coordinate.
2. Specialist issues (setup delays, campaign problems) → Direct ClickUp task to Emmanuel/Mervin with client name + deadline
3. VA quality or speed issues → Escalate directly to Leila with evidence
4. Client threatening to cancel or pushing back on billing → Inform Jonathan AND Oscar immediately
5. Account red for 3+ days with no resolution → Jonathan Forbes (COO)
6. Anything unresolved after 48 hours that affects a client → Jonathan

=== WEEKLY REVIEW CALLS ===
- Tuesday & Friday: Review calls with Jonathan & Oscar
- Come with PRESCRIPTIONS not just reports. "The account is red" is a report. "The account is red because CTR dropped — I've tasked Ken with a creative refresh due Thursday, and I've emailed the client explaining the plan" is a prescription.
- Fridays: Shadow first (new pod managers), then lead after ~2 weeks

=== RENEWAL PROCESS ===
- Start renewal conversation 5-7 days before cycle end
- Never wait until the last day — client may have already mentally moved on
- Frame it as: "We're coming up on cycle end — here's what we achieved, and here's the plan for next cycle"
- If below target: acknowledge, explain root cause, commit to fix in next cycle
- If at target: highlight wins, propose scaling (more spend, new geographies)
- If client is hesitant: loop Oscar in BEFORE the conversation goes cold

=== ONBOARDING CALL PROCESS ===
The onboarding call is your first impression and the foundation of the client relationship.
Before the call:
- Review everything the sales team gave you (Account Specific Document, signed agreement)
- Know the client's target, timeline, and service area before you dial

During the call:
- Walk through what happens next (setup timeline, launch, what to expect in Death Valley)
- Set expectations on the 28-day cycle and how billing works
- Get all info needed: business name, service area zip codes, ideal customer (homeowner profile), budget confirmation

After the call (within same business day):
1. Export Fathom transcript from fathom.video
2. Run through Custom GPT to generate structured summary
3. Post summary to #ops-manager-discussion
4. Create ClickUp task for Emmanuel (include: client name, GHL sub-account link, all setup details, 48hr first response deadline)
5. Send WhatsApp message to client: confirm what you covered, next steps, expected timeline

=== GHL (GoHighLevel) ===
- GHL = the CRM and automation platform clients use to manage their leads
- Every client gets their own GHL sub-account under the Roof Ignite agency account
- Sub-account URL format: app.roofignite.com/location/[client-id]
- Emmanuel sets up GHL (pipelines, automations, surveys, landing pages, A2P)
- You should know how to navigate GHL to check lead status, Logbook, and pipeline stages
- CAPI = Conversions API — connects GHL "Qualified" tag events back to Meta so Meta can optimize
- If GHL has a technical issue → task Emmanuel or Mervin via ClickUp

=== CLICKUP TASK FORMAT ===
When creating ClickUp tasks for specialists, always include:
1. Client name (exact)
2. GHL sub-account link (full URL)
3. What you need done (specific, not vague)
4. Deadline (explicit — "48 hours", "by Thursday EOD", not "ASAP")
5. Any relevant context (what the problem is, what you've already checked)

Example good task: "ABC Roofing — A2P Registration. GHL link: [url]. Please submit A2P for their number. Deadline: 48 hours from now. Client launch is scheduled for Monday."
Example bad task: "Please set up ABC Roofing ASAP"

=== BILLING AND PAYMENT ===
- Billing is triggered at cycle end when 80%+ of the booking target is hit
- Below 80%: cycle can be extended, or billing can be negotiated based on circumstances
- Billing failure (client card declined): call the client SAME DAY — phone, not Slack or email
- If client disputes billing → Jonathan Forbes handles. Do NOT negotiate billing disputes yourself.
- Winter retainer: applicable for seasonal roofing clients (Nov-Feb). Jonathan or Oscar determines which clients qualify.

=== CREATIVE PROCESS WITH KEN ===
- Ken is based in the Philippines (UTC+8) — plan with timezone in mind
- Deadlines: Monday brief → Thursday delivery. Thursday brief → Monday delivery.
- What to include in a creative brief: client brand info, target audience description, reference images (what's performed before), platform (Meta), format (single image / carousel / reel)
- Ken does: AI-generated creatives, Canva graphics, ad visuals
- Ken does NOT do: copywriting, strategy, video editing (unless simple)
- Creative briefs go via ClickUp task

=== SLACK CHANNELS ===
- #ops-manager-discussion — post Monday/Thursday status updates. All pod managers see this. Jonathan and Oscar read this.
- #internal-team — account-specific operational notes for VA team and specialists (example: "XYZ Roofing serves zip codes 30301-30318 only — please update VAs")
- #general — company-wide announcements

=== TOOLS ===
- Command Centre (commandcentre.roofignite.com or dashboard.roofignite.com) — your #1 daily tool. Shows all accounts, health colors, KPIs, Logbook access. Color-coded health scores per account.
- Logbook — accessible WITHIN the Command Centre. Tracks all leads with call status (white = uncalled, green = booked, red = not qualified, etc.)
- Client Check-In Sheet — shared Google Sheet. Jonathan and Oscar monitor this alongside you. Update it after every client interaction.
- ClickUp (app.clickup.com) — ALL specialist task assignments go here. Emmanuel, Mervin, Ken, Leila all work from ClickUp.
- GHL / CRM (app.roofignite.com) — client CRM, pipelines, automations, landing pages, surveys
- Fathom (fathom.video) — records and transcribes all calls automatically. Use for onboarding call summaries.
- Meta Business Suite (business.facebook.com) — for monitoring ad performance, billing status, ad approvals
- Ad Set Reviewer (ad-set-reviewer.vercel.app) — internal tool for checking if ad sets meet creative quality standards

=== WHAT TO DO IN YOUR FIRST WEEK ===
Day 1: Complete onboarding training sections 1-3 (Company Vision, Industry, Business Model)
Day 2-3: Complete sections 4-6 (How We Generate Results, Sales Process, Service Delivery)
Day 4-5: Complete sections 7-9 (Org Structure, Metrics, KPI Playbook)
Week 2: Complete sections 10-13 (Culture, Tools, Account Management, Onboarding Mastery). Shadow Friday review calls. Start your Day 1-10 worksheet tasks.

=== CULTURE AND PERFORMANCE STANDARDS ===
- Ownership mentality: If a client is failing, you own the fix. Not Emmanuel. Not Jonathan. YOU.
- Speed matters: Same-day response to client messages is non-negotiable.
- Proactive communication: Clients should never discover bad news before you tell them.
- Data-driven: Never make assumptions. Check the numbers. Then act.
- Learn before you do: Every specialist has a SOP. Read it before you task them.
- Weekly rhythm is sacred: Monday/Thursday updates + Tuesday/Friday review calls = non-negotiable
- BambooHR: HR/payroll/PTO requests go through BambooHR, not Slack

=== TEAM DIRECTORY ===
${team}

=== SOPs (Standard Operating Procedures) ===
${sops}

=== QUICK ACCESS RESOURCES ===
${resources}

=== TOOLS & PLATFORMS ===
${tools}

=== TRAINING RECORDINGS ===
${recordings}

=== TRAINING LOOMS (Hands-on Walkthroughs) ===
${looms}

=== REFERENCE RECORDINGS ===
${refRecordings}
`;
}
