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
        question: 'Who founded Roof Ignite and how old were they when they started?',
        options: ['Mani and Oscar, both 15', 'Jonathan and Cole, both 22', 'Emmanuel and Mervin, both 18', 'Oscar and Jonathan, both 20'],
        correctIndex: 0,
        explanation: 'Mani and Oscar co-founded Roof Ignite at 15 years old, starting out to help their families by supporting local contractors. That side project became the agency you are now part of.',
      },
      {
        question: 'What is the current monthly revenue and the target by end of summer 2026?',
        options: ['$50K → $500K/month', '$300K → $1M/month by end of summer 2026', '$1M → $5M/month', '$500K → $2M/month'],
        correctIndex: 1,
        explanation: 'Current: ~$300K/month. Target: $1M/month by end of summer 2026. The math: 5 pods × ~25 accounts × ~$4,500 average retainer. Your retention performance is the single biggest lever.',
      },
      {
        question: 'A client finishes Cycle 1 and gets 18 booked appointments. Cycle 2 launches. Which statement about retention is most accurate?',
        options: [
          'Each additional cycle compounds — a client on Cycle 10 is worth roughly 10× Cycle 1',
          'Cycle 2 is worth slightly more due to ad optimisation',
          'Client value stays flat after Cycle 3',
          'Retention only matters after Cycle 5',
        ],
        correctIndex: 0,
        explanation: 'Retention compounds. Client on Cycle 1 = $X. Client on Cycle 10 = ~10X. Acquiring a new client costs thousands in sales overhead. Retaining one costs time and care. Retention > Acquisition, always.',
      },
      {
        question: 'Which three contractor niches does Roof Ignite serve, and which is primary?',
        options: [
          'Plumbing, HVAC, Solar — Plumbing is primary',
          'HVAC, Electrical, Roofing — HVAC is primary',
          'Roofing, HVAC, Gutters — Roofing is primary (80–90% of revenue)',
          'Roofing, Landscaping, Gutters — Gutters is primary',
        ],
        correctIndex: 2,
        explanation: 'Roofing (80–90% of revenue), HVAC, and Gutters. Roofing has the highest average ticket ($8K–$25K), is seasonal, and insurance claims drive 40%+ of business. Gutters need 2–3× the lead volume vs roofing to be equally profitable.',
      },
      {
        question: 'The agency is in an "aggressive scaling phase." What does that mean for your role specifically?',
        options: [
          'You should focus on acquiring new clients yourself',
          'You should prioritise reporting over client communication',
          'Speed to launch matters less now that the team is larger',
          'Retention is your #1 job — every cycle you preserve drives the path to $1M/month',
        ],
        correctIndex: 3,
        explanation: 'In a scaling phase, every retained client is compounding revenue. Losing a client in Cycle 3 costs the agency far more than the one retainer — it costs the entire future cycle stack. Retention is the mission.',
      },
      {
        question: 'What does the 10% of ad spend component in the retainer structure incentivise?',
        options: [
          'Clients to spend less so the agency makes more margin',
          'The agency to scale clients aggressively — higher spend = more leads = higher fee',
          'Pod managers to run ads themselves',
          'Emmanuel and Mervin to set up accounts faster',
        ],
        correctIndex: 1,
        explanation: 'The 10% of ad spend aligns incentives: higher client spend = more leads generated = more VA work = more management. A client at $5K/month in ad spend pays $4,500 retainer ($4K + $500). We win when clients scale.',
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
        question: 'A roofing client says most of their jobs come from insurance claims. What does this tell you?',
        options: ['Bad fit — our ICP pays cash only', 'Normal — insurance drives 40%+ of roofing revenue, healthy business', 'They should not run Facebook ads', 'Their close rate will be low'],
        correctIndex: 1,
        explanation: 'Insurance claims (hail/wind) drive 40%+ of roofing revenue — this is normal. Our ads target homeowners who need roofing work, including both insurance and retail. Understanding this prevents misreading client context.',
      },
      {
        question: 'Why do gutter accounts need 2–3× more leads than roofing to be equally profitable?',
        options: ['Gutter jobs average $1K–$5K vs roofing $8K–$25K — lower ticket means more volume needed', 'Gutters have lower close rates', 'VA calling is less effective for gutters', 'Gutter clients are harder to reach'],
        correctIndex: 0,
        explanation: 'Gutters average $1K–$5K per job vs roofing $8K–$25K. To generate the same revenue you need 2–3× as many appointments. Set booking targets accordingly and evaluate performance with this in mind.',
      },
      {
        question: 'An HVAC lead\'s AC breaks at 9am. Your VA calls them at 9:45am. What likely happened?',
        options: ['Fine — 45 min is within standard', 'Lead still converts if price is right', 'Lead probably already booked with a competitor. Speed to lead < 5 min is critical for HVAC.', 'HVAC clients are patient — no urgency'],
        correctIndex: 2,
        explanation: 'HVAC emergencies = "I need this fixed today." A 45-minute response means they already called competitors. Speed to lead under 5 minutes is non-negotiable for HVAC — one of the biggest booking rate killers on these accounts.',
      },
      {
        question: 'What does "Chuck-in-a-truck" mean, and why is this NOT our ICP?',
        options: ['A lead delivery term', 'A low-overhead contractor who competes on price — no marketing budget, no growth mindset, bad fit', 'A roofing equipment brand', 'A type of van setup used by high-volume contractors'],
        correctIndex: 1,
        explanation: '"Chuck-in-a-truck" = a one-man or micro operation that undercuts everyone on price. Our ICP is $2.5M+ revenue, 3+ years operating, $3K+/month ad spend capacity. We serve established, growth-minded operators.',
      },
      {
        question: 'A client\'s Facebook ad targets homeowners in Florida in May. Should you expect seasonal performance issues?',
        options: ['Yes — roofing always slows in summer', 'Yes — all contractor niches slow in summer', 'No — Florida is a year-round roofing market', 'Only if they also serve HVAC'],
        correctIndex: 2,
        explanation: 'Roofing seasonality is geography-dependent. Florida = year-round market. Midwest/Northeast = Spring/Summer peak, Winter slowdown. Always factor in the client\'s market before attributing performance dips to seasonality.',
      },
      {
        question: 'What is the typical roofing sales cycle (lead to signed job)?',
        options: ['7–21 days', 'Same day', '60–90 days', '3–6 months'],
        correctIndex: 0,
        explanation: 'Roofing sales cycles run 7–21 days — it\'s a high-ticket considered purchase. Homeowners get multiple quotes, check reviews, discuss with spouses. This is why getting them on a calendar call fast matters more than trying to close on first contact.',
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
        question: 'Target is 20 booked appointments. Client has 15 on Day 28. Do you bill the retainer?',
        options: ['Yes — 15 is close enough', 'No — 80% of 20 = 16 minimum. 15 = 75%. Extend the cycle.', 'Yes — Day 28 ends the cycle regardless', 'No — only bill at 100% of target'],
        correctIndex: 1,
        explanation: '80% of 20 = 16 appointments is the minimum to bill. 15 is 75% — cycle extends at no charge until 16 are hit. The 80% rule protects the client relationship and ensures invoicing only when results are genuinely delivered.',
      },
      {
        question: 'A client spends $6,000/month on ads with a $4,000 base retainer. What is their total monthly payment?',
        options: ['$4,000', '$4,400', '$4,600', '$5,200'],
        correctIndex: 2,
        explanation: '$4,000 base + 10% of $6,000 ad spend = $4,000 + $600 = $4,600/month. The 10% scales with spend — higher ad spend = more leads = more work = higher fee. This aligns agency incentives with scaling clients.',
      },
      {
        question: 'What is the difference between CPL and Cost per Booking — and which matters most?',
        options: ['They are the same metric', 'CPL = spend ÷ form submissions; Cost per Booking = spend ÷ booked appointments. Cost per Booking matters.', 'CPL = spend ÷ bookings; Cost per Booking = spend ÷ leads', 'CPL is Layer 1; Cost per Booking is Layer 2'],
        correctIndex: 1,
        explanation: 'CPL = ad spend ÷ total form submissions. Cost per Booking = ad spend ÷ confirmed booked appointments. Example: $5K spend / 80 leads / 22 bookings → CPL = $62.50, Cost per Booking = $227.27. Always report Cost per Booking. CPL is a Layer 2 diagnostic only — Pod 1 confused these metrics for weeks.',
      },
      {
        question: 'What is the Speed to Cashflow target vs the company\'s current average?',
        options: ['Target: 90 days. Average: 60 days.', 'Target: 60 days or less. Average: 75–80 days.', 'Target: 28 days. Average: 45 days.', 'Target: 30 days. Average: 90 days.'],
        correctIndex: 1,
        explanation: 'Speed to Cashflow = days from signed contract to first payment. Target: 60 days. Company average: 75–80 days. Every day a client is not launched = delayed cashflow. This is why launch speed is treated as a core KPI.',
      },
      {
        question: 'An account has been running 42 days and is still short of the 80% billing threshold. What happens?',
        options: ['Bill pro-rated', 'Cancel and refund', 'Full escalation to Jonathan immediately — 42+ days triggers direct manager involvement', 'Auto-extend silently to 60 days'],
        correctIndex: 2,
        explanation: '42+ days without hitting billing threshold = full escalation to Jonathan. This is beyond the normal cycle window and requires senior strategy. Do not manage this alone.',
      },
      {
        question: 'When do you start the renewal conversation with a client?',
        options: ['The day the cycle ends', 'Only when the client asks', '5–7 days before cycle end — proactively, always', 'After the invoice is paid'],
        correctIndex: 2,
        explanation: 'Always initiate renewal 5–7 days before cycle end. Never let a cycle expire without the next one confirmed. Proactive renewals feel like a win; scrambling last-minute creates anxiety and churn risk.',
      },
      {
        question: 'You did a training account setup with Emmanuel. How many setups should you handle going forward?',
        options: ['All setups in your pod', '50% — split with Emmanuel and Mervin', 'Zero — task all setups to Emmanuel and Mervin via ClickUp from now on', 'First 5 then hand off'],
        correctIndex: 2,
        explanation: 'You do ONE training setup to understand the process. After that, Emmanuel and Mervin handle all setups. Your job is to task them via ClickUp with full client details + GHL sub-account link + 48hr deadline label.',
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
        question: 'What are the ONLY 6 approved Meta ad placements? Select the complete list.',
        options: [
          'FB Feed, IG Feed, Messenger, FB Stories, IG Stories, Marketplace',
          'FB Feed, IG Feed, FB Stories, IG Stories, FB Reels, IG Reels',
          'FB Feed, IG Feed, FB Reels, IG Reels, Audience Network, IG Explore',
          'All placements — Advantage+ selects the best automatically',
        ],
        correctIndex: 1,
        explanation: 'Exactly 6: Facebook Feed, Instagram Feed, Facebook Stories, Instagram Stories, Facebook Reels, Instagram Reels. Never Marketplace, Messenger, Audience Network, or IG Explore. Always select manually — never use Advantage+ Placements.',
      },
      {
        question: 'You duplicate a campaign in Meta. What must you immediately verify afterward?',
        options: [
          'That the budget doubled correctly',
          'That Advantage+ Placements and Advantage+ Audience are both still OFF',
          'That the campaign start date is correct',
          'That the pixel is still connected',
        ],
        correctIndex: 1,
        explanation: 'Meta can silently re-enable Advantage+ Placements and Advantage+ Audience when you duplicate. Always verify both are OFF after any duplication. Missing this expands your placements beyond the approved 6 and wastes spend.',
      },
      {
        question: 'All campaign names must include what specific string — and why?',
        options: [
          '"META" — for Meta billing tracking',
          '"RI" — for Roof Ignite internal tracking',
          '"B2C" — without it the campaign will not appear in the Account Master Dashboard',
          '"LEADS" — to match the campaign objective',
        ],
        correctIndex: 2,
        explanation: '"B2C" must be in every campaign name. The Account Master Dashboard filters for this string to surface the right campaigns. Missing it = the campaign becomes invisible in your dashboard. Verify after every setup or duplication.',
      },
      {
        question: 'A client has a Facebook page that is NOT inside a Business Manager. How do you get ad access?',
        options: [
          'Create a Business Manager for them and add the page',
          'Ask them to go to Page Settings → Page Access → add you individually with "Run Ads" permission (requires FB friend request first)',
          'Ask Emmanuel to create a BM and request access',
          'You cannot run ads without a BM — tell the client to create one first',
        ],
        correctIndex: 1,
        explanation: 'NEVER create a BM for a client — legal liability. If they have no BM: client goes to their Page Settings → Page Access → adds you as an individual with "Run Ads" permission. This requires a Facebook friend request first. Once accepted, you can run ads without a BM.',
      },
      {
        question: 'What is the correct full funnel sequence from start to booked appointment?',
        options: [
          'Landing Page → Meta Ads → CRM → VA → Appointment',
          'Meta Ads → Landing Page → Survey → GHL CRM → VA calls < 5 min → Appointment booked',
          'Survey → Meta Ads → VA → Landing Page → CRM → Appointment',
          'Meta Ads → CRM → Survey → Appointment → VA confirmation',
        ],
        correctIndex: 1,
        explanation: 'Meta Ads → Landing Page → Qualification Survey → GoHighLevel CRM → VA contacts within 5 minutes → Appointment booked in client\'s calendar. Every step is measurable. Speed from lead submission to VA call is the biggest booking rate lever.',
      },
      {
        question: 'What is the survey conversion rate benchmark — and what does a low rate indicate?',
        options: [
          'Target > 5%. Low rate = bad targeting.',
          'Target > 1%. Any rate above 1% is acceptable.',
          'Target > 10%. Low rate = ads are reaching the wrong audience.',
          'Target > 2.5%. Low rate = survey has too much friction, too many questions, or a mismatch with the ad promise.',
        ],
        correctIndex: 3,
        explanation: 'Survey conversion rate benchmark: > 2.5%. Low rate = too much friction (too many questions, hard to complete on mobile) or the survey promise doesn\'t match the ad (e.g. ad says free estimate but survey asks for credit check). Shorten and simplify when below 1.5%.',
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
        question: 'What are the minimum ICP requirements for a Roof Ignite client?',
        options: [
          'Any contractor with a Facebook page and $500/month budget',
          '$2.5M+ annual revenue, 3+ years in business, $3K+/month ad spend capacity, growth mindset',
          '$1M revenue, 1 year in business, willing to run ads',
          '$500K+ revenue, established business, any ad budget',
        ],
        correctIndex: 1,
        explanation: 'ICP: $2.5M+ annual revenue, 3+ years in business, $3K+/month ad spend capacity, growth-oriented mindset. Lower-tier clients are reactive, emotional, and bad fits. They churn, complain, and drain pod manager energy without generating sustainable revenue.',
      },
      {
        question: 'A prospective client is spending $800/month on ads and wants to sign with Roof Ignite. What is the problem?',
        options: [
          'Nothing — any ad spend is acceptable',
          'Too low — $3K+/month minimum ad spend is required for enough lead volume for our model to perform',
          'Fine — we can scale them from $800 to $3K over time',
          'The issue is their retainer size, not ad spend',
        ],
        correctIndex: 1,
        explanation: '$3K+/month in ad spend is the ICP minimum. Lower budgets don\'t generate enough lead volume for our model to perform and the 28-day cycle to close efficiently. Under-budget clients drag out cycles, miss targets, and create frustration on both sides.',
      },
      {
        question: 'A client is threatening to cancel because results in Week 2 are below expectations. Who do you call in?',
        options: [
          'Mani — he handles all client escalations',
          'Jonathan first. If the client is still threatening to leave after Jonathan\'s involvement, loop in Oscar — he plays the CEO card.',
          'Emmanuel — he handles client-facing conversations',
          'Nobody — handle it yourself and offer a discount',
        ],
        correctIndex: 1,
        explanation: 'Escalation path: Jonathan first (your direct manager for all escalations). If the client is threatening to leave and Jonathan\'s involvement isn\'t enough, loop in Oscar — he plays the "CEO card" and is highly effective at retention conversations for high-stakes situations.',
      },
      {
        question: 'Mani\'s role at Roof Ignite is:',
        options: [
          'CEO & Co-Founder — runs overall company strategy',
          'Co-Founder / Head of Hiring & Screening — also manages sales team and was original salesperson',
          'Director of Operations — your direct manager',
          'Head of Media Buying — runs all ad accounts',
        ],
        correctIndex: 1,
        explanation: 'Mani is Co-Founder and Head of Hiring & Screening. He also manages the sales function and was the original salesperson. Important: always spell "Mani" — never "Manny." New clients flow from Mani\'s sales team into your pod.',
      },
      {
        question: 'Which tier describes a client with $1.5M annual revenue, 4 years in business, and $4K/month ad spend?',
        options: [
          'D-Tier — below our minimum revenue threshold',
          'C-Tier — borderline fit, proceed with caution',
          'B-Tier — solid ICP, good fit for our model',
          'A-Tier — enterprise level, needs custom pricing',
        ],
        correctIndex: 2,
        explanation: 'B-Tier = $1M–$2.5M revenue. This client has 4 years of operation, meets the ad spend threshold, and is within the ICP range. B-Tier clients are good fits. A-Tier ($2.5M+) is ideal. C-Tier and below = high risk of churn and poor campaign performance.',
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
        question: 'An onboarding call just ended. What are the 4 required steps within the next hour?',
        options: [
          'Call Jonathan → Email client → Build GHL sub-account → Post on Slack',
          'Build GHL sub-account → Create ClickUp task → Post on Slack → Email client',
          'Paste Fathom transcript into Custom GPT → post summary to #post-onboarding-discussion → ClickUp task for Emmanuel and Mervin → text client confirming next steps',
          'Email client → Call Emmanuel → Post on #internal-team → Wait for Jonathan to brief you',
        ],
        correctIndex: 2,
        explanation: 'Within 1 hour of every onboarding call: (1) Paste Fathom transcript into Custom GPT → structured summary. (2) Post summary to #post-onboarding-discussion. (3) ClickUp task for Emmanuel and Mervin with client name, GHL sub-account link, 48hr deadline. (4) Text client confirming their next steps.',
      },
      {
        question: 'A2P (10DLC) registration takes how long, and who handles it?',
        options: [
          '2–3 weeks for approval. Emmanuel handles it exclusively via GHL\'s A2P Wizard — never pod managers.',
          '24 hours. You handle it through Meta.',
          '48 hours. Emmanuel handles it if you\'re busy.',
          '1 week. Leila handles it through the VA portal.',
        ],
        correctIndex: 0,
        explanation: 'A2P / 10DLC = GHL phone registration (NOT Meta). Approval takes 2–3 weeks. A rejected application = another 2–3 weeks wait. This is why you always task Emmanuel immediately via ClickUp with the client name + GHL sub-account link. Never attempt A2P yourself.',
      },
      {
        question: 'A client\'s A2P is still pending after 2 weeks. Can VAs contact leads in the meantime?',
        options: [
          'No — all outreach is blocked until A2P is approved',
          'Only if the client approves it manually',
          'No — both calls and SMS are blocked during A2P review',
          'Yes — VAs can make outbound calls while A2P is pending. Only SMS/text is blocked.',
        ],
        correctIndex: 3,
        explanation: 'A2P only restricts SMS/text messaging — outbound phone calls are unaffected. VAs can and should continue calling leads while A2P is pending. Never pause outreach while waiting for approval. Leads go cold fast.',
      },
      {
        question: 'A brand new Facebook page just launched for a client. Can you run ads immediately?',
        options: [
          'Yes — launch ads the same day',
          'Yes, but only if the client has a Business Manager',
          'No — boost the page to 200+ followers before launching ads. New pages with < 100 followers have reduced ad delivery.',
          'Only if Emmanuel has completed the GHL setup first',
        ],
        correctIndex: 2,
        explanation: 'Brand new Facebook pages need to be boosted to 200+ followers before launching ads. Pages with very few followers have limited credibility and can affect ad delivery. This is part of the pre-launch checklist.',
      },
      {
        question: 'When should you call (not Slack) a client about a billing failure that paused their ads?',
        options: [
          'After 3 days of the ads being paused',
          'Same day — call immediately. Every paused day = delayed cycle, delayed cashflow.',
          'Only if Jonathan asks you to escalate',
          'Send Slack first, call only if no response in 24 hours',
        ],
        correctIndex: 1,
        explanation: 'Billing failures = CALL immediately, same day. Every paused day delays the cycle, delays billing, and delays cashflow for both the agency and client. This is one of the most impactful proactive actions you can take. Phone call, not Slack.',
      },
      {
        question: 'After a successful cycle, which THREE revenue actions should always happen?',
        options: [
          'Invoice → rest → prepare next cycle brief',
          'Request video testimonial + ask for referrals + confirm renewal proactively 5–7 days before cycle end',
          'Offer discount on next cycle + ask for testimonial + increase ad spend unilaterally',
          'Send a Loom recap + invoice + wait for client to confirm renewal',
        ],
        correctIndex: 1,
        explanation: 'After every successful cycle: (1) Request a written or video testimonial. (2) Ask if they know other contractors who could benefit. (3) Propose renewal (and higher ad spend if cost per booking is healthy). These three actions compound revenue — never skip them.',
      },
      {
        question: 'During the new onboarding process (refined in the April 30 team call), what is the goal for a new pod manager by Day 3?',
        options: [
          'Complete the entire GHL setup independently',
          'Run a client onboarding call independently, without hand-holding',
          'Post their first Monday/Thursday update',
          'Review all active accounts and set health colors',
        ],
        correctIndex: 1,
        explanation: 'Per the April 30 onboarding refinement with Jonathan, Cole, and Tyler: pod managers should be able to run a client onboarding call independently by Day 3. This is the primary performance milestone for the first week of onboarding.',
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
        question: 'You need Logbook access. Who do you ask?',
        options: ['Jonathan Forbes', 'Oscar Sey', 'Leila — she controls all Logbook access, not Jonathan', 'Emmanuel'],
        correctIndex: 2,
        explanation: 'Leila is Head of VA Management and controls Logbook access. Always ask Leila — not Jonathan. The Logbook is the central source of truth for all lead data across every account. Check it daily for open (white) leads.',
      },
      {
        question: 'What is Emmanuel\'s role, and what should you NEVER do with A2P?',
        options: [
          'Emmanuel handles media buying. A2P is handled by Leila.',
          'Emmanuel handles ALL account setups, A2P Wizard, GHL technical issues. You should NEVER handle A2P yourself — always task Emmanuel via ClickUp.',
          'Emmanuel is the lead VA manager. A2P is done by Mervin.',
          'Emmanuel handles creative assets. A2P is your responsibility for the first 5 accounts.',
        ],
        correctIndex: 1,
        explanation: 'Emmanuel handles ALL of: account setups, A2P Wizard (GHL), technical GHL issues, and landing pages. A2P (10DLC) must always go to Emmanuel — never attempt it yourself. A rejected A2P = 2–3 week delay. Always task via ClickUp with full client details.',
      },
      {
        question: 'Ken is your graphic designer. He\'s based in the Philippines. What is his standard turnaround and what must you include in his ClickUp task?',
        options: [
          '24 hours. Include: brand info, target market, reference images, and due date. Plan ahead — never wait until something is urgent.',
          '4 hours. Just describe what you need.',
          '48 hours. Include the client name only.',
          'Same day. Send via Slack DM.',
        ],
        correctIndex: 0,
        explanation: 'Ken\'s standard: 24-hour turnaround, Philippines timezone (UTC+8). Always include in ClickUp: brand info, target market, reference images, and a specific due date. Never wait until creative is urgent — Ken needs planning lead time due to the timezone gap.',
      },
      {
        question: 'Leila\'s correct name spelling and title are:',
        options: [
          '"Layla" — VA Team Lead',
          '"Leila" — Head of VA Management (never "Layla")',
          '"Leila" — VA Scheduler',
          '"Leyla" — Operations Coordinator',
        ],
        correctIndex: 1,
        explanation: 'Always "Leila" — never "Layla." She is Head of VA Management, the senior leader of all VAs across all pods. Aica works alongside her as VA Manager. Spelling names correctly matters — it\'s a sign of basic professionalism.',
      },
      {
        question: 'Mervin\'s role is:',
        options: [
          'Lead graphic designer alongside Ken',
          'Head of VA management alongside Leila',
          'Full-cycle media buyer and setup support — same tier as Emmanuel, task via ClickUp',
          'B2B ad manager who generates new client leads',
        ],
        correctIndex: 2,
        explanation: 'Mervin is a full-cycle media buyer who supports Emmanuel on setups and ongoing media buying when Emmanuel is at capacity. Task him exactly the same way as Emmanuel — via ClickUp with client name, GHL link, and 48hr deadline.',
      },
      {
        question: 'Mani is correctly spelled as:',
        options: ['"Manny"', '"Mani" — always, never "Manny"', '"Mahni"', '"Manny" is acceptable in informal settings'],
        correctIndex: 1,
        explanation: 'Always "Mani" — never "Manny." This applies in all written communication including Slack, ClickUp tasks, and reports. Getting team member names wrong is unprofessional and noticed.',
      },
      {
        question: 'What is Cole\'s current role at Roof Ignite?',
        options: [
          'Pod 2 Manager — most experienced pod manager',
          'He moved from pod management to an operational/systems role — ClickUp expert, Account Master Dashboard, Command Centre',
          'Full-cycle media buyer supporting Emmanuel',
          'Head of VA Management alongside Leila',
        ],
        correctIndex: 1,
        explanation: 'Cole transitioned from pod management (Pod 2) to an operational/systems role. He\'s the most experienced person on internal tooling — go to Cole for: ClickUp systems, Account Master Dashboard, Command Centre questions. Tyler is the most experienced active pod manager.',
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
        question: 'An account has 12 booked appointments against a target of 15, with 18 days elapsed in a 28-day cycle. Layer 1 looks good. Should you audit CTR and CPC?',
        options: [
          'Yes — always audit Layer 2 weekly for all accounts',
          'No — Layer 1 is healthy. Do not look at Layer 2. Monthly check-in only for this account.',
          'Yes — creative fatigue builds invisibly even when bookings are on track',
          'Only if the client asks about ad performance',
        ],
        correctIndex: 1,
        explanation: 'Core rule: if Layer 1 is healthy, do NOT look at Layer 2. With 25+ accounts you manage, your time is the bottleneck. Diagnosing Layer 2 when results are good wastes hours. Focus diagnostic energy exclusively on orange and red accounts.',
      },
      {
        question: 'Account health is 🔴 Red. What does this mean and what do you do immediately?',
        options: [
          'Red = 10–20% behind pace. Note it in your Monday update.',
          'Red = below 50% of target. Escalate to Oscar.',
          'Red = ads are paused. Restart the campaign.',
          'Red = 40%+ behind pace. Immediate action + escalate to Jonathan.',
        ],
        correctIndex: 3,
        explanation: 'Red = 40%+ behind booking pace. Immediate actions: update Command Centre, tag Leila to prioritise open leads, check Layer 2, escalate to Emmanuel/Ken for creative if needed, report at next review call, loop in Jonathan. Do not sit on red accounts.',
      },
      {
        question: 'An account has $5,000 in ad spend, 80 form submissions, and 22 booked appointments. What is the correct Cost per Booking?',
        options: ['$62.50 (spend ÷ form submissions)', '$227.27 (spend ÷ booked appointments)', '$100 (spend ÷ half the leads)', '$45.45 (spend ÷ total impressions)'],
        correctIndex: 1,
        explanation: '$5,000 ÷ 22 booked appointments = $227.27. This is the Cost per Booking. $5,000 ÷ 80 form submissions = $62.50, which is CPL (cost per lead) — a Layer 2 diagnostic metric only. Pod 1 reported CPL as cost per booking for weeks, which made performance look far better than reality.',
      },
      {
        question: 'What are the four account health colours and their approximate thresholds?',
        options: [
          'Blue/Green/Yellow/Red — based on client satisfaction',
          'Green (on track for 80%+ target), Yellow (10–20% behind), Orange (20–40% behind, VA escalation), Red (40%+ behind, immediate action)',
          'Green/Yellow/Red/Black — based on days since last contact',
          'Green/Amber/Red — based on ad spend efficiency',
        ],
        correctIndex: 1,
        explanation: '🟢 Green = on track for 80%+ by cycle end. 🟡 Yellow = 10–20% behind pace — monitor closely. 🟠 Orange = 20–40% behind — escalate VAs, review Layer 2. 🔴 Red = 40%+ behind — immediate action + Jonathan escalation. Know these thresholds cold.',
      },
      {
        question: 'Layer 2 shows CTR of 0.4% and CPC of $9. What does this most likely indicate?',
        options: [
          'The campaign is performing well — these are normal numbers',
          'Creative fatigue — CTR below 0.8% and CPC above $6 signals the creative is no longer resonating with the audience',
          'A targeting issue — increase audience size',
          'A pixel problem — CAPI is not configured',
        ],
        correctIndex: 1,
        explanation: 'CTR benchmark: > 0.8%. CPC benchmark: < $6. CTR of 0.4% and CPC of $9 = creative is not resonating — likely fatigue. Prescription: check frequency (> 2.5 = fatigue incoming), then follow the Post-Andromeda duplicate protocol before ordering a full creative refresh.',
      },
      {
        question: 'A campaign was just launched 5 days ago and the data looks terrible. What is the first thing to check?',
        options: [
          'Immediately task Ken for a creative refresh',
          'First 7–10 days of a new campaign = unreliable data. Do not make changes yet — wait for the data to stabilise.',
          'Check if A2P is pending',
          'Pause and relaunch with a different audience',
        ],
        correctIndex: 1,
        explanation: 'First 7–10 days of any new campaign = unreliable data. Meta\'s algorithm is still learning. Context check before any action: Was there a holiday? Is this a new account? Was there a creative refresh recently (needs 48–72 hours to stabilise)? Was there a billing failure? Check context before diagnosing.',
      },
      {
        question: 'What OSA rate benchmark should trigger a targeting review?',
        options: ['> 5%', '> 10%', '> 15–25% — flag as a targeting or creative issue', '> 50%'],
        correctIndex: 2,
        explanation: 'OSA (Out of Service Area) benchmark: < 15% is healthy. > 25% = flag immediately — likely a targeting issue (audience too broad, wrong geo) or creative is attracting the wrong market. Check targeting, exclude problem zip codes, review the Account Specific Document.',
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
        question: 'An account is at 40% of its booking target on Day 21. Layer 2 shows high CPL and declining CTR. What is the correct sequence?',
        options: [
          'Immediately order a full creative refresh from Ken',
          'Context check first (holiday? new campaign?) → check Layer 1 → try Post-Andromeda ad set duplicate → wait 48 hours → only then consider full creative refresh',
          'Pause the campaign and call Jonathan',
          'Increase ad budget to compensate for low CTR',
        ],
        correctIndex: 1,
        explanation: 'Always: (1) Context check — holiday, new campaign, billing failure? (2) Confirm Layer 1 is actually failing. (3) Try Post-Andromeda duplicate first (sort ads by reach, duplicate ad set, turn off top-reach ads, wait 48 hours — 50/50 shot). (4) Only if step 3 fails → full creative refresh (15 new ads, no reused photos).',
      },
      {
        question: 'The Post-Andromeda ad set duplicate protocol: what is the success rate, and what do you do if it fails?',
        options: [
          '90% success rate. If it fails, increase budget.',
          '50/50 shot. If it fails → full creative refresh: 15 all-new creatives (5 Singles + 5 Two-Folds + 5 Tri-Folds), no reused photos.',
          '75% success rate. If it fails, change the audience.',
          '100% success rate when done correctly.',
        ],
        correctIndex: 1,
        explanation: 'Post-Andromeda duplicate = 50/50 shot. If the duplicate restores performance → done. If it flops after 48 hours → full creative refresh: 15 all-new ads (5 Singles + 5 Two-Folds + 5 Tri-Folds), zero reused photos. Task Ken for AI images and Emmanuel/Bren for Canva creatives.',
      },
      {
        question: 'At what ad frequency level should you act immediately on creative fatigue?',
        options: ['> 2.5 = incoming warning; > 3.5 = act immediately', '> 1.5', '> 5.0', '> 4.0'],
        correctIndex: 0,
        explanation: 'Frequency > 2.5 = creative fatigue is incoming — monitor closely. Frequency > 3.5 = act immediately. At these levels the same audience is seeing the same creative too many times, CTR drops, CPC rises, and lead volume falls. Start the protocol.',
      },
      {
        question: 'When should you add pixel seasoning to a survey — and what is the risk of adding it too early?',
        options: [
          'Day 1 — more seasoning = better pixel from the start',
          'Only after 30–50 raw leads. Too early = not enough data for Meta to learn from, starves the pixel.',
          'After 100 leads. Before that, seasoning has no effect.',
          'Immediately if the client requests it.',
        ],
        correctIndex: 1,
        explanation: 'Pixel seasoning (survey filters that restrict which homeowners trigger a conversion event) should only be added after 30–50 raw leads. Adding it too early starves the pixel — Meta needs volume to learn. Let the pixel collect broad data first, then narrow it with seasoning.',
      },
      {
        question: 'A client claims their close rate on appointments is low. Your first step is:',
        options: [
          'Pause the campaign — the leads must be low quality',
          'Call Mani to take over the client',
          'Request full CRM sales data — what happened to each appointment? Only diagnose media after reviewing sales.',
          'Offer a discounted next cycle to retain the client',
        ],
        correctIndex: 2,
        explanation: 'Low close rate = almost always a sales problem, not a media problem. Request full CRM data first: were appointments no-shows, bad fits, or lost to competition? If the client goes quiet after you ask for data, they don\'t have data — which tells you something. Diagnose before prescribing.',
      },
      {
        question: 'A client\'s account has zero pixel conversion events in Meta Events Manager. What does this mean and what do you do?',
        options: [
          'Normal for new accounts — events take time to populate',
          'CAPI is not configured. Meta is spending blind. Task Emmanuel immediately to set up CAPI and backfill all existing Qualified leads.',
          'The campaign objective is wrong — change to Conversions',
          'The pixel ID is incorrect — recreate the pixel',
        ],
        correctIndex: 1,
        explanation: 'Zero conversion events = CAPI is not set up. Without CAPI, Meta does not know which leads became appointments and cannot optimise targeting. Task Emmanuel immediately: set up the Qualified tag → Schedule event automation in GHL, then retroactively apply the Qualified tag to all existing booked leads to backfill.',
      },
      {
        question: 'It\'s the week after Easter and an account\'s 7-day metrics look terrible — leads dropped to near zero from April 2–5. Since April 6, it\'s generating 3–4 leads/day. What do you do?',
        options: [
          'Immediately order a creative refresh — the data is clear',
          'No action needed — this is the holiday effect. Easter depressed leads for a few days. Current 3–4/day is strong. Context before action.',
          'Pause the campaign and re-evaluate targeting',
          'Escalate to Jonathan — 7-day data is concerning',
        ],
        correctIndex: 1,
        explanation: 'This is a direct lesson from a real Pod 1 review call. Holidays depress lead volume significantly for a few days. Always check context — was there a holiday in the last 7 days? The 7-day rolling average will be skewed. Look at post-holiday daily performance instead. 3–4 leads/day after Easter = strong.',
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
        question: 'What must every Monday/Thursday status update include for EACH account?',
        options: [
          'A quick summary — "all accounts looking good this week"',
          'Client name, cycle #, days elapsed, bookings vs target, health colour, what is happening, and specific action steps WITH due dates',
          'An auto-exported ClickUp report',
          'A Loom video walkthrough of each account',
        ],
        correctIndex: 1,
        explanation: 'Every update must include, per account: (1) Client name. (2) Cycle number. (3) Days elapsed. (4) Bookings vs target. (5) Health colour 🟢🟡🟠🔴. (6) What is happening. (7) Specific action steps with due dates. "Accounts are doing well" with no specifics is not an acceptable update.',
      },
      {
        question: 'Status updates are posted on which days, and review calls happen on which days?',
        options: [
          'Updates: Mon/Thu. Calls: Mon/Thu same day.',
          'Updates: Mon/Thu. Review calls: Tue/Fri with Jonathan (and sometimes Oscar).',
          'Updates: Tue/Fri. Review calls: Wed/Sat.',
          'Updates: daily. Review calls: weekly on Mondays.',
        ],
        correctIndex: 1,
        explanation: 'Updates post in #ops-manager-discussion on Monday and Thursday. Review calls happen on Tuesday and Friday with Jonathan — and sometimes Oscar joins. Jonathan may send action items before the call based on your update. Come prepared with solutions, not just problems.',
      },
      {
        question: 'What is the 24–48 hour rule?',
        options: [
          'If a client owes you something (info, access, approval), get an answer within 24–48 hours or escalate — no blocker sits unaddressed',
          'All ClickUp tasks must be completed within 48 hours',
          'New accounts must go live within 48 hours of signing',
          'Client calls must be returned within 24 hours always',
        ],
        correctIndex: 0,
        explanation: 'The 24–48 hour rule: if a client owes you something (Facebook access, billing fix, survey approval), you have 24–48 hours to get a response before escalating. No blocker sits unaddressed. This protects Speed to Cashflow and cycle timelines.',
      },
      {
        question: 'An account has been red for 3 days with no resolution in sight. What is the right action?',
        options: [
          'Continue working it — Jonathan will notice in the next review call',
          'Escalate to Jonathan immediately. Red for 3+ days without resolution = direct manager escalation, no exceptions.',
          'Message Oscar on Slack',
          'Offer the client a discount to buy more time',
        ],
        correctIndex: 1,
        explanation: 'Red for 3+ days without resolution = escalate to Jonathan immediately. This is explicitly defined in the escalation protocol. Do not manage red accounts alone for more than 3 days. Jonathan\'s job is to help — but you must escalate.',
      },
      {
        question: 'What does "radical ownership" mean at Roof Ignite?',
        options: [
          'You own the creative process — brief Ken yourself',
          'You own the billing process — chase invoices yourself',
          'You own the VA scheduling — coordinate with Leila daily',
          'You own every client relationship in your pod — their results, their problems, their renewal',
        ],
        correctIndex: 3,
        explanation: 'Radical ownership: you are the quarterback of your pod. Every client relationship, result, and problem is yours. You coordinate specialists (Emmanuel, Ken, Leila), but the outcome is always your responsibility. "I was waiting for Emmanuel" is not an excuse — follow up, escalate, own it.',
      },
      {
        question: 'A client sends a Slack at 8pm complaining about performance. What is the right approach?',
        options: [
          'Respond immediately with a fix — show urgency',
          'Acknowledge, gather data (check Command Centre + Logbook), respond with a specific action plan within business hours',
          'Ignore it until the next review call',
          'Forward to Jonathan immediately',
        ],
        correctIndex: 1,
        explanation: 'Acknowledge promptly. Then gather data before responding with substance — check Command Centre and Logbook before making promises. Respond with a specific action plan. Emotional or rushed responses without data damage credibility. Calm, specific, and data-driven = A-player communication.',
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
        question: 'You need to task Emmanuel for a new account setup. What MUST be included in the ClickUp task?',
        options: [
          'Just the client name',
          'Client name, GHL sub-account link, 48hr deadline label, and any specific notes (A2P if needed)',
          'Client name and phone number',
          'Client name and a Loom video walkthrough',
        ],
        correctIndex: 1,
        explanation: 'Every ClickUp task for Emmanuel must include: (1) Client name. (2) GHL sub-account link. (3) 48hr deadline label. (4) For A2P specifically: also include the client\'s business details. Missing information = delay. Be complete the first time.',
      },
      {
        question: 'How do you get Logbook access, and who controls it?',
        options: [
          'Ask Jonathan — he manages all tool access',
          'Ask Leila — she controls Logbook access across all pods',
          'Request access through GHL settings',
          'Logbook access is automatic on your start date',
        ],
        correctIndex: 1,
        explanation: 'Leila controls Logbook access — always ask Leila, not Jonathan. The Logbook is the central source of truth for all lead data. Every lead from every account is documented by VAs with status and notes. Review it daily for open (white) leads that need VA follow-up.',
      },
      {
        question: 'After an onboarding call, the Fathom transcript gets pasted into the Custom GPT. Where does the output go next?',
        options: [
          'Email it to Jonathan',
          'Save it to the client\'s GHL sub-account',
          'Post the structured summary to #post-onboarding-discussion on Slack',
          'Upload to the client\'s ClickUp folder',
        ],
        correctIndex: 2,
        explanation: 'Fathom transcript → Custom GPT → structured summary → post to #post-onboarding-discussion on Slack. This keeps Jonathan and the team immediately looped in after every new client call. Do this within 1 hour of every onboarding call, every time.',
      },
      {
        question: 'How do you verify that CAPI is working correctly for an account?',
        options: [
          'Check GHL reports for lead volume',
          'Check Meta Events Manager — look for "Schedule" events firing when VAs apply the Qualified tag in GHL',
          'Check the client\'s Facebook Page insights',
          'Ask Emmanuel to confirm via Slack',
        ],
        correctIndex: 1,
        explanation: 'Verify CAPI in Meta Events Manager: you should see "Schedule" events populating whenever VAs apply the "Qualified" tag in GHL. If the events are zero or missing → task Emmanuel immediately. CAPI is how Meta learns which leads become booked appointments.',
      },
      {
        question: 'You need Ken to create AI-generated ad creatives for a roofing client. What must you include in the ClickUp task?',
        options: [
          'Just "roofing ad creatives please"',
          'Client name and which type of ad (Single, Trifold)',
          'A Loom video briefing',
          'Brand info, target market description, reference images, and a specific due date — plan ahead, Ken is in Philippines timezone',
        ],
        correctIndex: 3,
        explanation: 'Every Ken task must include: (1) Brand info (colors, fonts, logo). (2) Target market description. (3) Reference images (from previous winning creatives or client photos). (4) Specific due date. Ken is in the Philippines (UTC+8) with a 24-hour turnaround — plan ahead. Never make a request urgent.',
      },
      {
        question: 'Which Slack channel gets your Monday/Thursday account status updates?',
        options: ['#internal-team', '#ops-manager-discussion', '#post-onboarding-discussion', '#closer-call-recordings'],
        correctIndex: 1,
        explanation: '#ops-manager-discussion is where all pod manager Monday/Thursday status updates are posted. #internal-team is for good morning/good night messages, team-wide notices, and VA task assignments. Know which channel does what — posting in the wrong channel buries important information.',
      },
      {
        question: 'What is the Ad Set Reviewer tool used for, and where is it accessed?',
        options: [
          'A GHL tool for reviewing VA call recordings',
          'A QA tool at ad-set-reviewer.vercel.app — review creative sets against the 6-placement rule, creative standards, and ad quality before launch',
          'A Meta tool for reviewing ad performance after launch',
          'A ClickUp template for briefing Emmanuel',
        ],
        correctIndex: 1,
        explanation: 'Ad Set Reviewer (ad-set-reviewer.vercel.app) is used to QA creative sets before launch. As pod manager, you are approving setups — know these standards. Check: 6 placements only, 15 ads minimum, no reused photos, B2C in campaign name, Advantage+ OFF.',
      },
    ],
  },
];

export const SECTION_SEARCH_INDEX = SECTIONS.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
}));
