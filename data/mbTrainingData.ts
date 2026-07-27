export interface MBQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

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
    objective: 'Leave understanding the business model, your exact role and standards, what broke in the old model, how your week looks, the department structure, full funnel ownership, and the basics of KPIs and layer reporting.',
    available: true,
    sections: [
      { id: 's1', title: 'A New Chapter', subtitle: 'What this role is, what it isn\'t, and why it starts completely fresh.', estimatedTime: '5 min', icon: '🎯' },
      { id: 's2', title: 'Team Standards', subtitle: 'The 5 standards, the zero-tolerance policy, and what Day 1 sets in motion.', estimatedTime: '5 min', icon: '⚠️' },
      { id: 's3', title: 'The RoofIgnite Model', subtitle: '28-day cycles, performance math, spend targets, and how billing works.', estimatedTime: '10 min', icon: '📐' },
      { id: 's4', title: 'What Wasn\'t Working', subtitle: 'The pod manager overload problem — and why this team is the solution.', estimatedTime: '5 min', icon: '🔄' },
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
    quiz: [
      {
        question: 'For a client spending $100/day, what is the minimum number of booked appointments required to hit the billing threshold?',
        options: [
          '15 — the full goal for a $100/day cycle',
          '12 — the 80% minimum that must be reached to avoid discounts',
          '6 — 50% of the 80% minimum goal, which is the billing threshold',
          '8 — a rough midpoint between the goal and the floor',
        ],
        correctIndex: 2,
        explanation: '$100/day × 28 days = $2,800. Goal: 15 booked appointments. 80% minimum: 12. Billing threshold: 50% of the 80% goal = 6. Anything below 6 means the company cannot bill. Between 6–11 means discounts apply per appointment short of 12.',
      },
      {
        question: 'You are 25 days into a 28-day cycle. The client has spent $800 of the $2,800 target. What is the correct action?',
        options: [
          'Close the cycle early — the underspend means targets cannot be reached',
          'Leave the budget as-is and report the underspend at cycle close',
          'Flag it to CSM and ask the client if they want to extend the cycle',
          'Ramp the daily budget over the remaining 3 days to hit $2,800 by Day 28',
        ],
        correctIndex: 3,
        explanation: 'The cycle is 28 days AND contingent on hitting the target spend ($2,800 for a $100/day account). If you are behind, you ramp the budget so both are hit and billing can happen on Day 28. Underspend = underdelivery on volume.',
      },
      {
        question: 'At a 50% booking rate, how many leads must you generate to reach 15 booked appointments?',
        options: [
          '15 — one lead per booked appointment',
          '20 — accounting for a 25% buffer on top of target',
          '30 — at 50% booking rate, half of all leads contacted will book',
          '45 — to account for out-of-service-area leads and no-shows',
        ],
        correctIndex: 2,
        explanation: 'The booking rate is 50% — meaning half of all leads contacted by the VA team will become booked appointments. To get 15 booked, you need 30 leads. This is the core math behind every cycle\'s lead volume target.',
      },
      {
        question: 'What is the primary structural reason the pod manager model is being replaced for media buying?',
        options: [
          'Pod managers lacked the technical skills required for Meta Ads',
          'Pod managers were spread too thin across too many functions — which caused them to miss details, and clients to not hit targets',
          'The agency wants to lower headcount by consolidating roles',
          'Media buyers can carry more accounts with less management overhead',
        ],
        correctIndex: 1,
        explanation: 'Pod managers owned too many functions and got overwhelmed. When one person is doing everything, small details fall through. Clients miss targets. Specialists with one function — full ownership, full attention — solve that problem.',
      },
      {
        question: 'You arrive 2 minutes late to your first team meeting. Under Team Standards, what is the consequence?',
        options: [
          'A formal warning is issued — the first offense is documented but no action taken',
          'Jonathan notes it and monitors for a pattern before taking action',
          'There are no second chances — any violation of Team Standards, including punctuality, results in removal from the role',
          'Late arrivals are tracked over 30 days; a pattern triggers a review',
        ],
        correctIndex: 2,
        explanation: 'Team Standards are held from Day 1 with zero second chances. Not even once — even one minute late, even doing something incorrectly, even failing to communicate when you should have. This was stated explicitly on Day 1 so there is zero ambiguity.',
      },
      {
        question: 'An account hits 9 booked appointments in a cycle where the goal was 15. What is the billing outcome?',
        options: [
          'No billing at all — 9 is below the 80% minimum of 12',
          'Full billing — any bookings above the billing threshold (6) means the full invoice is sent',
          'Discounted billing — we discount the invoice by the number of appointments short of the 80% goal (12), so 3 appointments discounted',
          'The cycle is extended without charge until 12 bookings are reached',
        ],
        correctIndex: 2,
        explanation: '9 booked appointments is above the billing threshold (6) but below the 80% minimum (12). That means billing applies, but discounted. We discount by how many appointments are short of the 80% goal — in this case, 3 short of 12. Every miss below 12 directly costs the company.',
      },
      {
        question: 'A client reaches out to you on WhatsApp asking for a quick update on their lead volume. What do you do?',
        options: [
          'Send a brief informal update since it\'s just WhatsApp and not official communication',
          'Acknowledge and route them to CSM — zero client contact means zero, on any channel',
          'Update them with current numbers and loop in CSM afterward',
          'Tell them you\'ll check with Jonathan before responding',
        ],
        correctIndex: 1,
        explanation: 'Zero client contact means zero — on every channel, for every type of question. Email, WhatsApp, phone, Slack — all client communication goes through CSM. Do not share numbers, even informally. Route immediately and do not reply with data.',
      },
      {
        question: 'Who owns copy and creative direction for client ad accounts?',
        options: [
          'The media buyer — you request and direct all creative decisions on your accounts',
          'Jonathan — all creative direction is reviewed and approved at the manager level',
          'Ken (Creative Strategist) and the Creative team — they own copy and creative direction; you brief them based on performance data',
          'CSM — they manage the client relationship including creative approvals',
        ],
        correctIndex: 2,
        explanation: 'Creative direction belongs to Ken and the Creative Strategist. Media buyers request creative refreshes based on performance data — specific briefs with market, angle, format, and performance context. You do not create assets. You direct through data.',
      },
      {
        question: 'What does "full funnel ownership" mean for a media buyer?',
        options: [
          'You execute every step of the funnel end-to-end, including landing pages and GHL setup',
          'You share equal ownership of outcomes with CSM and the VA lead',
          'You own the ads; the VA team owns everything after the lead is generated',
          'You own the outcome — from ads to booked appointment — even though other teams execute their parts of the funnel',
        ],
        correctIndex: 3,
        explanation: 'Other departments execute their steps — Tech builds the landing page, VA makes the calls. But you own the final result. If a client isn\'t hitting targets, that conversation starts with you — not with VA, not with Tech. You coordinate the chain. You own the number.',
      },
      {
        question: 'What are the deep-dive meeting days in the new cadence?',
        options: [
          'Monday and Thursday — same days as the written update posts',
          'Tuesday and Friday — full account reviews and diagnostic sessions',
          'Wednesday and Friday — mid-week and end-of-week',
          'Every day — the goal is daily deep dives from the start',
        ],
        correctIndex: 1,
        explanation: 'Tuesday and Friday are the deep dive days — full account reviews with Jonathan. Monday and Thursday are the written update post days (same cadence as pod manager updates, but replacing them). Monday, Wednesday, and Thursday also have brief check-ins.',
      },
      {
        question: 'You want to adjust the targeting on an underperforming ad set. What is the correct process?',
        options: [
          'Make the change and log it in the account log book',
          'Make the change if it\'s under a $50 daily budget impact; larger changes need approval',
          'Get approval before acting — "approval before action" applies to all account changes while the model is new',
          'Targeting changes are self-directed; only creative changes need approval',
        ],
        correctIndex: 2,
        explanation: '"Approval before action" applies to everything — targeting, budget, creative, pausing, launching — while the model is new. No exceptions. Make the change after you have approval, not before. This standard protects accounts and builds the right habits.',
      },
      {
        question: 'Which department is currently responsible for Tech & Automations at RoofIgnite?',
        options: [
          'Emmanuel and a dedicated tech team',
          'Mervin handles tech alongside his media buying responsibilities',
          'The role is vacant — the team is actively hiring for a Tech/Automations specialist',
          'Jonathan manages tech and automations until a hire is made',
        ],
        correctIndex: 2,
        explanation: 'Tech & Automations has no dedicated owner at the moment — the team is actively hiring for this role. Tech blockers get flagged and escalated immediately. Do not let unresolved tech issues quietly drain account performance.',
      },
      {
        question: 'RoofIgnite serves clients in which industries?',
        options: [
          'E-commerce, retail, and direct-to-consumer brands',
          'Real estate, mortgage, and property management',
          'Home services — primarily roofing, HVAC, gutters, and similar contractors',
          'Restaurants, hospitality, and local events',
        ],
        correctIndex: 2,
        explanation: 'RoofIgnite is a home service marketing agency. Clients are contractors in roofing, HVAC, gutters, and similar home service trades across the US. Understanding the vertical matters — the angles, the market, the seasonality all affect ad performance.',
      },
      {
        question: 'Who are Louie Ann Z. and Pamela on the RoofIgnite team?',
        options: [
          'Creative specialists supporting Ken on ad production',
          'CSM managers who handle client communication and renewals',
          'VA Managers who oversee the VA team and booking operations',
          'Tech/Automations leads responsible for GHL and integrations',
        ],
        correctIndex: 2,
        explanation: 'Louie Ann Z. and Pamela are the VA Managers. Leila is the VA Lead. This team handles all lead calls and appointment booking. They are the execution layer between your leads and the booked appointments you are accountable for.',
      },
      {
        question: 'What is the correct weekly reporting rhythm for written updates?',
        options: [
          'Daily written updates — one per morning covering all accounts',
          'Weekly written update — every Friday before the deep dive meeting',
          'Monday and Thursday — replacing the pod manager update cadence',
          'Tuesday and Friday, aligned with the deep dive meeting schedule',
        ],
        correctIndex: 2,
        explanation: 'Written updates are due Monday and Thursday — the same cadence pod managers used, but now media buyers replace them for ad performance. These posts cover account-by-account reads: what\'s performing, what\'s not, and what action is being taken.',
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
