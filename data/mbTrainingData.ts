export interface MBQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
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
  keyTakeaways: string[];
  quiz: MBQuizQuestion[];
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
    objective: 'Leave knowing the business model, your exact role, the operating standards held from Day 1, the full KPI set, how reporting works, and what your week looks like.',
    keyTakeaways: [
      'The 28-day cycle is the primary accountability window. Know your cycle dates and pacing at all times.',
      'Media buying owns ad performance. CSM owns the client. These lines do not cross — ever.',
      'The five Team Standards are the operating floor, not a bonus. Approval before action, on time, own your accounts.',
      'Two-layer reporting: 28-day cycle + rolling 3/5/7-day windows. Rolling windows catch problems inside the cycle.',
      'Know all 10 KPIs for every account — including out-of-service-area %, which is a targeting quality signal.',
      'Account distribution starts immediately. Overlap with current tasks is temporary. Own your accounts from Day 1.',
    ],
    quiz: [
      {
        question: 'How long is a RoofIgnite client cycle, and why does it matter?',
        options: [
          'One calendar month — used for billing and reporting purposes',
          '28 days — the primary window against which all KPIs and performance conversations are measured',
          '7 days — the rolling review window used for all account decisions',
          '90 days — a quarterly performance period used for retention decisions',
        ],
        correctIndex: 1,
        explanation: 'The 28-day cycle is the core unit of performance measurement. Every KPI conversation, reporting window, and accountability standard is framed against it — not monthly calendar periods.',
      },
      {
        question: 'A client contacts you directly on Slack to ask about their account performance. What do you do?',
        options: [
          'Answer briefly since it is just a quick question and does not require a full report',
          'Tell them you will get back to them after the next scheduled review',
          'Acknowledge them professionally and immediately route them to CSM — do not share any performance data',
          'Update them on current KPIs and flag the interaction to CSM afterward',
        ],
        correctIndex: 2,
        explanation: 'Media buyers have zero client-facing responsibility. Any client contact — even a quick question — goes through CSM. Route them immediately and do not share data.',
      },
      {
        question: 'What does "approval before action" mean, and when does it apply?',
        options: [
          'Leadership approves major strategy changes quarterly; smaller changes can go live without approval',
          'Nothing goes live, gets changed, or gets pushed out on an account without approval first — no exceptions while the model is new',
          'Creative assets require approval; budget and targeting changes can go live immediately',
          'Approval is required during the first 30 days only, after which media buyers operate independently',
        ],
        correctIndex: 1,
        explanation: 'Approval before action is a Team Standard that applies to everything while the model is new — not some things, everything. This protects clients and builds the right habits on a new team.',
      },
      {
        question: 'Which KPI specifically measures the percentage of leads coming from outside the client\'s service area?',
        options: [
          'Cost per lead — tracks lead quality relative to geographic targeting',
          'CPM — cost per thousand impressions in the target area',
          'Out-of-service-area % — measures the proportion of leads from outside the client\'s actual service area',
          'Frequency — tracks how often the ad reaches the intended local audience',
        ],
        correctIndex: 2,
        explanation: 'Out-of-service-area % is a targeting quality signal. A high percentage means wasted ad spend on leads the client cannot service — regardless of how cheap the CPL looks.',
      },
      {
        question: 'What are the two layers of the reporting system and what does each do?',
        options: [
          'Daily reports and weekly summaries — daily for internal use, weekly for client-facing updates',
          'Full 28-day cycle performance plus rolling 3/5/7-day windows — cycle for accountability, rolling windows to catch problems early inside the cycle',
          'Account-level reports and portfolio-level rollups — account reports daily, portfolio weekly',
          'Paid media reports and GHL pipeline reports — separate systems reconciled at cycle close',
        ],
        correctIndex: 1,
        explanation: 'The two-layer system exists because cycle-only reporting misses problems until it is too late. Rolling windows (3/5/7-day) let you catch a CPL issue on Day 8 instead of Day 28.',
      },
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
    keyTakeaways: [
      'Check Layer 1 first. If it is green, stop — do not audit Layer 2. Spend energy where it moves the needle.',
      'When Layer 1 is red, drill into Layer 2 for that specific metric only. Do not boil the ocean.',
      'Layer 3 levers are what you actually change. Identify the exact lever before touching anything.',
      'Link CTR benchmark: above 0.8%. Link CPC benchmark: under $6. OSA rate: under 15%. Survey conversion: above 2.5%.',
      'Any findings from live reads stay internal. Nothing gets shared with the client directly — that is CSM\'s conversation.',
      'The 80% margin variance rule: up to 80% above contracted CPA is still acceptable. Above that, the cycle is at risk.',
    ],
    quiz: [
      {
        question: 'Layer 1 is green — bookings on pace, CPA within range. Should you audit Layer 2?',
        options: [
          'Yes — always audit Layer 2 weekly for all accounts',
          'No — Layer 1 green means stop. Save diagnostic energy for accounts where Layer 1 is red.',
          'Yes — creative fatigue builds invisibly even when bookings are on track',
          'Only if the client asks about ad performance',
        ],
        correctIndex: 1,
        explanation: 'Core rule: if Layer 1 is healthy, do not look at Layer 2. With 15–25 accounts, your time is the bottleneck. Focus diagnostic energy exclusively on accounts where Layer 1 is failing.',
      },
      {
        question: 'Link CTR is 0.5% and frequency is 3.8. What is the correct diagnosis and Layer 3 lever?',
        options: [
          'Audience too narrow — expand targeting to a broader geo',
          'Creative fatigue confirmed. CTR below 0.8% and frequency above 3.5 = Post-Andromeda duplicate first; if no recovery in 48h, full creative refresh.',
          'Normal fluctuation — wait two weeks before acting',
          'Increase budget — more spend drives CTR back up through algorithm learning',
        ],
        correctIndex: 1,
        explanation: 'Link CTR benchmark: above 0.8%. Frequency above 3.5 = creative fatigue. The sequence: Post-Andromeda duplicate first (50/50 shot). If no link CTR recovery in 48 hours, full creative refresh: 15 all-new ads, zero reused photos.',
      },
      {
        question: 'What is the link CPC benchmark, and what does it indicate when CPC is above that threshold?',
        options: [
          'Benchmark is under $10. Above that indicates the wrong campaign objective.',
          'Benchmark is under $6. Above that — combined with low CTR — indicates creative fatigue or the wrong audience.',
          'Benchmark is under $3. Above $3 means ad spend should be reduced immediately.',
          'There is no benchmark — CPC varies too much by market to have a standard.',
        ],
        correctIndex: 1,
        explanation: 'Link CPC benchmark: under $6. Above $6, combined with link CTR below 0.8%, indicates creative fatigue or audience mismatch. Always read CPC alongside CTR — never in isolation.',
      },
      {
        question: 'Survey conversion rate is 1.2% — below the 2.5% benchmark. What is the Layer 3 lever to try first?',
        options: [
          'Rebuild the ad creative — the landing page conversion reflects the ad quality',
          'Switch from 7-question survey to 4-question survey and simplify language — friction reduction is the first lever',
          'Increase ad spend — more volume makes conversion rates look better in aggregate',
          'Change the audience targeting — wrong people hitting the survey is the root cause',
        ],
        correctIndex: 1,
        explanation: 'Survey conversion below 2.5% means too much friction. The Layer 3 lever: reduce question count (7q to 4q) and simplify language. The ad is doing its job if people are clicking — the survey is losing them.',
      },
      {
        question: 'You identify a significant performance issue during a live account read session with Oscar. Who gets the findings?',
        options: [
          'The client — they should know what\'s happening on their account immediately',
          'The findings stay internal. You act on the diagnosis internally. CSM handles any client communication.',
          'Leila — she needs to brief the VA team on what to change',
          'Jonathan and the client simultaneously, so everyone is aligned',
        ],
        correctIndex: 1,
        explanation: 'Media buyers have zero client-facing responsibility. Reads and findings stay internal. CSM owns the client conversation. Your job is to diagnose and fix — not to report to the client.',
      },
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
    keyTakeaways: [
      'Every account gets audited minimum weekly. Priority or at-risk accounts get audited more often.',
      'Competitive research is part of the audit — not a separate exercise. Recommendations made in a vacuum are guesses.',
      'QA is a standing weekly check, not a one-time onboarding step. Zombie tests and broken tracking cost money.',
      'Budget changes are gradual — 20–30% at a time. Aggressive changes reset ad set learning and cost cycles.',
      'The Creative Strategist owns copy and creative direction regardless of who handles technical setup.',
      'The setup model is still being finalized. Present it as directional, not locked.',
    ],
    quiz: [
      {
        question: 'How often should every account in your book be audited at minimum?',
        options: [
          'Monthly — tied to the billing cycle',
          'Weekly minimum. Priority accounts and at-risk accounts more often.',
          'Only when a client or Jonathan flags a performance issue',
          'Every two weeks — audits more frequent than that waste time on healthy accounts',
        ],
        correctIndex: 1,
        explanation: 'Standard audit cadence: every account, minimum weekly. The word "minimum" matters — at-risk accounts get more frequent checks. Weekly audits catch problems in time to fix them within the cycle.',
      },
      {
        question: 'You are auditing an account and find a creative test from 5 weeks ago that is still running with low performance. What is this, and what do you do?',
        options: [
          'A long-tail test that sometimes takes 6+ weeks to show results — leave it running',
          'A zombie ad test — it concluded long ago and should be turned off. Leaving it running burns budget with zero chance of winning.',
          'An approved ongoing experiment — check with Jonathan before pausing',
          'Normal creative variety — multiple ad sets running simultaneously is standard practice',
        ],
        correctIndex: 1,
        explanation: 'Zombie creative tests are one of the most common budget leaks. A test that concluded weeks ago but was never turned off is still spending money with zero chance of winning. Catch and kill these in your weekly QA.',
      },
      {
        question: 'Beyond KPIs and lead-to-outcome tracing, what else is part of a standard account audit?',
        options: [
          'Client satisfaction surveys and renewal probability scores',
          'Competitive research and market landscape — what competitors are running, how the market is behaving',
          'Team performance metrics — VA call time, Emmanuel\'s setup speed',
          'Nothing else — KPIs and lead tracing are sufficient for a complete audit',
        ],
        correctIndex: 1,
        explanation: 'Competitive research and market landscape are part of every audit. Recommendations made without understanding what competitors are doing and how the market is behaving are guesses, not strategy.',
      },
      {
        question: 'An account is overpacing on ad spend — it has burned 70% of its cycle budget by Day 15 of 28. What is the correct action?',
        options: [
          'Pause the campaign immediately to protect the remaining budget',
          'Reduce daily budget gradually — 20–30% at a time — to slow spending without resetting ad set learning',
          'Leave it — strong early spend usually recovers booking performance in the final week',
          'Increase the total cycle budget to match the pacing — the algorithm is performing well',
        ],
        correctIndex: 1,
        explanation: 'Budget changes are gradual — 20–30% at a time. Aggressive reductions or pauses reset ad set learning and cost you days of algorithm recovery time. Gradual adjustment preserves learning while correcting pace.',
      },
      {
        question: 'In the setup model, who owns copy and creative direction regardless of who handles technical setup?',
        options: [
          'The assigned media buyer — they own all creative decisions on their accounts',
          'The Creative Strategist within the Creative department',
          'Jonathan — all creative direction is approved at the manager level',
          'Emmanuel — he handles technical setup and creative direction together',
        ],
        correctIndex: 1,
        explanation: 'The Creative Strategist owns copy and creative direction regardless of which setup model is used. Media buyers request creative based on performance data and retain accountability for how it performs once live.',
      },
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
    keyTakeaways: [
      'Problem → Root Cause → Prescription → Coordinate With. Know this sequence for every common scenario.',
      'Billing failures and renewal conversations both go through CSM. Media buyer supplies data, not client contact.',
      'Creative refresh protocol: context check first, then Post-Andromeda duplicate, then full refresh only if duplicate fails.',
      'Before touching anything: check for holidays or local events. Always check if inside first 7 days of a launch.',
      'When briefing creative: be specific. Market, angle, format, and performance context. Vague briefs produce vague ads.',
      'Homework: written account read plus proposed action step per account, ready for Wed July 29\'s first daily call.',
    ],
    quiz: [
      {
        question: 'Survey conversion drops below 2%. What is the correct prescription and who do you coordinate with?',
        options: [
          'Rebuild the ad creative — low survey conversion reflects poor targeting quality',
          'Switch from 7-question to 4-question survey, simplify language. Coordinate with Tech/Automations.',
          'Increase daily ad spend — more traffic volume lifts the survey conversion denominator',
          'Pause the campaign and request a client meeting to discuss the conversion issue',
        ],
        correctIndex: 1,
        explanation: 'Survey conversion under 2% = survey too long or confusing. The Layer 3 lever: switch to 4-question, simplify language. Coordinate with Tech/Automations to update the form. Never escalate to the client — that is CSM\'s domain.',
      },
      {
        question: 'CPL is rising and link CTR is falling. You have verified this is not a new launch (past Day 7). What is Step 1 of the creative refresh protocol?',
        options: [
          'Immediately brief Creative for a full 15-ad refresh with new photos and copy',
          'First check for holidays or local events that could explain the shift. Then: Post-Andromeda duplicate — turn off top-reach ads, duplicate the ad set, launch new set, turn off old. Wait 48 hours.',
          'Increase daily budget by 30% to generate more volume and naturally lower CPL',
          'Contact the client to let them know performance has dipped and request more content',
        ],
        correctIndex: 1,
        explanation: 'Context check first (holiday? new campaign change?). Then Post-Andromeda duplicate — 50/50 shot that it resolves. Only move to full creative refresh if no recovery after 48 hours. Never skip context check, never brief Creative before trying the duplicate.',
      },
      {
        question: 'A client\'s card declines and their ads pause. What is the media buyer\'s responsibility?',
        options: [
          'Call the client immediately to resolve the billing issue — every paused day delays the cycle',
          'Flag the billing failure to CSM immediately. CSM contacts the client. Media buyer does not.',
          'Pause all other accounts temporarily until the billing is resolved to avoid wasted spend',
          'Email the client directly with a professional note and cc Jonathan',
        ],
        correctIndex: 1,
        explanation: 'Billing failures are flagged to CSM — that is the complete media buyer action. CSM contacts the client. This is one of the two places the old and new role structure explicitly differ. Media buyer has zero client contact, including billing.',
      },
      {
        question: 'The Post-Andromeda duplicate did not resolve the performance drop after 48 hours. What is the next step?',
        options: [
          'Run a second duplicate — sometimes the algorithm needs more than one attempt',
          'Full creative refresh: brief Creative with brand info, market, angle, reference images, and performance context. Specify format.',
          'Pause the campaign for 72 hours to reset the algorithm before relaunching',
          'Switch to a different campaign objective — leads objective may no longer be the right fit',
        ],
        correctIndex: 1,
        explanation: 'Post-Andromeda duplicate is a 50/50 shot. If no recovery in 48 hours, the full creative refresh is the next step: brief Creative with specific direction — brand info, market, angle, format, and performance context ("previous video in this format got X% CTR"). Vague briefs produce vague ads.',
      },
      {
        question: 'What homework does each buyer bring into Wednesday July 29\'s first daily call?',
        options: [
          'A list of questions about accounts they are still learning',
          'A written account read plus a proposed action step per account — real material, ready to present',
          'A one-page summary of the four training sessions to demonstrate retention',
          'Cycle dates and current KPIs for each account, pulled from the dashboard',
        ],
        correctIndex: 1,
        explanation: 'The homework going into Day 1 of daily calls: a written read plus a proposed action step per account. This is how the first call has real material from the start — not just an intro session. Do the reads the night before.',
      },
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
