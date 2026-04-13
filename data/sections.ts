export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SectionMeta {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  estimatedTime: string;
  icon: string;
  quiz: QuizQuestion[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: 1,
    slug: 'company-vision',
    title: 'Company Vision & Growth',
    subtitle: 'Our story, mission, and growth targets',
    estimatedTime: '8 min',
    icon: 'Rocket',
    quiz: [
      {
        question: 'Who co-founded Contractors Ignite?',
        options: ['Jonathan & Oscar', 'Mani & Oscar', 'Emmanuel & Mani', 'Kyle & Abdullah'],
        correctIndex: 1,
        explanation: 'Mani and Oscar founded Contractors Ignite when they were 15 years old, starting by helping local contractors.',
      },
      {
        question: 'What is the company\'s revenue target?',
        options: ['$500K/month', '$750K/month', '$1,000,000/month', '$2,000,000/month'],
        correctIndex: 2,
        explanation: 'The target is to grow from $200K/month to $1,000,000/month.',
      },
      {
        question: 'Why is retention more important than acquisition?',
        options: [
          'Acquisition is cheaper',
          'Every additional cycle compounds revenue — a client on Cycle 10 is worth 10x Cycle 1',
          'Retention is easier to measure',
          'Clients prefer longer contracts',
        ],
        correctIndex: 1,
        explanation: 'A client on Cycle 1 is worth $X. A client on Cycle 10 is worth 10X. Every cycle you retain compounds the agency\'s revenue.',
      },
    ],
  },
  {
    id: 2,
    slug: 'contractor-industry',
    title: 'The Contractor Industry',
    subtitle: 'Roofing, HVAC, Gutters — markets, psychology, and language',
    estimatedTime: '12 min',
    icon: 'Building2',
    quiz: [
      {
        question: 'What is the average roofing job value?',
        options: ['$1,000–$3,000', '$3,000–$5,000', '$8,000–$30,000', '$50,000+'],
        correctIndex: 2,
        explanation: 'Average roofing jobs range from $8,000 to $30,000, making them high-ticket, considered purchases.',
      },
      {
        question: 'What does "Chuck-in-a-truck" mean in industry slang?',
        options: [
          'A lead delivery vehicle',
          'A low-level contractor who competes solely on price — NOT our ICP',
          'A CRM term for unqualified leads',
          'A type of roofing material',
        ],
        correctIndex: 1,
        explanation: 'Chuck-in-a-truck refers to a low-level contractor who underbids everyone and competes only on price. They are not our ideal client profile.',
      },
      {
        question: 'Why is speed to lead CRITICAL for HVAC clients?',
        options: [
          'HVAC clients are more impatient',
          'HVAC ads cost more per click',
          'HVAC often involves emergencies — response within 5 minutes is the standard',
          'It\'s required by HVAC industry regulations',
        ],
        correctIndex: 2,
        explanation: 'HVAC often involves emergency situations (broken AC in summer, no heat in winter). A 5-minute response time is critical to convert leads before competitors do.',
      },
    ],
  },
  {
    id: 3,
    slug: 'business-model',
    title: 'Business Model & Offer',
    subtitle: 'How we price, deliver, and renew the 28-day cycle',
    estimatedTime: '10 min',
    icon: 'RefreshCw',
    quiz: [
      {
        question: 'How does the 28-day cycle payment model work?',
        options: [
          'Clients pay a flat monthly retainer regardless of results',
          'Clients pay only when targets (qualified booked appointments) are hit',
          'Clients pay per individual lead generated',
          'Clients pay 50% upfront and 50% on completion',
        ],
        correctIndex: 1,
        explanation: 'It\'s performance-based: hit the appointment booking target → bill and renew. Miss the target → optimize and extend.',
      },
      {
        question: 'What happens during the Winter Program (November–February)?',
        options: [
          'All services are paused completely',
          'We switch to a retainer model in maintenance mode',
          'We increase ad spend to compensate for slow season',
          'Clients receive a discount on their normal cycles',
        ],
        correctIndex: 1,
        explanation: 'Roofing is seasonal. During winter we run a retainer model in maintenance/relationship mode. See the Winter Retainer Plan SOP for full details.',
      },
      {
        question: 'What is the typical setup timeline for a new client?',
        options: ['Same day', '2–3 days', '5–10 business days', '30 days'],
        correctIndex: 2,
        explanation: 'Emmanuel builds all infrastructure in 5–10 business days: landing pages, surveys, GoHighLevel CRM, Meta ads, A2P registration, and VA team assignment. Every day of delay = delayed cashflow.',
      },
    ],
  },
  {
    id: 4,
    slug: 'how-we-generate-results',
    title: 'How We Generate Results',
    subtitle: 'The full funnel from Meta Ads to booked appointment',
    estimatedTime: '10 min',
    icon: 'TrendingUp',
    quiz: [
      {
        question: 'What is the correct order of our lead generation funnel?',
        options: [
          'Landing Page → Meta Ads → CRM → VA → Appointment',
          'Meta Ads → Landing Page → Survey → CRM → VA → Appointment',
          'Survey → Meta Ads → Landing Page → VA → CRM → Appointment',
          'Meta Ads → CRM → Survey → VA → Landing Page → Appointment',
        ],
        correctIndex: 1,
        explanation: 'Meta Ads drive traffic → Landing Page captures interest → Qualification Survey filters quality → GoHighLevel CRM centralizes leads → VA contacts within 5 min → Appointment booked.',
      },
      {
        question: 'Which factors drive 80% of ad results?',
        options: [
          'Budget, schedule, and account age',
          'Creative, Offer, and Targeting',
          'Landing page speed, pixel, and audience size',
          'Ad copy, bid strategy, and dayparting',
        ],
        correctIndex: 1,
        explanation: 'The 80/20 of performance: Creative (ad image/video/copy), Offer (what you\'re promising), and Targeting (who sees the ad) drive the vast majority of results.',
      },
      {
        question: 'What is the VA\'s speed-to-lead target?',
        options: ['Within 30 minutes', 'Within 1 hour', 'Within 5 minutes', 'Same business day'],
        correctIndex: 2,
        explanation: 'VA contact within 5 minutes of a lead coming in is the standard. Speed to lead dramatically increases booking rates.',
      },
    ],
  },
  {
    id: 5,
    slug: 'sales-process',
    title: 'Sales Process & ICP',
    subtitle: 'Client tiers, ideal client profile, and who we target',
    estimatedTime: '8 min',
    icon: 'Users',
    quiz: [
      {
        question: 'Which contractor tier is our ideal client profile (ICP)?',
        options: ['D-Tier ($0–$500K)', 'C-Tier ($500K–$1M)', 'A & B-Tier ($1M+)', 'Any contractor willing to pay'],
        correctIndex: 2,
        explanation: 'A-Tier ($2.5M+) and B-Tier ($1M–$2.5M) are our ICP. They have established businesses, growth mindsets, and the capacity to handle increased lead volume.',
      },
      {
        question: 'What ad budget should our ICP be willing to invest?',
        options: ['$500+/month', '$1,000+/month', '$3,000+/month', '$10,000+/month'],
        correctIndex: 2,
        explanation: 'Our ICP should be willing to invest $3,000+/month in ad spend. Lower budgets don\'t generate the volume needed for our model to perform.',
      },
      {
        question: 'Who manages the sales team at Contractors Ignite?',
        options: ['Oscar', 'Jonathan', 'Mani', 'Emmanuel'],
        correctIndex: 2,
        explanation: 'Mani is the Director of Sales and manages both setters (who book calls) and closers (who convert calls to clients).',
      },
    ],
  },
  {
    id: 6,
    slug: 'service-delivery',
    title: 'Service Delivery Flow',
    subtitle: 'Phase-by-phase client journey from close to renewal',
    estimatedTime: '12 min',
    icon: 'Workflow',
    quiz: [
      {
        question: 'What is your primary goal during the Phase 4 Onboarding Call?',
        options: [
          'Sell the client on upgrading their package',
          'Build landing pages and set up the CRM',
          'Understand their business, gather assets, set expectations — then post Fathom summary to Slack and task Emmanuel in ClickUp within 1 hour',
          'Introduce them to the VA team',
        ],
        correctIndex: 2,
        explanation: 'The onboarding call is YOUR call. Within 1 hour of finishing: paste Fathom transcript into Custom GPT → post summary to #post-onboarding-discussion → create ClickUp task for Emmanuel → text the client confirming next steps.',
      },
      {
        question: 'Who handles the technical service delivery setup?',
        options: ['You (the Pod Manager)', 'Emmanuel', 'The VA team', 'Ken'],
        correctIndex: 1,
        explanation: 'Emmanuel handles the technical setup: GoHighLevel, landing pages, surveys, Meta ads structure, and VA coordination. You coordinate, not execute.',
      },
      {
        question: 'What must you verify before billing at cycle completion?',
        options: [
          'That the client is happy with all ads',
          'That the landing page is still live',
          'That the target was hit (or the 80% margin rule was met)',
          'That the client has renewed their contract',
        ],
        correctIndex: 2,
        explanation: 'Before billing, verify the appointment target was hit — or that the 80% margin rule was met. Then celebrate wins, address concerns, secure renewal, and request referrals.',
      },
    ],
  },
  {
    id: 7,
    slug: 'org-structure',
    title: 'Organizational Structure',
    subtitle: 'Team hierarchy, pods, and your role as quarterback',
    estimatedTime: '10 min',
    icon: 'Network',
    quiz: [
      {
        question: 'How many clients does each pod manage?',
        options: ['5–10 clients', '10–20 clients', '25–30 clients', '50–60 clients'],
        correctIndex: 2,
        explanation: 'Each Pod Manager runs a pod of 25–30 clients. You own all client relationships and coordinate specialists to deliver results.',
      },
      {
        question: 'Who is your direct manager?',
        options: ['Oscar (CEO)', 'Mani (Director of Sales)', 'Jonathan (Director of Operations)', 'Emmanuel (Digital Marketer)'],
        correctIndex: 2,
        explanation: 'Jonathan is the Director of Operations and your direct manager. You report to him in weekly review calls and for operational decisions.',
      },
      {
        question: 'Which of these is NOT your responsibility as a Pod Manager?',
        options: [
          'Owning client communication',
          'Building landing pages and running Meta ads yourself',
          'Diagnosing KPI problems',
          'Coordinating with Emmanuel and the VA team',
        ],
        correctIndex: 1,
        explanation: 'You are a quarterback, not a task executor. You do NOT build landing pages or run ads — Emmanuel does. You coordinate specialists and own the client relationship.',
      },
    ],
  },
  {
    id: 8,
    slug: 'metrics-hierarchy',
    title: 'Layer 1 vs Layer 2 Metrics',
    subtitle: 'What to watch first and when to dig deeper',
    estimatedTime: '8 min',
    icon: 'BarChart3',
    quiz: [
      {
        question: 'What are Layer 1 metrics?',
        options: [
          'CTR, CPC, and impression share',
          'Overall Bookings, Target Achievement, Cost Per Booked Appointment',
          'Facebook relevance score and engagement rate',
          'Landing page load time and bounce rate',
        ],
        correctIndex: 1,
        explanation: 'Layer 1 = business outcomes: Overall Bookings, Target Achievement, Cost Per Booked Appointment, and Quantity of Booked Appointments. These are what you check first.',
      },
      {
        question: 'When should you look at Layer 2 metrics?',
        options: [
          'Every day regardless of Layer 1 performance',
          'Only on Mondays and Thursdays',
          'Only when Layer 1 metrics are performing poorly',
          'Only during weekly review calls with Jonathan',
        ],
        correctIndex: 2,
        explanation: 'If Layer 1 looks good — keep going. If Layer 1 is poor, then dig into Layer 2 (CTR, CPLC, conversion rates) to diagnose the root cause.',
      },
      {
        question: 'Layer 2 metrics include:',
        options: [
          'Cost Per Booked Appointment and total bookings',
          'Revenue per client and churn rate',
          'CTR, Cost Per Link Click, and Lead Conversion Rate',
          'Show rate and client close rate',
        ],
        correctIndex: 2,
        explanation: 'Layer 2 = campaign-level diagnostics: Click-Through Rate (CTR), Cost Per Link Click (CPLC), Lead Conversion Rate, and other campaign KPIs. Use these to fix Layer 1 problems.',
      },
    ],
  },
  {
    id: 9,
    slug: 'kpi-playbook',
    title: 'KPI Diagnosis Playbook',
    subtitle: 'Diagnose performance problems like a doctor',
    estimatedTime: '12 min',
    icon: 'Stethoscope',
    quiz: [
      {
        question: 'If leads come in but don\'t book, what is the most likely root cause?',
        options: [
          'Ad creative fatigue',
          'VA performance issues or call script problems',
          'Pixel not seasoned',
          'Landing page load time',
        ],
        correctIndex: 1,
        explanation: 'Low booking rate usually points to VA performance or script issues. Coordinate with Leila/Aica (VA managers) — flag specific lead examples, request call recording review, and ask for script retraining.',
      },
      {
        question: 'When you have high Cost Per Lead, who do you coordinate with?',
        options: [
          'Leila/Aica for VA script updates',
          'Jonathan for budget approval',
          'Ken (creative) and Emmanuel/Mervin (campaigns)',
          'The client directly',
        ],
        correctIndex: 2,
        explanation: 'High CPL = likely creative fatigue or targeting issues. Task Ken via ClickUp for new AI creatives and task Emmanuel/Mervin for campaign and targeting adjustments.',
      },
      {
        question: 'What does "pixel seasoning" fix?',
        options: [
          'Low show rates for appointments',
          'Low quality leads due to broad targeting and unseasoned pixel data',
          'VA response time issues',
          'Landing page conversion problems',
        ],
        correctIndex: 1,
        explanation: 'Pixel seasoning allows the Meta algorithm to learn which users convert. New pixels need ~50 quality events before optimizing well. Unseasoned pixels often produce broad, low-quality traffic.',
      },
    ],
  },
  {
    id: 10,
    slug: 'culture-performance',
    title: 'Culture & Performance',
    subtitle: 'Operating rhythm, A-player standards, and radical ownership',
    estimatedTime: '8 min',
    icon: 'Zap',
    quiz: [
      {
        question: 'When do you post KPI updates in Slack?',
        options: [
          'Every day',
          'Monday & Thursday',
          'Tuesday & Friday',
          'Only when there are problems',
        ],
        correctIndex: 1,
        explanation: 'Post KPI updates for your pod in Slack every Monday and Thursday — clear, concise, and data-driven. Celebrate wins and flag problems.',
      },
      {
        question: 'What is the expected Slack response time during business hours?',
        options: ['Immediately (under 1 minute)', '5–30 minutes', '1–2 hours', 'By end of day'],
        correctIndex: 1,
        explanation: 'Active responsiveness during business hours means responding within 5–30 minutes in Slack. This is a high-performance environment with high communication standards.',
      },
      {
        question: 'Which of these describes the A-player standard at Contractors Ignite?',
        options: [
          'Show up, do the minimum, avoid conflict',
          'Extreme ownership, proactive, solutions-oriented, fast learner, coachable',
          'Focus only on your assigned tasks, escalate everything else',
          'Wait for instructions before taking any action',
        ],
        correctIndex: 1,
        explanation: 'A-players demonstrate extreme ownership, are proactive (not reactive), solutions-oriented, fast learners, hold high standards for themselves and their team, and are coachable.',
      },
    ],
  },
  {
    id: 11,
    slug: 'tools-systems',
    title: 'Tools & Systems',
    subtitle: 'Your tech stack and proficiency timeline',
    estimatedTime: '10 min',
    icon: 'Settings',
    quiz: [
      {
        question: 'Which tool is your PRIMARY communication hub?',
        options: ['ClickUp', 'Google Workspace', 'Slack', 'GoHighLevel'],
        correctIndex: 2,
        explanation: 'Slack is your primary communication hub for all internal communication, client update channels, and team coordination. ClickUp is for task management and assigning work to specialists.',
      },
      {
        question: 'What is GoHighLevel used for?',
        options: [
          'Graphic design and creative production',
          'Video recording and transcription',
          'Central CRM hub: funnels, automations, workflows, pipelines, and appointment booking',
          'Domain purchasing and DNS management',
        ],
        correctIndex: 2,
        explanation: 'GoHighLevel is the central CRM hub: it manages client funnels, automations, workflows, pipelines, lead tracking, and calendar/appointment booking.',
      },
      {
        question: 'By Week 3, you must be able to:',
        options: [
          'Build complete GoHighLevel CRM setups from scratch',
          'Understand how all systems connect and work together',
          'Independently manage Meta ad campaigns',
          'Set up Zapier integrations and CAPI tracking',
        ],
        correctIndex: 1,
        explanation: 'The proficiency timeline: Day 1 = fluent in Slack & ClickUp. Week 1 = understand GoHighLevel navigation. Week 2 = read Meta Ads Manager data. Week 3+ = understand how Logbook → Dashboard → Command Center all connect.',
      },
    ],
  },
];

export const SECTION_SEARCH_INDEX = SECTIONS.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
}));
