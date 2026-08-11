export interface MBDaySection {
  id: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  icon: string;
}

export interface MBTrainingDay {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  owner: string;
  estimatedTime: string;
  color: string;
  icon: string;
  objective: string;
  available: boolean;
  sections: MBDaySection[];
  keyTakeaways: string[];
}

export const MB_TRAINING_DAYS: MBTrainingDay[] = [
  {
    id: 1,
    title: 'Company & Media Buying 101',
    subtitle: 'Business model, department structure, role, standards, and KPIs.',
    date: 'Thu, July 23',
    owner: 'Jonathan',
    estimatedTime: '2–3 hrs',
    color: '#F5C800',
    icon: '🏗️',
    objective: 'Leave understanding the business model, your exact role and standards, how your week looks, the department structure, full funnel ownership, and the basics of KPIs and layer reporting.',
    available: true,
    sections: [
      { id: 's1', title: 'A New Chapter', subtitle: 'What this role is, what it isn\'t, and why it starts completely fresh.', estimatedTime: '5 min', icon: '🎯' },
      { id: 's2', title: 'Team Standards', subtitle: 'The 5 standards, the zero-tolerance policy, and what Day 1 sets in motion.', estimatedTime: '5 min', icon: '⚠️' },
      { id: 's3', title: 'The RoofIgnite Model', subtitle: '28-day cycles, performance math, spend targets, and how billing works.', estimatedTime: '10 min', icon: '📐' },
      { id: 's5', title: 'Meeting Cadence', subtitle: 'Your weekly structure, update posts, deep dives, and what to bring.', estimatedTime: '5 min', icon: '📅' },
      { id: 's6', title: 'Department Structure', subtitle: 'Who does what — updated team names and the lines you never cross.', estimatedTime: '8 min', icon: '🏢' },
      { id: 's7', title: 'Full Funnel Ownership', subtitle: 'Ads to booked appointment — what you own even when others execute.', estimatedTime: '5 min', icon: '🔗' },
      { id: 's8', title: 'Tools & Systems', subtitle: 'What you operate in daily and what we\'re building fast.', estimatedTime: '5 min', icon: '⚙️' },
      { id: 's9', title: 'KPI Overview', subtitle: 'The 10 metrics across Layer 1 and Layer 2 — and why each exists.', estimatedTime: '5 min', icon: '📊' },
      { id: 's10', title: 'Layer Reporting', subtitle: 'Cycle windows + rolling breakdowns — the two-layer read explained.', estimatedTime: '5 min', icon: '📈' },
    ],
    keyTakeaways: [
      'This is a brand new role — not an extension of the old one. You are applying for it and held to a new standard from Day 1.',
      'No second chances. Any violation of the 5 Team Standards — even one minute late, even once — and you are out.',
      'The 28-day cycle must hit $2,800 in spend. If underspent, ramp the budget. Below 12 booked appointments costs the company money. Below 6 means no billing at all.',
      'Zero client contact, full stop. Everything — performance updates, billing, renewals — goes through CSM. You ensure CSM has results worth communicating.',
      'You own the outcome from ads to booked appointment. Other departments execute their parts. You own the final number.',
      'Deep dives: Tuesday and Friday. Written updates: Monday and Thursday. You are the direct eyes on what\'s working, what\'s not, and what needs to change.',
    ],
  },

  {
    id: 2,
    title: 'Reports and Data',
    subtitle: 'The layered read, Layer 2 drivers with benchmarks, Layer 3 levers, and live account reads.',
    date: 'Fri, July 24',
    owner: 'Oscar',
    estimatedTime: '2–3 hrs',
    color: '#4A90D9',
    icon: '📊',
    objective: 'Leave able to read any account correctly — identify which layer is broken, which metric is the root cause, and which lever addresses it. Reads and findings stay internal and go through CSM.',
    available: false,
    sections: [
      { id: 's1', title: 'The Two-Layer System', subtitle: 'Overview of Layer 1, Layer 2, and Layer 3 — and when to use each.', estimatedTime: '8 min', icon: '🗂️' },
      { id: 's2', title: 'Layer 1 — Outcomes', subtitle: 'Bookings, CPA, and cycle-level metrics. Check here first.', estimatedTime: '8 min', icon: '✅' },
      { id: 's3', title: 'Layer 2 — Drivers', subtitle: 'CTR, CPC, CPL, frequency, OSA %, and survey conversion.', estimatedTime: '10 min', icon: '📉' },
      { id: 's4', title: 'Layer 3 — Levers', subtitle: 'What you actually change — the exact actions mapped to each driver.', estimatedTime: '8 min', icon: '🔧' },
      { id: 's5', title: 'Benchmark Reference', subtitle: 'All key benchmarks in one place for fast account diagnosis.', estimatedTime: '5 min', icon: '📏' },
      { id: 's6', title: 'Live Account Read', subtitle: 'Real account walkthrough applying the full layer system end-to-end.', estimatedTime: '15 min', icon: '🔍' },
    ],
    keyTakeaways: [
      'Check Layer 1 first. If it is green, stop — do not audit Layer 2. Spend energy where it moves the needle.',
      'When Layer 1 is red, drill into Layer 2 for that specific metric only. Do not boil the ocean.',
      'Layer 3 levers are what you actually change. Identify the exact lever before touching anything.',
      'Link CTR benchmark: above 0.8%. Link CPC benchmark: under $6. OSA rate: under 15%. Survey conversion: above 2.5%.',
      'Any findings from live reads stay internal. Nothing gets shared with the client directly — that is CSM\'s conversation.',
      'The 80% margin variance rule: up to 80% above contracted CPA is still acceptable. Above that, the cycle is at risk.',
    ],
  },

  {
    id: 3,
    title: 'Auditing Standard, QA, Budgeting & Setup',
    subtitle: 'Audit cadence, competitive research, weekly QA, budget discipline, and setup model.',
    date: 'Mon, July 27',
    owner: 'Jonathan',
    estimatedTime: '2–3 hrs',
    color: '#A855F7',
    icon: '🔍',
    objective: 'Leave with a repeatable audit process, understanding of weekly QA, budget management principles, and the setup model — so accounts run clean and spend is never wasted.',
    available: true,
    sections: [
      { id: 's1', title: 'Standard Audit Process', subtitle: '5-step repeatable sequence for every account, every week.', estimatedTime: '10 min', icon: '🔍' },
      { id: 's2', title: 'Competitive Research', subtitle: 'Why market context is non-negotiable — part of every audit.', estimatedTime: '5 min', icon: '🎯' },
      { id: 's3', title: 'QA Standing Check', subtitle: 'The weekly QA checklist — every account, every week. No exceptions.', estimatedTime: '8 min', icon: '✅' },
      { id: 's4', title: 'Budget Management', subtitle: 'Pacing, gradual adjustments, holiday planning, and overspend corrections.', estimatedTime: '8 min', icon: '💰' },
      { id: 's5', title: 'Setup Model', subtitle: 'Current direction and options still under consideration.', estimatedTime: '5 min', icon: '⚙️' },
      { id: 's6', title: 'Creative Collaboration', subtitle: 'How you work with the Creative team — briefs, iteration, and accountability.', estimatedTime: '5 min', icon: '🎨' },
    ],
    keyTakeaways: [
      'Every account gets audited minimum weekly. Priority or at-risk accounts get audited more often.',
      'Competitive research is part of the audit — not a separate exercise. Recommendations made in a vacuum are guesses.',
      'QA is a standing weekly check, not a one-time onboarding step. Zombie tests and broken tracking cost money.',
      'Budget changes are gradual — 20–30% at a time. Aggressive changes reset ad set learning and cost cycles.',
      'The Creative Strategist owns copy and creative direction regardless of who handles technical setup.',
      'The setup model is still being finalized. Present it as directional, not locked.',
    ],
  },

  {
    id: 4,
    title: 'Common Action Steps',
    subtitle: 'Diagnosis to action, escalation ladders, lever library, and creative refresh protocol.',
    date: 'Tue, July 28',
    owner: 'Oscar',
    estimatedTime: '2–3 hrs',
    color: '#22C55E',
    icon: '⚡',
    objective: 'Leave with a repeatable playbook for the most common account problems — exact prescriptions per root cause, who to coordinate with, and how to brief creative refreshes. Bring a written read per account to Wed July 29\'s first daily call.',
    available: false,
    sections: [
      { id: 's1', title: 'Escalation Ladder', subtitle: 'Problem → Root Cause → Prescription → Coordinate With. All 11 scenarios.', estimatedTime: '12 min', icon: '🪜' },
      { id: 's2', title: 'Creative Refresh Protocol', subtitle: 'Context check → Post-Andromeda duplicate → full refresh sequence.', estimatedTime: '8 min', icon: '🎨' },
      { id: 's3', title: 'Briefing Creative', subtitle: 'What goes in a brief and why specificity is the standard.', estimatedTime: '8 min', icon: '📝' },
      { id: 's4', title: 'Operating at Scale', subtitle: 'Playbook-driven decisions and the team\'s capacity direction.', estimatedTime: '5 min', icon: '⚡' },
      { id: 's5', title: 'Homework', subtitle: 'Written account reads + action steps due before Wed July 29, 7:00 AM.', estimatedTime: '5 min', icon: '📋' },
    ],
    keyTakeaways: [
      'Problem → Root Cause → Prescription → Coordinate With. Know this sequence for every common scenario.',
      'Billing failures and renewal conversations both go through CSM. Media buyer supplies data, not client contact.',
      'Creative refresh protocol: context check first, then Post-Andromeda duplicate, then full refresh only if duplicate fails.',
      'Before touching anything: check for holidays or local events. Always check if inside first 7 days of a launch.',
      'When briefing creative: be specific. Market, angle, format, and performance context. Vague briefs produce vague ads.',
      'Homework: written account read plus proposed action step per account, ready for Wed July 29\'s first daily call.',
    ],
  },
];

export interface MBWorksheetSection {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export const MB_WORKSHEET_SECTIONS: MBWorksheetSection[] = [
  {
    id: 'role-standards',
    title: 'Role & Standards Checklist',
    description: 'Confirm understanding of the five Team Standards and role boundaries.',
    items: [
      'What is your primary accountability metric as a media buyer?',
      'Name the 5 Team Standards in order.',
      'What does "approval before action" mean in practice?',
      'Who handles client communication and performance updates?',
      'When is Saturday work expected?',
    ],
  },
  {
    id: 'kpi-reference',
    title: 'KPI Reference',
    description: 'Fill in benchmarks for each KPI from memory.',
    items: [
      'Link CTR benchmark: ___',
      'Link CPC benchmark: ___',
      'OSA % threshold (flag above): ___',
      'Survey conversion benchmark: ___',
      'Frequency threshold (act immediately above): ___',
      'CPA margin variance band: ___',
    ],
  },
  {
    id: 'reporting-cadence',
    title: 'Reporting Cadence',
    description: 'Map out the two-layer reporting system.',
    items: [
      'Layer 1 — what it tracks:',
      'Layer 2 — what it tracks:',
      'Rolling window timeframes used:',
      'When does rolling window data get pulled?',
      'Who automates daily report delivery (future state)?',
    ],
  },
  {
    id: 'account-audit',
    title: 'Account Audit Checklist',
    description: 'Items to check on every weekly account audit.',
    items: [
      'Lead tracing: what to verify per lead',
      'Log book: what to read before making changes',
      'KPI checks: list each KPI reviewed',
      'Competitive research: what to look for',
      'QA items: zombie tests, broken tracking, geo targeting, pixel integrity',
      'Spend pacing: on track vs off, how to correct',
      'Creative health: CTR trend, frequency, fatigue signals',
      'VA performance: booking rate, open leads in log',
      'OSA rate: current %, action if above threshold',
      'Anything turned on that should be off?',
      'Anything turned off that should be on?',
      'Audience overlap between active ad sets?',
    ],
  },
  {
    id: 'escalation-ladder',
    title: 'Escalation Ladder',
    description: 'Map problem to prescription and coordination.',
    items: [
      'Survey conversion under 2%: prescription + coordinate with',
      'Rising CPL / falling CTR: prescription + coordinate with',
      'High OSA rate (above 20%): prescription + coordinate with',
      'Low VA booking rate: prescription + coordinate with',
      'Ads not spending 3+ days: prescription + coordinate with',
      'Billing failure / card declined: prescription + coordinate with',
      'Low show rate: prescription + coordinate with',
      'Open leads not being called: prescription + coordinate with',
    ],
  },
  {
    id: 'creative-refresh-protocol',
    title: 'Creative Refresh Protocol',
    description: 'Step-by-step protocol for addressing creative fatigue.',
    items: [
      'Step 0: context check — what to verify before acting',
      'Step 1: Post-Andromeda duplicate — exact sequence',
      'Step 2: outcome of Step 1 if it works',
      'Step 2: what to do if Step 1 does not resolve after 48h',
      'When briefing Creative: what information to include',
    ],
  },
];
