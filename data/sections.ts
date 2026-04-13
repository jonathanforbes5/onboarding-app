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
        question: 'Who founded ContractorsIgnite?',
        options: ['Jonathan and Cole', 'Mani and Oscar', 'Emmanuel and Mervin', 'Cole and Tyler'],
        correctIndex: 1,
        explanation: 'Mani and Oscar co-founded Contractors Ignite. They started at 15 years old helping their families by supporting local contractors — what began as a side project grew into a mission.',
      },
      {
        question: 'What is the current company revenue and the target?',
        options: ['$50K → $500K', '$200K–$300K/month → $1M/month by Q3', '$1M → $10M', '$500K → $2M'],
        correctIndex: 1,
        explanation: 'Current: $200K–$300K/month. Target: $1M/month by Q3 2026. The agency is in an aggressive scaling phase — your role as a pod manager is critical to hitting this number.',
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
        explanation: 'A client on Cycle 1 is worth $X. A client on Cycle 10 is worth 10X. Every cycle you retain = compounding revenue for the agency and compounding commission for you.',
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
        question: 'Which three niches does ContractorsIgnite serve?',
        options: ['Roofing, Flooring, HVAC', 'Roofing, HVAC, Gutters', 'Roofing, Plumbing, Electrical', 'HVAC, Gutters, Landscaping'],
        correctIndex: 1,
        explanation: 'Roofing (80–90% of revenue), HVAC, and Gutters. Roofing is the primary focus with the highest average ticket size ($8,000–$30,000). Gutters require 2–3× the leads vs roofing to be profitable.',
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
        explanation: 'Chuck-in-a-truck refers to a low-level contractor who underbids everyone and competes only on price. Not our ICP — we work with established businesses ($1M+ revenue, 3+ years in business).',
      },
      {
        question: 'Why is speed to lead CRITICAL for HVAC clients?',
        options: [
          'HVAC clients are more impatient',
          'HVAC ads cost more per click',
          'HVAC often involves emergencies — VA must respond within 5 minutes',
          'It\'s required by HVAC industry regulations',
        ],
        correctIndex: 2,
        explanation: 'HVAC often involves emergencies (broken AC in summer, no heat in winter). A 5-minute VA response is the standard. Speed to lead dramatically increases booking rates.',
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
        question: 'ContractorsIgnite operates on what billing model?',
        options: [
          'Monthly retainer regardless of results',
          'Performance-based 28-day cycles — client pays ONLY after targets are hit',
          'Weekly billing based on ad spend',
          'Annual subscription',
        ],
        correctIndex: 1,
        explanation: 'Performance-based 28-day cycles. The client pays only after appointment targets are hit (or 80% rule met). If targets are missed, we extend the cycle at no charge — maximum ~42 days.',
      },
      {
        question: 'A client is spending $100/day. Target is 15 booked appointments. What is the minimum to bill them?',
        options: ['15 (100% of target)', '12 (80% margin rule)', '10 (first-cycle grace)', '8 (reasonable effort)'],
        correctIndex: 1,
        explanation: '80% of 15 = 12 appointments. This is the minimum threshold to bill. If we hit 12 out of 15, the cycle is considered complete and the client pays the retainer.',
      },
      {
        question: 'What is the standard retainer structure today?',
        options: ['$2,500/cycle flat', '$3,500 + 5% ad spend', '~$4,000/cycle + 10% of ad spend', '$5,000 + 15% ad spend'],
        correctIndex: 2,
        explanation: '~$4,000/cycle + 10% of ad spend. The 10% scales with the client\'s ad spend — higher spend = more leads, more VA time, more management. It incentivizes us to scale clients aggressively.',
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
        question: 'What are the only allowed Meta ad placements?',
        options: [
          'All placements for maximum reach',
          'Facebook Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels (6 only)',
          'Facebook Feed and Stories only',
          '10 placements including Marketplace',
        ],
        correctIndex: 1,
        explanation: 'Only 6 approved placements: FB Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels. Never approve Marketplace, Messenger, Audience Network, or any other placement. Always verify Advantage+ is OFF after duplicating.',
      },
      {
        question: 'You should NEVER create a Facebook Business Manager for a client. Why?',
        options: [
          'It takes too long',
          'Creates legal liability — BMs must be owned by the client, not us',
          'Facebook doesn\'t allow it',
          'It costs money',
        ],
        correctIndex: 1,
        explanation: 'Facebook Business Managers must be owned by the client, not the agency. Creating one on their behalf creates legal and account ownership issues. Always have the client create their own BM and give you partner access.',
      },
      {
        question: 'What is the correct order of our lead generation funnel?',
        options: [
          'Landing Page → Meta Ads → CRM → VA → Appointment',
          'Meta Ads → Landing Page → Survey → CRM → VA → Appointment',
          'Survey → Meta Ads → Landing Page → VA → CRM → Appointment',
          'Meta Ads → CRM → Survey → VA → Landing Page → Appointment',
        ],
        correctIndex: 1,
        explanation: 'Meta Ads → Landing Page → Qualification Survey → GoHighLevel CRM → VA contacts within 5 min → Appointment booked in client\'s calendar. Every step is measurable and optimizable.',
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
        explanation: 'A-Tier ($2.5M+) and B-Tier ($1M–$2.5M) are our ICP. They have established businesses, growth mindsets, and the capacity to invest $3K+/month in ad spend. C and D-tier clients are reactive, emotional, and a poor fit for our model.',
      },
      {
        question: 'What ad budget should our ICP be willing to invest?',
        options: ['$500+/month', '$1,000+/month', '$3,000+/month', '$10,000+/month'],
        correctIndex: 2,
        explanation: '$3,000+/month in ad spend. Lower budgets don\'t generate enough lead volume for our model to perform. Higher spend = more leads, more VA activity, better pixel seasoning.',
      },
      {
        question: 'What is Mani\'s role?',
        options: ['CEO & Founder', 'Director of Operations', 'Director of Sales & Co-Founder', 'B2B Ads Manager'],
        correctIndex: 2,
        explanation: 'Mani is Director of Sales & Co-Founder. He manages the entire sales team: B2B ad manager, setters (who book calls), and closers (who convert calls to clients). New clients flow from Mani\'s team to your pod.',
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
        question: 'When should you handle A2P registration yourself?',
        options: [
          'When Emmanuel is busy',
          'When the account is under $100/day',
          'Never — always assign to Emmanuel via A2P Wizard',
          'Only on weekends',
        ],
        correctIndex: 2,
        explanation: 'A2P (10DLC) is a GHL phone registration process — NOT Meta. A rejected A2P application = 2–3 week wait before reapplying. Always task Emmanuel via ClickUp with the client name + GHL sub-account link + 48hr deadline.',
      },
      {
        question: 'After an onboarding call, what\'s the correct sequence within 1 hour?',
        options: [
          'Build the client\'s GHL sub-account yourself',
          'Paste Fathom transcript into Custom GPT → post to #post-onboarding-discussion → ClickUp task for Emmanuel → text client',
          'Call Jonathan to debrief',
          'Send a Loom of their ads',
        ],
        correctIndex: 1,
        explanation: 'The 4-step post-onboarding sequence: (1) Fathom transcript → Custom GPT for structured summary, (2) Post summary to #post-onboarding-discussion, (3) Create ClickUp task for Emmanuel with 48hr deadline, (4) Text client confirming next steps.',
      },
      {
        question: 'When should you initiate the renewal conversation?',
        options: [
          'Day of cycle end',
          'Only when client asks',
          '5–7 days before cycle end',
          'Immediately after launching',
        ],
        correctIndex: 2,
        explanation: 'Initiate renewal 5–7 days before cycle end. Never let a cycle expire without having confirmed the next one. Proactive renewals feel like a win; surprise renewals create friction. Also ask for testimonials and referrals.',
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
        question: 'What does Mervin do at ContractorsIgnite?',
        options: [
          'Manages VA teams alongside Leila',
          'Handles graphic design with Ken',
          'Full-cycle media buyer and setup support — similar role to Emmanuel',
          'Manages B2B ad campaigns',
        ],
        correctIndex: 2,
        explanation: 'Mervin is a full-cycle media buyer who supports Emmanuel on setups and ongoing media buying. Task him via ClickUp just as you would Emmanuel — include client name, GHL sub-account link, and 48hr deadline.',
      },
      {
        question: 'Leila\'s title is:',
        options: ['VA Team Lead', 'Head of VA Management', 'Operations Coordinator', 'VA Scheduler'],
        correctIndex: 1,
        explanation: 'Leila is Head of VA Management — the senior VA manager who leads all VAs across all pods. Aica supports her. Leila also controls Logbook access — always ask Leila, not Jonathan.',
      },
      {
        question: 'Ken is based in the Philippines. What is his expected turnaround time?',
        options: ['Same-day', '4 hours', '24 hours', '48 hours'],
        correctIndex: 2,
        explanation: '24-hour standard turnaround. Ken specializes in AI-generated creatives and Canva graphic design. Task via ClickUp with: brand info, target market, reference images, and due date. Plan ahead — never wait until something is urgent.',
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
        question: 'Layer 1 metrics are great for an account. Should you audit Meta KPIs?',
        options: [
          'Yes — weekly audit for all accounts',
          'No — if Layer 1 is healthy, check in monthly only',
          'Yes — creative fatigue builds invisibly',
          'Only if client asks',
        ],
        correctIndex: 1,
        explanation: 'If Layer 1 is healthy — you only need a monthly check-in on that account. Do not waste time digging into CTR and CPC when bookings are on track. Focus your diagnostic energy on red and orange accounts.',
      },
      {
        question: 'What are Layer 1 metrics?',
        options: [
          'CTR, CPC, and impression share',
          'Total Bookings, Target Achievement %, Cost Per Booked Appointment',
          'Facebook relevance score and engagement rate',
          'Landing page load time and bounce rate',
        ],
        correctIndex: 1,
        explanation: 'Layer 1 = business outcomes. Check these first: Total Booked Appointments, Target Achievement %, and Cost Per Booked Appointment. If these are good, stop here.',
      },
      {
        question: 'Layer 2 metrics include:',
        options: [
          'Cost Per Booked Appointment and total bookings',
          'Revenue per client and churn rate',
          'CTR, Cost Per Link Click (CPLC), and Survey Conversion Rate',
          'Show rate and client close rate',
        ],
        correctIndex: 2,
        explanation: 'Layer 2 = diagnostic metrics: CTR (target >0.8%), Cost Per Link Click (target <$6), Survey Conversion Rate (target >2.5%), VA Booking Rate (target >30%). Only pull these up when Layer 1 is failing.',
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
        question: 'You receive 5 accounts in the handoff. Which do you prioritize first?',
        options: [
          'Healthiest accounts first — protect the wins',
          'Launch-pending → underperforming → healthy (healthy = monthly check-in only)',
          'Highest ad spend first',
          'Alphabetical order',
        ],
        correctIndex: 1,
        explanation: 'Triage priority: Launch-pending accounts first (every day unlaunchedcosts cashflow), then underperforming/red accounts (they need immediate attention), then healthy accounts (monthly check-in only).',
      },
      {
        question: 'A client says their close rate on appointments is low. First step?',
        options: [
          'Pause the campaign immediately',
          'Call Mani to take over',
          'Request full CRM sales data — what happened to each appointment?',
          'Offer a discount on next cycle',
        ],
        correctIndex: 2,
        explanation: 'A low close rate is almost always a sales problem, not a media problem. Request full CRM data — what happened to each appointment? Were they no-shows, bad fits, or lost to competitors? Diagnose before prescribing.',
      },
      {
        question: 'After a successful cycle, what revenue activities should you always do?',
        options: [
          'Invoice and move on',
          'Request a video testimonial, ask for referrals, confirm cycle renewal proactively',
          'Wait for the client to bring up testimonials organically',
          'Offer a discount to lock in next cycle',
        ],
        correctIndex: 1,
        explanation: 'Every successful cycle is a revenue opportunity: request a written or video testimonial, ask if they know other contractors, propose higher ad spend if cost per booking is healthy, and confirm renewal 5–7 days before cycle end.',
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
        question: 'What must every Monday/Thursday status update include?',
        options: [
          'A quick "all accounts good" message',
          'Per account: name, cycle #, days elapsed, bookings vs target, health color, notes, and action steps WITH dates',
          'An email summary to Jonathan',
          'An auto-exported ClickUp report',
        ],
        correctIndex: 1,
        explanation: 'Every update must include, per account: client name, cycle #, days elapsed, bookings vs target, health color (🟢🟡🟠🔴), what\'s happening, and specific action steps with due dates. Never "accounts are doing well" without specifics.',
      },
      {
        question: 'Pod managers post updates Monday/Thursday. When are review calls?',
        options: [
          'Monday and Thursday',
          'Tuesday and Friday',
          'Wednesday and Saturday',
          'Every day at standup',
        ],
        correctIndex: 1,
        explanation: 'Updates post Mon/Thu → review calls happen Tue/Fri with Jonathan (and sometimes Oscar). Jonathan may send action items before the call based on what you post. Come prepared with action steps ready.',
      },
      {
        question: 'A client\'s ads have been paused 3 days due to billing failure. What do you do?',
        options: [
          'Send a Slack when convenient',
          'CALL the client immediately — every paused day = delayed cycle and cashflow',
          'Wait for them to notice',
          'Restart from a different ad account',
        ],
        correctIndex: 1,
        explanation: 'CALL the client the same day a billing failure occurs — phone call, not Slack. Every paused day delays the cycle, delays their cashflow, and delays your billing. This is one of the most impactful things you can do proactively.',
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
        question: 'Which tool is used for task management at ContractorsIgnite?',
        options: ['Notion', 'Monday.com', 'ClickUp', 'Trello'],
        correctIndex: 2,
        explanation: 'ClickUp is how ALL work gets assigned to specialists. Create tasks for Emmanuel (GHL setup, A2P), Mervin (overflow setup), Ken (creative assets). Always include: client details, GHL sub-account link, and a 48hr deadline label.',
      },
      {
        question: 'How do you get Logbook access?',
        options: ['Ask Jonathan', 'Request from Oscar', 'Request from Leila', 'Ask Emmanuel'],
        correctIndex: 2,
        explanation: 'Leila controls Logbook access — not Jonathan. The Logbook is the central truth for all lead data. Every lead from every account is documented by VAs with status and notes. Check it daily for open (white) leads.',
      },
      {
        question: 'Which tool is your PRIMARY communication hub?',
        options: ['ClickUp', 'Google Workspace', 'Slack', 'GoHighLevel'],
        correctIndex: 2,
        explanation: 'Slack is your primary hub for all internal communication. ClickUp is for task assignment. GHL is the CRM. Both Slack and ClickUp must be fluent by Day 1 — these two tools are how you run your pod.',
      },
    ],
  },
];

export const SECTION_SEARCH_INDEX = SECTIONS.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
}));
