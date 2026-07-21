export interface MBQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MBContentSection {
  heading: string;
  items: string[];
  callout?: { type: 'warning' | 'tip' | 'rule'; text: string };
}

export interface MBTrainingDay {
  id: number;
  title: string;
  subtitle: string;
  estimatedTime: string;
  color: string;
  icon: string;
  objective: string;
  sections: MBContentSection[];
  keyTakeaways: string[];
  quiz: MBQuizQuestion[];
}

export const MB_TRAINING_DAYS: MBTrainingDay[] = [
  {
    id: 1,
    title: 'Session 1 — Business Model, Structure & Operating Standards',
    subtitle: 'Thu, July 23 · Why the change is happening, what you own, and how you operate.',
    estimatedTime: '2–3 hrs',
    color: '#F5C800',
    icon: '🏗️',
    objective: 'Leave this session knowing the business model, your exact role and accountability, the operating standards held from Day 1, the full KPI set, how reporting works, and what your week looks like.',
    sections: [
      {
        heading: 'Business Model & Cycle Structure',
        items: [
          'RoofIgnite runs Meta ads and GHL (GoHighLevel) to generate inbound leads and booked appointments for roofing contractors across the US.',
          'Clients run on a 28-day cycle. Every KPI conversation is framed against that cycle — not monthly, not weekly, not quarterly.',
          'Revenue is tied to performance. Clients stay when leads and appointments come in at scalable cost. When they don\'t, they leave.',
          'Your job is to keep cost per lead and cost per booked appointment inside the range where the economics work for the client.',
        ],
        callout: {
          type: 'rule',
          text: 'Know the current cycle dates and spend target for every account you own. If you don\'t know them, find them — do not guess.',
        },
      },
      {
        heading: 'New Department Structure',
        items: [
          'The pod model is retired. We now operate in specialized departments.',
          'Media Buying: owns ad performance — strategy, execution, creative direction requests. That\'s you.',
          'CSM (Client Success Management): owns all client communication. Performance updates, questions, concerns, escalations — all of it goes through CSM. Not you.',
          'VA/Call Center: calls leads and books appointments. You generate the leads. They close them.',
          'Creative: builds ad assets based on media buyer direction and performance data. The Creative Strategist within that department owns copy and creative direction on each account.',
          'Tech/Automations: GHL setup, integrations, and technical issues. Escalate tech blockers here.',
        ],
        callout: {
          type: 'warning',
          text: 'Media buyers have zero client-facing responsibility. Do not email clients, message them, hop on calls with them, or share performance data with them directly. All of that goes through CSM. No exceptions.',
        },
      },
      {
        heading: 'Team Standards — Set on Day 1, Held Every Day After',
        items: [
          'Communication: clear, direct, and prompt. If something\'s unclear, ask. Don\'t guess and move forward on an assumption.',
          'Accountability: own your accounts and your mistakes. If something is off on your accounts, it\'s your problem to catch and fix — not someone else\'s department\'s problem.',
          'Listen to detail: instructions and account context get followed precisely, not approximated. If a direction was given, follow it as given.',
          'Approval before action: nothing goes live, gets changed, or gets pushed out on an account without approval first. No exceptions while this model is new.',
          'Punctuality: on time to every meeting, early if anything. Late is not acceptable.',
        ],
        callout: {
          type: 'rule',
          text: 'These standards are not a soft guideline. They are the bar. This is a new model and the team gets built around people who can meet it.',
        },
      },
      {
        heading: 'Ownership & Accountability',
        items: [
          'Full ownership means: if something\'s off on your accounts, it\'s your job to catch it and fix it — not wait to be told.',
          'You don\'t react to problems. You find them first, diagnose them, and act.',
          'Catching a problem before leadership sees it is the standard. Being told about a problem that was already in your accounts is a process failure.',
          'Ownership applies 7 days a week. Monday through Friday is the standard schedule. Occasional Saturday involvement is expected when an account needs action that genuinely can\'t wait until Monday. Saturday work should be the exception, not routine.',
        ],
      },
      {
        heading: 'Growth & Retention on This Team',
        items: [
          'We\'re hiring more media buyers. That means more competition for accounts and growth opportunities on this team.',
          'We\'re hiring for top talent. The expectation is that the team gets sharper as it grows, not diluted.',
          'What earns growth: highest-performing accounts, doing the work correctly (not just quickly), fast response times, and real ownership.',
          'What earns a continued spot: consistently meeting the standards above. People who don\'t will be the ones we look at first when the team gets restructured.',
          'This isn\'t meant to create anxiety — it\'s meant to be transparent. Perform at this level and growth follows as we scale.',
        ],
      },
      {
        heading: 'Two-Layer Reporting System',
        items: [
          'Layer 1 — Cycle performance: full 28-day cycle metrics. This is the primary accountability window.',
          'Layer 2 — Rolling windows: 3-day, 5-day, and 7-day views layered on top of the cycle. These catch problems early, inside the cycle, instead of only at cycle close.',
          'Rolling windows are how you spot a CPL creep on Day 8 instead of finding out at Day 28 that the cycle was off from Week 1.',
          'Goal: automate daily delivery of rolling window reports so buyers get these numbers pushed to them, not pulled manually.',
          'Flag as build item: daily rolling report automation pipeline (Tech/Automations dependency — not live yet).',
        ],
        callout: {
          type: 'tip',
          text: 'Until the automation is live, pull your own rolling windows at the start of each day. The numbers don\'t care about the automation status — you still need them.',
        },
      },
      {
        heading: 'Full KPI Reference',
        items: [
          'Cost per link click — efficiency of the ad at driving traffic.',
          'CTR (link click-through rate specifically — not generic engagement CTR) — how compelling the creative is to the target audience.',
          'CPM (cost per 1,000 impressions) — indicator of audience competitiveness and ad relevance.',
          'Frequency — how many times the same person has seen the ad. Above 3–4 on a cold audience, refresh creative.',
          'Cost per lead — primary efficiency metric. Compare against the scalable target for the specific account, not a universal benchmark.',
          'Cost per booked appointment — downstream metric connecting ad performance to actual business outcome.',
          'Out-of-service-area % — percentage of leads coming from outside the client\'s actual service area. A targeting quality signal. High % means wasted spend and bad leads.',
          'Leads generated — rolling window totals (3/5/7-day) plus cycle total.',
          'Booked appointments generated — rolling window totals (3/5/7-day) plus cycle total.',
          'Ad spend vs. target pacing — are you on track to spend the right amount across the cycle? Not too fast, not too slow.',
        ],
        callout: {
          type: 'rule',
          text: 'Full ownership of these KPIs means being able to explain any of them at any moment for any account — not just reacting when someone asks. Know your numbers before every meeting.',
        },
      },
      {
        heading: 'Meeting Cadence & Schedule',
        items: [
          'Starting Tue, July 28: daily check-ins, start of day and end of day.',
          'AM check-in purpose: review what happened overnight, flag anything that needs action before day starts.',
          'PM check-in purpose: report out on what you touched, what\'s changed, and what needs attention tomorrow.',
          'Goal of daily cadence: build the habit of reporting and catching issues in real time while the model is new.',
          'Tapering: daily meetings move to twice a week once the team is proficient. Exact trigger point is still being defined.',
          'Separate: a broader account review session, still being defined, where accounts get reviewed across a larger group and timeframe — successor to the old pod review meeting.',
        ],
        callout: {
          type: 'warning',
          text: 'Punctuality is a Team Standard. On time means ready at the start. Not logging on at the start time — ready at the start time.',
        },
      },
      {
        heading: 'Account Distribution',
        items: [
          'Distribution starts immediately — it doesn\'t wait for training to finish.',
          'Starts heavy, based on the existing pod structure, and thins out as more media buyers come on.',
          'During the transition window, you carry these accounts alongside whatever\'s left of your current pod manager tasks. This overlap is expected to be temporary, not permanent.',
          'The standard still applies from Day 1 — accounts are yours to own, regardless of how the transition is sequenced.',
        ],
      },
    ],
    keyTakeaways: [
      'The 28-day cycle is the primary accountability window. Know your cycle dates and pacing at all times.',
      'Media buying owns ad performance. CSM owns the client. These lines do not cross — ever.',
      'The five Team Standards are the operating floor, not a bonus. Approval before action, on time, own your accounts.',
      'Two-layer reporting: 28-day cycle + rolling 3/5/7-day windows. Rolling windows catch problems inside the cycle.',
      'Know all 10 KPIs for every account. Out-of-service-area % is a targeting quality signal — don\'t ignore it.',
      'Distribution starts now. Overlap with current tasks is temporary. Own your accounts from Day 1.',
    ],
    quiz: [
      {
        question: 'How long is a RoofIgnite client cycle, and why does it matter?',
        options: [
          'One month calendar cycle — used for billing purposes',
          '28 days — the primary window against which all KPIs and performance conversations are measured',
          '7 days — rolling weekly review window used for all account decisions',
          '90 days — a quarterly performance period used for client retention decisions',
        ],
        correctIndex: 1,
        explanation: 'The 28-day cycle is the core unit of performance measurement. Every KPI conversation, reporting window, and accountability standard is framed against it — not monthly calendar periods.',
      },
      {
        question: 'A client contacts you directly on Slack to ask about their account performance. What do you do?',
        options: [
          'Answer briefly since it\'s just a quick question and doesn\'t require a full report',
          'Tell them you\'ll get back to them after the next scheduled review',
          'Be professional, acknowledge them, and immediately route them to CSM — do not share any performance data',
          'Update them on current KPIs and flag the interaction to CSM afterward',
        ],
        correctIndex: 2,
        explanation: 'Media buyers have zero client-facing responsibility. Any client contact — even "just a quick question" — goes through CSM. Route them immediately and don\'t share data.',
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
        explanation: 'Approval before action is a Team Standard that applies to everything while the model is new. Not some things — everything. This protects clients and builds the right habits on a new team.',
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
        explanation: 'Out-of-service-area % is a targeting quality signal. A high percentage means wasted ad spend on leads the client can\'t service — regardless of how cheap the CPL looks.',
      },
      {
        question: 'What are the two layers of the reporting system, and what does each do?',
        options: [
          'Daily reports and weekly summaries — daily for internal use, weekly for client-facing updates',
          'Full 28-day cycle performance plus rolling 3/5/7-day windows — cycle for accountability, rolling windows to catch problems early inside the cycle',
          'Account-level reports and portfolio-level rollups — account reports daily, portfolio weekly',
          'Paid media reports and GHL pipeline reports — separate systems that get reconciled at cycle close',
        ],
        correctIndex: 1,
        explanation: 'The two-layer system exists because cycle-only reporting misses problems until it\'s too late to fix them. Rolling windows (3/5/7-day) let you catch a CPL issue on Day 8 instead of Day 28.',
      },
    ],
  },

  {
    id: 2,
    title: 'Session 2 — Auditing, Diagnostics, QA & Department Integration',
    subtitle: 'Mon, July 27 · How to read any account, solve any problem, and work with every department.',
    estimatedTime: '2–3 hrs',
    color: '#4A90D9',
    icon: '🔍',
    objective: 'Leave this session able to audit any account, diagnose problems correctly, apply the right fix, run weekly QA, manage budget properly, and work effectively with VA, Creative, and the setup model.',
    sections: [
      {
        heading: 'How to Audit an Account',
        items: [
          'Standard account audit: trace leads to outcome, review the log book, check KPIs against target, verify spend pacing.',
          'Leads: for each lead — was it called? When? Did it answer? Was it pitched? Did it book? If not, why? Trace every lead to its final outcome before changing anything.',
          'Log book: read the last 30 days before touching anything. Don\'t repeat what didn\'t work. Log every change you make: what, why, and expected result.',
          'KPIs: pull CPL by ad set, check frequency on all active sets, verify CTR trend, confirm spend is on pace.',
          'Competitive research: audit accounts in the context of what competitors are running and what the market landscape looks like. Recommendations made in a vacuum aren\'t recommendations — they\'re guesses.',
          'Audit cadence: every account, minimum weekly. Higher-priority or at-risk accounts more frequently.',
        ],
        callout: {
          type: 'rule',
          text: 'Diagnose before acting. Every time. Never make a change to an account without being able to state the problem it solves and the analysis that led you there.',
        },
      },
      {
        heading: 'Diagnosing & Fixing: Common Scenarios',
        items: [
          'Low lead flow — check: is spend pacing on track? Is frequency high (audience burned)? Is CTR declining (creative fatigue)? Is the landing page or lead form broken? Is targeting geography correct?',
          'CPL too high — diagnose whether it\'s creative (low CTR), targeting (wrong audience or geography), or post-click (LP/form not converting). Each has a different fix. Don\'t swap creative when the problem is the landing page.',
          'Good CPL, no bookings — this is almost never an ad problem. Check VA call volume and contact rate before touching anything in the ad account. Escalate to VA team with data.',
          'Spend off-pace — overpacing: reduce daily budgets gradually (20–30% at a time) to avoid resetting ad set learning. Underpacing: increase gradually, don\'t try to make it up in the last few days.',
          'Seasonal and holiday adjustments: scale ad spend down around major holidays in advance, not reactively. Scale back up post-holiday. Failure to plan around holidays wastes client budget on zero-conversion days.',
        ],
        callout: {
          type: 'tip',
          text: 'For every scenario: problem → analysis → solution. Never skip the middle step. Treating a symptom without a diagnosis creates a different problem.',
        },
      },
      {
        heading: 'QA: Weekly Standing Check',
        items: [
          'QA is not a one-time onboarding step. It is a weekly minimum for every account you own.',
          'Check: anything turned on that should be off (zombie creative tests, expired promos, wrong seasonal messaging).',
          'Check: anything turned off that should be on (paused winners, missing ad sets from approved campaigns).',
          'Check: audience overlap — multiple ad sets competing for the same audience burns budget and distorts data.',
          'Check: pixel and tracking integrity — broken tracking means incomplete data and wrong optimization signals.',
          'Check: geography targeting — wrong service area means unserviceable leads regardless of CPL.',
          'Log every QA check in the log book. If you don\'t document it, it didn\'t happen.',
        ],
        callout: {
          type: 'warning',
          text: 'Zombie creative tests are one of the most common budget leaks. A test that concluded weeks ago but never got turned off is still spending money with zero chance of winning. Check every account, every week.',
        },
      },
      {
        heading: 'Budget Management',
        items: [
          'Protecting client ad spend is treated as seriously as generating results. These are not separate priorities.',
          'Every dollar spent ties back to cost per lead and cost per booked appointment. There is no "learning spend" that exists outside of those metrics.',
          'Results should show up relatively quickly. Overspending to "figure out" if something works is not the standard.',
          'Budget change rule: increase or decrease in increments of 20–30% at a time to avoid resetting ad set learning.',
          'Mid-cycle pacing check: at any point, expected spend = (days elapsed ÷ total cycle days) × total cycle budget. If you\'re significantly above or below, act immediately.',
        ],
        callout: {
          type: 'rule',
          text: 'You are accountable for every dollar spent on your accounts. "I was testing" is not a defense for wasted budget. Test within the economics, not outside them.',
        },
      },
      {
        heading: 'Full Funnel Responsibility',
        items: [
          'Your accountability does not stop at the ad. The full funnel is: ad → landing page → form/survey fill → entry into GHL.',
          'Landing page: check conversion rate. High CTR + high CPL usually means clicks are happening but the page isn\'t converting.',
          'Form/survey: verify completion rate. A form that\'s too long or asks the wrong questions loses leads after the click.',
          'GHL entry: data validity matters. What enters the system needs to be accurate and usable — wrong numbers, wrong names, or blank fields create VA problems downstream.',
          'Downstream visibility: keep tabs on leads after they enter GHL. Confirm VAs are calling them and at what rate. You own the lead quality; they own the calling. Both affect booked appointments.',
          'Optimization target: lowest cost per lead without sacrificing quality. Lead quality is what drives cost per booked appointment down. Cheap, unserviceable leads are not a win.',
        ],
        callout: {
          type: 'rule',
          text: 'Out-of-service-area % lives in the full funnel check. If that number is climbing, the problem is upstream — targeting or landing page is attracting the wrong geography.',
        },
      },
      {
        heading: 'VA Collaboration',
        items: [
          'VAs call leads and book appointments. You generate the leads. Shared accountability for booked appointments during this transition phase.',
          'Before flagging a booking issue: verify call data first. Was the lead actually called? When? How many attempts?',
          'When flagging to VA team: bring specific data — account name, lead count, timeframe, call log evidence. Not a general complaint.',
          'Good flag: "Account X — 18 leads in the last 5 days. Call log shows 6 called, 12 uncalled. Requesting follow-up on the 12."',
          'Not a good flag: "The leads aren\'t booking, can you look into it?"',
          'Long-term: full booked-appointment accountability shifts to the VA/Call Center department. For now, it\'s shared.',
          'Route systemic VA issues through the proper channel — not to individual VAs directly unless it\'s a quick operational moment.',
        ],
      },
      {
        heading: 'Creative Collaboration & The Creative Strategist',
        items: [
          'The Creative Department builds ad assets. The Creative Strategist within that department owns the actual copy and creative direction on each account.',
          'Your role: request specific creative based on performance data, give precise feedback, and retain full ownership of how that creative performs once it\'s live.',
          'How to request: be specific. Provide the market, the angle, the format, the audience mindset, and performance context from similar creative if available.',
          'How to give feedback: bring data. "This video got 3.2% CTR and $18 CPL in Week 1 — make more in this style" is useful. "It looked good but didn\'t really perform" is not.',
          'The loop: request → Creative Strategist directs → Creative builds → you run it → you report results → they iterate.',
          'You own the performance outcome even though you didn\'t build the asset. Creative quality and your direction are both in your lane.',
        ],
        callout: {
          type: 'tip',
          text: 'The Creative Strategist is a resource who owns the creative craft. The better your performance data and the more specific your direction, the better the output. Vague requests produce generic creative.',
        },
      },
      {
        heading: 'Setup Model (Directional — Still Being Finalized)',
        items: [
          'Current direction: one manual media buyer handles full account setup for everyone, carrying roughly half the normal book of business of an assigned buyer to make room for that work.',
          'Once an account\'s setup is complete, it hands off to the assigned media buyer for ongoing management.',
          'Alternate version under consideration: the manual buyer only handles GHL setup, and each assigned buyer does their own ad account setup from the start.',
          'Either way: the Creative Strategist owns copy and creative direction regardless of who handles the technical setup.',
          'Either way: approval before action applies to setup work just like ongoing management.',
          'Final model is not yet decided. Present this as directional — exact structure will be confirmed before rollout.',
        ],
        callout: {
          type: 'warning',
          text: 'Open item: final setup model is pending decision. Do not make assumptions about who handles what until it\'s confirmed. Ask before acting on setup tasks that aren\'t clearly assigned.',
        },
      },
      {
        heading: 'Open Items — What\'s Still Being Finalized',
        items: [
          'Daily rolling report automation (3/5/7-day windows): Tech/Automations dependency — build timeline TBD.',
          'Trigger point for moving from daily check-ins to twice-weekly cadence: not yet defined.',
          'Format and cadence of the broader account review session (successor to pod review): still being designed.',
          'Final setup model: manual-does-everything vs. manual-does-GHL-only-and-buyers-self-serve-ad-setup.',
          'Compensation structure: tied to account performance, exact structure TBD before rollout.',
          'These are open items, not missing details. Decisions will come. In the meantime, operate on what\'s confirmed.',
        ],
        callout: {
          type: 'tip',
          text: 'When something isn\'t yet decided, ask rather than assume. This is exactly what the "communication" Team Standard covers: if it\'s unclear, ask. Don\'t guess and move forward on an assumption.',
        },
      },
    ],
    keyTakeaways: [
      'Audit = leads traced to outcome + log book reviewed + KPIs checked + pacing verified + competitive context.',
      'Diagnose before acting. Every time. Problem → Analysis → Solution. Never skip the middle step.',
      'QA is weekly, minimum. Zombie tests, wrong geography, broken tracking — check every account, every week.',
      'Full funnel: ad, landing page, form, GHL entry, downstream VA visibility. You own all of it.',
      'Creative Strategist owns copy and direction. You own performance. Bring data to every request and feedback.',
      'Setup model is directional, not final. Don\'t assume — ask before acting on anything that isn\'t confirmed.',
    ],
    quiz: [
      {
        question: 'What does a full account audit include that goes beyond the ad account itself?',
        options: [
          'The ad account metrics and a call with the client to verify data accuracy',
          'The ad, landing page conversion rate, form/survey completion, GHL data validity, and downstream VA call tracking',
          'Ad account metrics and a review of the client\'s previous cycle invoice',
          'Creative assets, audience targeting, and the competitor landscape only',
        ],
        correctIndex: 1,
        explanation: 'Full funnel ownership means the ad account is the starting point, not the whole picture. The funnel runs through the LP, the form fill, GHL entry, and VA follow-through — all of it is in scope.',
      },
      {
        question: 'Strong lead volume, good CPL, near-zero booked appointments. What\'s the correct first step?',
        options: [
          'Kill the current ad sets and rebuild with more specific audience targeting to improve lead quality',
          'Lower the daily budgets immediately since the leads clearly aren\'t converting',
          'Verify VA call data — were leads called? How many attempts? What\'s the contact rate? Escalate with data if calling is the bottleneck',
          'Request new creative from the Creative Department to attract higher-intent leads',
        ],
        correctIndex: 2,
        explanation: 'Good leads + no bookings is almost always a VA/call issue, not an ad issue. Changing ads won\'t fix a broken calling funnel. Diagnose first — the answer is in the call log, not the ad account.',
      },
      {
        question: 'What is the Creative Strategist\'s role, and how does it relate to the media buyer\'s role?',
        options: [
          'The Creative Strategist approves creative requests from media buyers but doesn\'t direct the actual content',
          'The Creative Strategist owns copy and creative direction on the account; the media buyer requests based on performance data and retains ownership of how the creative performs once live',
          'The Creative Strategist and media buyer share equal accountability for creative performance',
          'The Creative Strategist is a client-facing role that presents creative concepts for approval before production',
        ],
        correctIndex: 1,
        explanation: 'The Creative Strategist owns the craft — copy, direction, and execution. The media buyer drives what gets made through performance data and specific requests, and retains ownership of results. It\'s a loop: request, build, run, report, iterate.',
      },
      {
        question: 'According to the budget management standard, what is NOT acceptable?',
        options: [
          'Making budget changes in 20–30% increments to protect ad set learning',
          'Reducing daily budgets mid-cycle to correct an overpacing issue',
          'Overspending to "figure out" if something works — every dollar must tie back to CPL and cost per booked appointment',
          'Adjusting budgets gradually during a holiday period to manage spend efficiency',
        ],
        correctIndex: 2,
        explanation: 'There is no "learning spend" that exists outside of CPL and cost per booked appointment. Results should show up relatively quickly. Burning client budget to test something that hasn\'t proven itself is not the standard.',
      },
      {
        question: 'What does "out-of-service-area %" measure, and what does a high number indicate?',
        options: [
          'The percentage of ad spend that went to impressions outside business hours — indicates wrong scheduling',
          'The percentage of leads coming from outside the client\'s actual service area — a targeting quality signal indicating wasted spend and unserviceable leads',
          'The percentage of accounts where CPL is above the scalable target — a portfolio-level efficiency metric',
          'The percentage of VAs calling leads outside their designated geographic zone',
        ],
        correctIndex: 1,
        explanation: 'Out-of-service-area % is a targeting quality signal. High % means leads are coming from areas the client can\'t service — cheap leads that never convert and waste the client\'s budget. Fix is in targeting or landing page geography.',
      },
    ],
  },
];

export const MB_WORKSHEET_SECTIONS = [
  {
    id: 'role-standards',
    title: 'Role Clarity & Team Standards',
    description: 'Confirm your understanding of what you own, what you don\'t, and the operating standards held from Day 1.',
    items: [
      'I own ad performance on my accounts: strategy, execution, and creative direction. That\'s it.',
      'I have zero client-facing responsibility. All client communication goes through CSM — not me.',
      'I understand the distinction between my role, the VA/Call Center role, and the Creative Strategist\'s role.',
      'I understand and accept the five Team Standards: communication, accountability, listen to detail, approval before action, and punctuality.',
      'I understand that approval before action applies to everything while the model is new — no exceptions.',
      'I understand the escalation path: portal/SOPs → peer media buyer → leadership. Come with context, not just a question.',
      'I understand the growth and retention standard: performance determines opportunity as the team scales.',
      'I have reviewed my account list and know my current assignments.',
    ],
  },
  {
    id: 'kpi-reference',
    title: 'KPI Reference Sheet',
    description: 'All 10 KPIs you own. Know what each one signals and when to act on it.',
    items: [
      'Cost per link click — efficiency of the ad at driving traffic to the landing page',
      'CTR (link click-through rate, not engagement CTR) — how compelling the creative is to the target audience',
      'CPM — cost per 1,000 impressions; signals audience competitiveness and ad relevance',
      'Frequency — times the same person has seen the ad; refresh creative above 3–4 on a cold audience',
      'Cost per lead — compare against the scalable target for the specific account, not a universal number',
      'Cost per booked appointment — connects ad performance to actual business outcome',
      'Out-of-service-area % — percentage of leads from outside the client\'s service area; high % = targeting or LP problem',
      'Leads generated — rolling window (3/5/7-day) totals plus cycle total',
      'Booked appointments generated — rolling window (3/5/7-day) totals plus cycle total',
      'Ad spend vs. target pacing — expected spend at any point = (days elapsed / cycle days) × cycle budget',
    ],
  },
  {
    id: 'reporting-cadence',
    title: 'Reporting & Meeting Cadence',
    description: 'How reporting works and what the daily and weekly schedule looks like.',
    items: [
      'I understand the two-layer reporting system: full 28-day cycle + rolling 3/5/7-day windows.',
      'I know why rolling windows matter: catch CPL issues on Day 8, not Day 28.',
      'Until rolling report automation is live: I pull my own rolling windows at the start of each day.',
      'Daily AM check-in: review overnight pacing and lead volume changes, flag anything needing action.',
      'Daily PM check-in: report what I touched, what changed, what needs attention tomorrow.',
      'I am on time to every check-in — ready at the start time, not logging in at the start time.',
      'I know that daily cadence tapers to twice weekly once the team is proficient (trigger TBD).',
      'I know that a separate broader account review session is coming — structure still being designed.',
    ],
  },
  {
    id: 'account-audit',
    title: 'Account Audit Protocol',
    description: 'Run through this for every account, every week. Also use when inheriting an account for the first time.',
    items: [
      'Reviewed cycle dates and current spend vs. target pacing (use the formula: days elapsed / cycle days × budget)',
      'Read the log book from the last 30 days — understood what changed, why, and what came of it',
      'Pulled CPL by ad set for the current cycle — identified top and bottom performers',
      'Checked frequency on all active ad sets — flagged any above 3–4',
      'Verified all active ad sets should be running (no zombie tests, no expired promos, no wrong seasonal creative)',
      'Checked geography targeting on all active ad sets — verified service area is correct',
      'Checked out-of-service-area % — flagged if above acceptable threshold',
      'Audited last 20+ leads: were they called? When? Contact rate? Booking rate? Where did they drop?',
      'Checked LP conversion rate and form/survey completion rate',
      'Verified GHL data entry is clean — no blank fields, wrong numbers, or incomplete records',
      'Reviewed competitor landscape relevant to this account — what are they running?',
      'Identified all warning signs requiring action — documented in log book with owner and next step',
    ],
  },
  {
    id: 'va-creative-collab',
    title: 'VA & Creative Collaboration Protocols',
    description: 'How to work effectively with the VA/Call Center team and the Creative Department.',
    items: [
      'Before flagging a booking issue to VA: pull call data first — was the lead actually called, and how many times?',
      'VA flag format: account name + lead count + timeframe + call log evidence + specific ask',
      'Good VA flag: "Account X — 18 leads in 5 days. Call log shows 6 called, 12 uncalled. Please follow up on the 12."',
      'Not a good VA flag: "Leads aren\'t booking, can you look into it?"',
      'Creative request format: market + angle + format + audience mindset + performance context from similar creative',
      'Creative feedback format: data (CTR, CPL, spend) + what it means + what to do next',
      'Good creative feedback: "New static — 0.9% CTR vs 1.8% previous — not a format winner for this market."',
      'Not good creative feedback: "The creative looks good but didn\'t really perform."',
      'Remember: the Creative Strategist owns copy and direction. I own performance. Both matter.',
    ],
  },
  {
    id: 'weekly-workflow',
    title: 'Weekly Workflow Template',
    description: 'Starting structure for managing the week. Adjust as the meeting cadence and reporting automation are confirmed.',
    items: [
      'Every AM: check overnight pacing and lead volume changes across all accounts before anything else.',
      'Every PM: log book updates, VA flag review, respond to any internal escalations.',
      'Monday: full account review — KPIs, pacing, lead audit, log book catch-up.',
      'Tuesday: AM check-in. Present status on any flagged accounts. Action items from the call.',
      'Wednesday: proactive deep-dives on at-risk accounts or accounts approaching cycle end.',
      'Thursday: creative request submissions based on the week\'s data.',
      'Friday: PM check-in. Finalize any cycle-end actions. QA check on all accounts.',
      'Ongoing: approval before action — nothing goes live without approval, regardless of urgency.',
    ],
  },
];
