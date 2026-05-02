import sopsData from '@/repo/data/sops.json';
import recordingsData from '@/repo/data/recordings.json';
import teamData from '@/repo/data/team.json';

export function buildKnowledgeBase(): string {
  const sops = sopsData.sops.map((s) => `• ${s.title}: ${s.description} (${s.url})`).join('\n');
  const resources = sopsData.resources.map((r) => `• ${r.title}: ${r.description} (${r.url})`).join('\n');
  const tools = sopsData.tools.map((t) => `• ${t.title}: ${t.description} (${t.url})`).join('\n');
  const recordings = recordingsData.recordings.map((r) => `• ${r.title}: ${r.description} (${r.url})`).join('\n');
  const looms = recordingsData.training_looms.map((l) => `• ${l.title}: ${l.description} (${l.url})`).join('\n');
  const refRecordings = recordingsData.reference_recordings.map((r) => `• ${r.title} (${r.date}): ${r.description} (${r.url})`).join('\n');
  const team = teamData.map((m: any) => `• ${m.name} — ${m.role}${m.contact ? ` | Contact: ${m.contact}` : ''}`).join('\n');

  return `
=== COMPANY OVERVIEW ===
Roof Ignite is a performance marketing agency founded by Mani and Oscar at age 15. They generate qualified booked appointments for home service contractors.
- Revenue: ~$300K/month currently, target $1M/month by end of summer 2026
- Niches: Roofing (80-90% of revenue), HVAC, Gutters
- Client ICP: $2.5M+ revenue, 3+ years in business, $3K+/month ad spend
- 5 pods of managers, each managing 20-30 client accounts

=== BUSINESS MODEL ===
- 28-day performance cycle model — clients only pay when targets are hit
- Setup fee: $1,500–$5,000 (one-time, covers GHL, landing pages, surveys, ad campaigns, VA setup)
- Retainer: ~$4,000 + 10% of ad spend per cycle (minimum $3,200)
- 80% rule: if 80% of appointment target is hit, client can be billed at margin
- Winter retainer: reduced rate Nov–Feb for seasonal roofing clients
- Funnel: Meta Ads → Landing Page → Survey → GHL CRM → VA Call → Booked Appointment

=== POD MANAGER ROLE ===
- You are the client's single point of contact from day one (onboarding) through renewal
- You diagnose problems and prescribe solutions — you do NOT execute the technical work
- You coordinate: Emmanuel & Mervin (setups + media buying), Ken (AI creatives), Leila/Aica/Pamela (VA management)
- Reporting to Jonathan Forbes (Director of Operations / COO)
- KPI: Cost per Booking = total ad spend ÷ booked appointments (NOT cost per lead)
- Layer 1 metrics: bookings vs target, cost per booking (always check first)
- Layer 2 metrics: CPC (<$6 target), CTR (>0.8% target), survey conversion (>2.5%) — only check when Layer 1 fails

=== 9-PHASE CLIENT JOURNEY ===
1. Lead comes in → Michael (B2B Ads)
2. Sales call → Mani's team
3. Client closed → Closers + pod assignment
4. Onboarding call → YOU (post-call: Fathom transcript → Custom GPT → post to #ops-manager-discussion → ClickUp task for Emmanuel → WhatsApp client)
5. Service delivery setup → Emmanuel & Mervin (5–10 business days: GHL, landing pages, survey, Meta campaigns, A2P, VA assignment, CAPI)
6. Launch campaigns → Emmanuel + VA team
7. Ongoing optimization → You + specialists (weekly rhythm, Layer 1 daily, Layer 2 when needed)
8. Cycle completion → You verify target hit (or 80% rule), review with client, prepare billing
9. Renewal → You secure next cycle (start conversation 5-7 days before cycle end)

=== A2P CRITICAL RULES ===
A2P (10DLC) = GHL phone number registration process. NOT related to Meta/Facebook.
- ALWAYS task Emmanuel via ClickUp with: client name + GHL sub-account link + 48hr deadline
- NEVER submit A2P yourself
- Rejected A2P = 2-3 week wait to reapply

=== WEEKLY OPERATING RHYTHM ===
- Monday & Thursday: Post status updates per account in #ops-manager-discussion (cycle #, days elapsed, bookings vs target, health color, action steps)
- Tuesday & Friday: Review calls with Jonathan & Oscar — come with prescriptions, not just reports. Shadow Fridays first.
- Daily: Check Command Center + Logbook for open (white) leads. Reply to client messages same day.
- Renewal: Initiate 5-7 days before any cycle end

=== KEY RULES TO KNOW COLD ===
- Layer 1 first, ALWAYS. If bookings are on pace, do not touch anything.
- Cost per Booking = spend ÷ appointments booked. Not CPL.
- Never create a BM for a client — they must own it themselves
- 6 approved placements: FB Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels (NEVER Marketplace, Messenger, Audience Network)
- Campaign objective: always Leads
- Campaign names must include 'B2C'
- Advantage+ must be OFF when duplicating ad sets
- CAPI: when 'Qualified' tag applied in GHL → fires conversion event to Meta
- Billing failure: call the client same day (not Slack, not email — phone)
- Client threatening cancel: loop in Oscar immediately

=== VA MANAGEMENT ===
- VAs call every lead within 4 hours, qualify, book, update Logbook
- Escalate VA quality issues to Leila (not individual VAs)
- Post account-specific notes in #internal-team
- OSA rate >20%? Check targeting in Meta and geographic zip code settings
- Booking rate drops below 30%? Escalate to Leila

=== META AD SETUP CHECKLIST ===
- Advantage+ OFF
- 6 approved placements only
- 'B2C' in campaign name
- Campaign objective: Leads
- Each ad set = 5 Singles + 5 Two-Folds + 5 Tri-Folds = 15 ads minimum
- Photo types: Trust (person), Service (completed work), Brand (vehicle/clothes/sign)
- Once a photo is used in a set, NEVER reuse in future sets

=== TOOLS & URLS ===
- Command Centre: https://dashboard.roofignite.com — daily triage dashboard
- Logbook: track all leads, check for open (white) leads daily
- GHL/CRM: https://app.roofignite.com — client CRM and pipeline
- ClickUp: https://app.clickup.com — all task assignments
- Meta Business Manager: https://business.facebook.com
- Fathom: https://fathom.video — call recordings and transcripts
- Ad Set Reviewer: https://ad-set-reviewer.vercel.app/ — creative QA standards
- Slack channels: #ops-manager-discussion (status updates), #internal-team (VA/account notices)

=== SOPs ===
${sops}

=== QUICK ACCESS RESOURCES ===
${resources}

=== TOOLS ===
${tools}

=== TRAINING RECORDINGS ===
${recordings}

=== TRAINING LOOMS ===
${looms}

=== REFERENCE RECORDINGS ===
${refRecordings}

=== TEAM ===
${team}

=== ESCALATION PATHS ===
- Client threatening to leave → Oscar Sey (CEO) immediately
- Account red for 3+ days without resolution → Jonathan Forbes (COO)
- VA quality issues → Leila (VA Management)
- Technical issues (GHL, A2P, CAPI) → Emmanuel via ClickUp
- Creative issues → Ken via ClickUp (Philippines timezone — plan ahead)
- Internal tooling/systems questions → Cole
`;
}
