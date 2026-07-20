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
    title: 'Business Model & Context',
    subtitle: 'Understand how RoofIgnite operates before touching an account.',
    estimatedTime: '45 min',
    color: '#F5C800',
    icon: '🏗️',
    objective: 'Understand cycles, cost targets, escalation, and the new department structure so every decision you make has context behind it.',
    sections: [
      {
        heading: 'How RoofIgnite Works',
        items: [
          'RoofIgnite is a done-for-you lead generation agency serving roofing contractors across the US.',
          'Our model: we run Meta ads and operate GHL (GoHighLevel) to generate inbound leads and book appointments for our clients.',
          'Revenue is tied to performance — clients stay when leads and appointments are coming in at scalable cost.',
          'The team is now structured into departments: Sales/CSM, Media Buying, Creative, Tech/Automations, and VA/Call Center.',
        ],
      },
      {
        heading: 'Cycles & Cycle Dates',
        items: [
          'A cycle is the defined period during which performance is measured — starts on a specific date, ends on another.',
          'Every account has cycle dates. These set the frame for every KPI conversation.',
          'Your job during a cycle: generate leads and booked appointments at scalable cost, on the right spend trajectory.',
          'Mid-cycle check-ins happen to catch problems early — not at the end when it\'s too late to fix.',
        ],
        callout: {
          type: 'rule',
          text: 'Always know the current cycle dates for every account you manage. If you don\'t know them, find them — do not guess.',
        },
      },
      {
        heading: 'Ad Spend & Targets',
        items: [
          'Each account has a minimum ad spend and a target spend for the cycle.',
          'Spend too low and you don\'t generate enough data or volume. Overpace early and you run out of budget before the cycle ends.',
          'You are responsible for keeping spend on pace — not over, not significantly under.',
          'Flag pacing issues early. A pacing problem on Day 3 is fixable. On Day 20, it usually isn\'t.',
        ],
      },
      {
        heading: 'What "Scalable Cost" Means',
        items: [
          'Scalable CPL: the cost per lead that allows the client to profit after factoring in close rate, average deal value, and cost per booked appointment.',
          'There is no universal "good CPL" — it depends on the market, the client\'s ticket size, and their close rate.',
          'Scalable cost per booked appointment: what a booked appointment can cost before the math breaks down for the client.',
          'Your job is to keep costs inside the scalable range — not just to get cheap leads, but to get profitable ones.',
        ],
        callout: {
          type: 'tip',
          text: 'A $15 CPL is not "good" if leads don\'t book. A $40 CPL can be excellent if the close rate and deal size are right. Optimize for the full funnel, not just lead cost.',
        },
      },
      {
        heading: 'New Department Structure',
        items: [
          'Pod model is retired. We now operate in specialized departments.',
          'Media Buying: you own ad performance on your accounts — strategy, execution, creative direction.',
          'Sales/CSM: they own the client relationship. All client communication goes through them. Not you.',
          'Creative Department: produces ad assets based on your direction and performance data.',
          'VA/Call Center: calls leads and books appointments. You coordinate with them on lead quality and follow-up.',
          'Tech/Automations: GHL setup, integrations, technical issues. Escalate tech blockers here.',
        ],
      },
      {
        heading: 'Escalation Protocol',
        items: [
          '1. Check this portal and the SOPs first — 80% of answers are already here.',
          '2. Ask Claude (the AI assistant in the portal) for fast lookups.',
          '3. Ask a peer media buyer — they\'ve likely hit the same issue.',
          '4. Escalate to Jon or Oscar — come with context, not just a question.',
        ],
        callout: {
          type: 'warning',
          text: 'Never escalate to leadership without first attempting steps 1–3. Always bring the problem, what you\'ve already tried, and your best guess at the fix.',
        },
      },
    ],
    keyTakeaways: [
      'Know your cycle dates for every account — they frame every performance conversation.',
      'Scalable cost is about the full funnel, not just CPL.',
      'You own ad performance. Sales/CSM owns the client. These lines do not cross.',
      'Escalate in order: portal → Claude → peer → leadership.',
      'The new department model means you own the outcome, not just the task.',
    ],
    quiz: [
      {
        question: 'What is a "cycle" at RoofIgnite?',
        options: [
          'A one-month client contract',
          'A defined period during which ad spend, leads, and booked appointments are tracked and reviewed',
          'A weekly meeting cadence',
          'The time between creative refreshes',
        ],
        correctIndex: 1,
        explanation: 'Cycles are the core unit of performance measurement at RoofIgnite. Each cycle has defined start/end dates and targets for spend, leads, and booked appointments.',
      },
      {
        question: 'When a media buyer says "scalable cost," what does that mean?',
        options: [
          'The cheapest possible cost per lead',
          'A CPL that allows the client to profit after accounting for close rate and deal value',
          'A cost below $20 per lead regardless of account',
          'Any cost the client approves',
        ],
        correctIndex: 1,
        explanation: 'Scalable cost means the economics work — the client\'s revenue per closed job covers the cost of generating the lead and appointment, with margin remaining. It varies by market and client.',
      },
      {
        question: 'What is the correct escalation order when you hit a blocker?',
        options: [
          'Immediately message Jon or Oscar',
          'DM the client for clarification',
          'Check the portal → ask Claude → ask peers → escalate to leadership',
          'Post in #internal-team and wait for a response',
        ],
        correctIndex: 2,
        explanation: 'Always try to resolve issues yourself using available resources first, then peer support, before escalating to leadership. Come with context when you do escalate.',
      },
      {
        question: 'Under the new department structure, which of the following does NOT belong to a media buyer?',
        options: [
          'Campaign strategy and budget decisions',
          'Creative direction and requesting assets',
          'Communicating directly with clients about account performance',
          'Monitoring KPIs and diagnosing underperformers',
        ],
        correctIndex: 2,
        explanation: 'Media buyers have zero client-facing responsibilities. All client communication goes through Sales/CSM. This is a hard line.',
      },
      {
        question: 'What does the hybrid setup model mean for assigned media buyers?',
        options: [
          'One MB handles all accounts from setup to ongoing management',
          'A manual MB handles initial setups; the assigned MB takes over ongoing management once the account is live',
          'Two media buyers share equal responsibility for each account',
          'Media buyers set up accounts but delegate ongoing management to VAs',
        ],
        correctIndex: 1,
        explanation: 'The manual buyer handles the initial setup phase; the assigned buyer inherits the account for ongoing management. The exact handoff point is still being defined.',
      },
    ],
  },
  {
    id: 2,
    title: 'Auditing an Account',
    subtitle: 'Know how to read an account and tell the difference between healthy and broken.',
    estimatedTime: '40 min',
    color: '#4A90D9',
    icon: '🔍',
    objective: 'Learn how to audit leads end-to-end, read the log book correctly, and identify what healthy vs. at-risk accounts actually look like.',
    sections: [
      {
        heading: 'Why Auditing Matters',
        items: [
          'Auditing is not optional — it is the core of account ownership.',
          'You cannot fix what you don\'t understand. Auditing is how you get understanding.',
          'A media buyer who reacts to problems is reactive. One who audits proactively catches problems before they cost the client real money.',
          'Audit cadence: every account you own should be reviewed at minimum weekly, with priority accounts reviewed more frequently.',
        ],
      },
      {
        heading: 'Auditing Leads',
        items: [
          'For each lead: was it called? When? Did it answer? Was it pitched? Did it book or not? If not, why?',
          'Look for leads that went uncalled for more than 24 hours — this is a critical signal.',
          'Look for leads that were called but never reached — this may indicate bad contact info, wrong targeting area, or a bad number.',
          'Look for leads that were reached but didn\'t book — this is a conversion/pitch issue, not an ad issue.',
          'The distinction matters: you can\'t solve a booking problem by changing ads.',
        ],
        callout: {
          type: 'rule',
          text: 'Lead audit rule: always trace each lead to its final outcome before changing anything in the ad account. Diagnosis first, action second.',
        },
      },
      {
        heading: 'Auditing the Log Book',
        items: [
          'The log book is the operational record for each account — what changed, why, and what happened next.',
          'Before making any changes to an account, read the log book. Don\'t repeat what didn\'t work.',
          'After making any change to an account, log it immediately: what you changed, why, and what result you expect.',
          'If the previous entry is vague or missing, that\'s a quality gap to fix going forward.',
          'The log book is also how leadership and teammates audit your work. Own it.',
        ],
      },
      {
        heading: 'What a Healthy Account Looks Like',
        items: [
          'Leads generating at or below scalable CPL, consistently throughout the cycle.',
          'Leads being called within a few hours (not days) of coming in.',
          'A reasonable percentage of leads converting to booked appointments.',
          'Spend pacing on track — not blowing through budget early, not running out before the cycle ends.',
          'Frequency under control — ads aren\'t reaching the same people too many times.',
          'No ad sets sitting on that should have been turned off weeks ago.',
        ],
      },
      {
        heading: 'Warning Signs That Demand Action',
        items: [
          '🚨 Leads generated but not called within 24 hours — escalate to VA team immediately.',
          '🚨 CPL increasing week over week with no creative changes — audience fatigue or landing page issue.',
          '🚨 Spend pacing significantly off target by mid-cycle — either underspend or budget burnout risk.',
          '🚨 Zero booked appointments despite good lead volume — booking funnel is broken.',
          '⚠️ Frequency creeping above 3–4 — creative refresh needed soon.',
          '⚠️ CTR declining without a change — audience is tuning out the creative.',
        ],
        callout: {
          type: 'warning',
          text: 'Warning signs are not suggestions to "keep an eye on it." They are action items. Every warning sign should have an owner and a next step in the log book within 24 hours.',
        },
      },
      {
        heading: 'Lead Quality vs. Lead Volume',
        items: [
          'A high volume of leads that don\'t book is not a good result — it\'s a waste of budget.',
          'Signs of a lead quality problem: leads from wrong service areas, wrong property types, or repeated no-contacts.',
          'Lead quality problems usually trace to: targeting (wrong audience), creative (wrong message attracting wrong people), or landing page (wrong promise).',
          'Don\'t confuse a lead quality problem with a VA problem. Audit both before assuming.',
        ],
      },
    ],
    keyTakeaways: [
      'Every lead needs to be traceable to its final outcome before you make any ad changes.',
      'The log book is both your record and your protection — keep it current and specific.',
      'Healthy = scalable CPL + leads being called fast + appointments booking at a reasonable rate.',
      'Warning signs are action items, not observations.',
      'A booking problem is a VA/funnel problem. An ad problem is an ad problem. Don\'t confuse the two.',
    ],
    quiz: [
      {
        question: 'When auditing leads, what should you determine first?',
        options: [
          'Whether the creative needs refreshing',
          'What happened to each lead — was it called, did it book, where did it get stuck',
          'How much was spent generating those leads',
          'Whether the client is happy with the results',
        ],
        correctIndex: 1,
        explanation: 'Lead audits start with tracing each lead\'s full journey through the funnel — call attempted, answered, pitched, booked, or dropped at a specific stage.',
      },
      {
        question: 'What does a healthy account look like?',
        options: [
          'CPL under $20 with consistent daily spend',
          'Leads generating at scalable cost, being called promptly, and converting to booked appointments at a sustainable rate',
          'Zero ad fatigue in the first 30 days',
          'High CTR with low cost per click',
        ],
        correctIndex: 1,
        explanation: 'Health is defined by the full funnel working — not just lead volume, but leads converting to appointments at economics that work for the client.',
      },
      {
        question: 'What is the log book used for in a media buyer\'s workflow?',
        options: [
          'Tracking client billing and invoices',
          'Recording action steps, account notes, and changes made to each account',
          'Logging creative asset names and approval statuses',
          'Client communication history and feedback',
        ],
        correctIndex: 1,
        explanation: 'The log book is the operational record for each account — what was changed, why, and what happened next. It\'s also how leadership audits your work.',
      },
      {
        question: 'Which of the following is a critical warning sign requiring immediate action?',
        options: [
          'Cost per lead increasing by 5% over two weeks',
          'Leads being generated but not called within 24 hours',
          'Creative running for 3 weeks without a refresh',
          'Spend pacing slightly below target on Day 2 of the cycle',
        ],
        correctIndex: 1,
        explanation: 'Leads sitting uncalled decay fast and waste budget. This requires immediate escalation to the VA team — not next week, not at the meeting, now.',
      },
      {
        question: 'When you have good lead volume but near-zero bookings, what should you do first?',
        options: [
          'Kill all ad sets immediately and rebuild the campaign',
          'Lower the budget to reduce wasted spend on bad leads',
          'Flag it to the VA team and verify leads are being called promptly before changing anything in ads',
          'Launch new creative to attract higher-quality leads',
        ],
        correctIndex: 2,
        explanation: 'Low bookings with good lead volume is almost always a VA/call issue, not an ad issue. Diagnosing correctly prevents making the wrong fix.',
      },
    ],
  },
  {
    id: 3,
    title: 'Ad Diagnostics & QA',
    subtitle: 'Read KPIs correctly, catch what others miss, and know when to refresh vs. rebuild.',
    estimatedTime: '50 min',
    color: '#A78BFA',
    icon: '📊',
    objective: 'Learn which KPIs actually matter, how to identify underperformers before they drain budget, and when a creative refresh fixes the problem vs. when you need to start over.',
    sections: [
      {
        heading: 'The KPIs That Actually Matter',
        items: [
          'CPL (Cost Per Lead): your primary efficiency metric. Compare against your scalable target, not a generic benchmark.',
          'Cost Per Booked Appointment: the downstream metric that connects ad performance to business outcome.',
          'Frequency: how many times the same person has seen your ad. Above 3–4, you\'re likely reaching fatigue.',
          'CTR (Click-Through Rate): reflects how compelling the creative is for the current audience.',
          'Spend Pacing: are you on track to spend the right amount across the cycle? Not too fast, not too slow.',
        ],
        callout: {
          type: 'tip',
          text: 'Vanity metrics to ignore: reach, impressions, video views, page likes. None of these tell you whether the account is working. Focus on the five KPIs above.',
        },
      },
      {
        heading: 'Identifying Underperformers',
        items: [
          'An underperformer is any ad set consuming meaningful budget without producing results at scalable cost.',
          'Compare CPL by ad set — the outliers at the high end are your underperformers.',
          'Check how long an ad set has been running vs. how many leads it\'s produced. Budget spent ÷ leads = CPL.',
          'Look at ad sets that have been running for weeks with low or zero leads — these should have been killed.',
          'Don\'t let sunk cost keep you running a bad ad set. Turn it off, learn from it, move on.',
        ],
      },
      {
        heading: 'Common QA Misses',
        items: [
          'Creative tests that lost but never got turned off — they keep bleeding budget indefinitely.',
          'Ad sets targeting the wrong geography — wrong service area means wrong leads.',
          'Multiple ad sets targeting the same audience competing against each other (audience overlap).',
          'Dead pixels or broken tracking — you think leads are coming in, but the data is incomplete.',
          'Budget allocation errors — spending too much on testing vs. scaling winners.',
          'Ads running with outdated or incorrect copy (old promos, wrong contact info, seasonal messaging out of season).',
        ],
        callout: {
          type: 'warning',
          text: 'A QA check is not a monthly task — it\'s a weekly minimum. Every week you\'re in an account, verify that nothing is running that shouldn\'t be.',
        },
      },
      {
        heading: 'Creative Refresh vs. Kill and Rebuild',
        items: [
          'Refresh: swap the creative (image, video, copy) within the existing ad set. Lower risk, preserves learning.',
          'Kill and rebuild: turn off the ad set entirely and start fresh. Higher risk, resets learning — but sometimes necessary.',
          'Refresh when: performance is declining but the audience, targeting, and structure are sound.',
          'Kill and rebuild when: the targeting is wrong, the audience is burned out beyond recovery, or the creative format itself is the problem.',
          'Never refresh just because it\'s been a few weeks — refresh because you have a reason to believe new creative will improve performance.',
        ],
      },
      {
        heading: 'Reading Frequency & CTR Together',
        items: [
          'High frequency + declining CTR = audience fatigue. The same people are seeing the ad and tuning it out.',
          'Low frequency + declining CTR = the creative isn\'t compelling to new viewers — the issue is the creative, not the audience.',
          'High CTR + high CPL = the ad is getting clicks but the landing page or lead form isn\'t converting.',
          'Low CTR + low CPL = a potential audience/targeting problem, or a very small but highly targeted audience converting well.',
          'Always look at KPIs together, not in isolation — single metrics mislead.',
        ],
        callout: {
          type: 'rule',
          text: 'If CTR drops and CPL rises and frequency is above 3: refresh the creative immediately. This combination is the clearest signal for audience fatigue.',
        },
      },
      {
        heading: 'Spend Pacing Management',
        items: [
          'Ideal pacing: roughly linear spend through the cycle, reaching ~100% of budget near the end.',
          'Overpacing early means you run out of budget before the cycle ends — no spend = no leads in the back half.',
          'Underpacing means you\'re generating less data and volume than you should — harder to optimize.',
          'Adjust daily budgets to correct pacing issues. Don\'t wait and try to make it up in the last few days.',
          'Know the safe range for budget increases: a general rule is no more than 20–30% increase at a time to avoid resetting ad set learning.',
        ],
      },
    ],
    keyTakeaways: [
      'Track these 5 KPIs: CPL, cost per booked appointment, frequency, CTR, spend pacing.',
      'Turn off underperformers weekly — don\'t let bad ad sets run out of inertia.',
      'QA is a weekly task minimum — missing it is how budget gets wasted without anyone noticing.',
      'Refresh creative when performance declines but the structure is sound. Rebuild when the structure itself is broken.',
      'Read KPIs together. Single metrics mislead — the combination tells the real story.',
    ],
    quiz: [
      {
        question: 'Which five KPIs matter most for evaluating ad set performance?',
        options: [
          'Reach, impressions, page likes, video views, and engagement rate',
          'CPL, cost per booked appointment, frequency, CTR, and spend pacing',
          'Click-through rate, relevance score, video completion rate, reach, and CPM',
          'Cost per click, conversions, page likes, post shares, and CTR',
        ],
        correctIndex: 1,
        explanation: 'These five give the full picture: cost efficiency (CPL, cost per booking), audience saturation (frequency), creative engagement (CTR), and budget trajectory (spend pacing).',
      },
      {
        question: 'When should you refresh creative vs. kill and rebuild an ad set?',
        options: [
          'Refresh if running more than 2 weeks; kill if older than 4 weeks',
          'Refresh when performance is declining but the ad set structure is sound; kill when the fundamentals are broken',
          'Always refresh first; never rebuild before 60 days of data',
          'Kill anything that hasn\'t generated a lead in 7 days',
        ],
        correctIndex: 1,
        explanation: 'Refreshing creative is lower-risk and preserves audience learning. Rebuilding makes sense when the targeting, audience, or structure itself is the problem — not just the creative.',
      },
      {
        question: 'What is a common QA miss that media buyers leave running by mistake?',
        options: [
          'Ad sets that performed well last cycle',
          'Creative tests that didn\'t win but never got turned off, bleeding budget with no results',
          'New ad sets launched this week that haven\'t generated data yet',
          'Campaigns running at high frequency with good CPL',
        ],
        correctIndex: 1,
        explanation: 'Creative tests that didn\'t win often get left running indefinitely. Regular QA audits catch these before they consume significant budget.',
      },
      {
        question: 'What does high frequency combined with declining CTR most likely indicate?',
        options: [
          'The creative is resonating strongly and should be scaled',
          'Audience saturation — the same people are seeing the ad too many times and tuning out',
          'The budget is too high and needs to be reduced',
          'The targeting is too broad and needs to be narrowed',
        ],
        correctIndex: 1,
        explanation: 'High frequency + declining CTR is the clearest signal for audience fatigue. New creative or audience expansion is needed — this combination is your trigger to refresh.',
      },
      {
        question: 'CPL is rising, but CTR and spend are stable. What is the most likely root cause?',
        options: [
          'Landing page or lead form conversion rate has dropped — people are clicking but not completing',
          'Budget needs to be increased to generate more data',
          'The audience is too small and needs expansion',
          'Creative frequency is too low',
        ],
        correctIndex: 0,
        explanation: 'If clicks are happening but leads aren\'t coming through, the problem is post-click — the landing page or lead form is losing people. The fix is not in the ad account.',
      },
    ],
  },
  {
    id: 4,
    title: 'Live Account Audits',
    subtitle: 'Practice the problem → analysis → solution framework on real account scenarios.',
    estimatedTime: '1 hr',
    color: '#22C55E',
    icon: '🧪',
    objective: 'Apply the audit framework to real account scenarios. Learn to diagnose before acting, document as you go, and present findings clearly.',
    sections: [
      {
        heading: 'The Problem → Analysis → Solution Framework',
        items: [
          'Problem: what is the symptom? (CPL up, leads not booking, spend off-pace, etc.)',
          'Analysis: what is the root cause? (Audience fatigue? Landing page? VA not calling? Wrong geography?)',
          'Solution: what specific action will address the root cause — not just the symptom.',
          'This framework stops you from applying the wrong fix. Treating a symptom without a diagnosis just creates a different problem.',
          'Every action you take on an account should map to a problem you identified and an analysis you did.',
        ],
        callout: {
          type: 'rule',
          text: 'The rule: never make a change to an account without being able to state the problem it\'s solving and the analysis that led you there. "I felt like trying something new" is not an analysis.',
        },
      },
      {
        heading: 'Scenario A: Good CPL, No Bookings',
        items: [
          'Problem: CPL is on target. Lead volume is strong. Booked appointments this cycle: near zero.',
          'Wrong diagnosis: "The leads must be low quality — I need to change the creative."',
          'Correct analysis: leads are generating fine. The booking funnel is broken. Check: are leads being called? When? By whom? What\'s the contact rate?',
          'Solution: escalate to the VA team with specific data — X leads generated, Y called within 24hrs, Z reached. Get them to identify the bottleneck.',
          'Ad change needed: none. This is not an ad problem.',
        ],
      },
      {
        heading: 'Scenario B: CPL Rising Week Over Week',
        items: [
          'Problem: CPL has increased 40% over the past two weeks with no significant changes made.',
          'Investigate: check frequency first. Is it above 3–4? Check CTR — is it declining?',
          'If frequency is high + CTR is falling: audience fatigue. Creative refresh is the fix.',
          'If frequency is normal + CTR is stable: look at landing page conversion rate, lead form completion rate.',
          'If spend is unchanged but leads are down: something post-click has changed. Investigate the funnel.',
          'Document your finding and the specific change you\'re making in the log book before acting.',
        ],
      },
      {
        heading: 'Scenario C: Spend Way Off Pace',
        items: [
          'Problem: Day 10 of a 30-day cycle. Spend is at 60% of budget already.',
          'This is overpacing. At this rate, budget runs out around Day 17 — leaving 13 days with no spend and no leads.',
          'Action: reduce daily budgets across active ad sets to bring pacing back to ~33% at Day 10.',
          'Rule: make budget changes gradually — 20–30% reduction at a time to avoid disrupting ad set learning.',
          'Log the change with reason and your projected correction timeline.',
        ],
        callout: {
          type: 'warning',
          text: 'Underspend scenario: Day 15, only 30% spent. Don\'t try to make it up by doubling budgets overnight. Large budget swings reset learning. Increase gradually and accept that the cycle may not hit full spend target.',
        },
      },
      {
        heading: 'Documenting Your Audit',
        items: [
          'Document as you go — not after the fact. Memory is unreliable.',
          'Every audit entry in the log book should include: date, account, what you found, your diagnosis, and the specific action taken.',
          'Good log entry: "Day 12. Frequency hit 4.8 on Ad Set A. CTR dropped from 2.1% to 1.3%. Refreshed creative with new video (asset ID: X). Expecting CTR recovery within 48 hrs."',
          'Bad log entry: "Updated ads."',
          'Your log book entries are how leadership evaluates your analytical quality — not just your results.',
        ],
      },
      {
        heading: 'Presenting Account Status in Reviews',
        items: [
          'Future state: you present your own accounts in review meetings. Not the pod manager. You.',
          'Format: current performance vs. target → root cause of any gap → specific action steps in progress or planned.',
          'Don\'t just read numbers. Explain what\'s happening and why. Present the plan.',
          'If something went wrong: own it, explain the diagnosis, and present the fix. Don\'t hide problems.',
          'Meeting structure is still evolving (Tuesday/Friday calls, Monday/Thursday reports). Details TBD — flag this in your onboarding.',
        ],
        callout: {
          type: 'tip',
          text: 'Ownership in reviews means coming with answers, not questions. "I noticed CPL rising, here\'s why I think it is, and here\'s what I\'ve already changed" is ownership. "CPL is up, what should I do?" is not.',
        },
      },
    ],
    keyTakeaways: [
      'Always: problem → analysis → solution. Never change an account without identifying all three.',
      'A booking problem is not fixed by changing ads. Diagnose before acting.',
      'Log book entries should include the problem, diagnosis, and specific action — not just "updated ads."',
      'Overpacing is dangerous. Course-correct early and gradually.',
      'In review meetings, present your findings, your analysis, and your plan — not just data.',
    ],
    quiz: [
      {
        question: 'What is the problem → analysis → solution framework?',
        options: [
          'A client reporting structure used in account reviews',
          'A diagnostic approach: identify what\'s happening, determine why, then decide on the correct fix',
          'A weekly meeting agenda format for media buyer check-ins',
          'A creative testing methodology for new ad formats',
        ],
        correctIndex: 1,
        explanation: 'This framework prevents jumping to solutions before understanding the root cause. Treating a symptom without a diagnosis leads to the wrong fix — and often makes things worse.',
      },
      {
        question: 'When leading an audit, what should you document?',
        options: [
          'Only the issues you plan to escalate to leadership',
          'Every finding — what\'s working, what\'s not, root cause, and specific action steps',
          'Just the final recommendations and the KPIs that are below target',
          'Only changes you\'ve already made, not planned changes',
        ],
        correctIndex: 1,
        explanation: 'Documentation during an audit creates the action plan and the log book entry simultaneously. If it\'s not written down with a reason and next step, it didn\'t happen.',
      },
      {
        question: 'Good CPL, strong lead volume, near-zero booked appointments. What should you do first?',
        options: [
          'Kill all ad sets immediately and rebuild the campaign with different targeting',
          'Lower the budget to reduce budget wasted on low-quality leads',
          'Flag the booking issue to the VA team and verify leads are being called before changing anything in ads',
          'Launch new creative to attract higher-intent leads',
        ],
        correctIndex: 2,
        explanation: 'Low bookings with good lead volume is almost always a VA/call issue, not an ad issue. Changing ads won\'t fix a broken booking funnel.',
      },
      {
        question: 'Which is a good log book entry after a creative refresh?',
        options: [
          '"Updated ads."',
          '"Refreshed creative on Ad Set A. Frequency was 4.8, CTR dropped 40%. New video launched. Expecting recovery in 48 hrs."',
          '"CPL was high so I made some changes."',
          '"Changed creative because the old one was getting old."',
        ],
        correctIndex: 1,
        explanation: 'A good log entry states the problem identified, the data that supported the diagnosis, and the specific action taken with an expected outcome.',
      },
      {
        question: 'How should you present your account status in a review meeting?',
        options: [
          'Read log book entries chronologically from the period',
          'Share your screen and walk through raw Meta Ads Manager data live',
          'State current performance vs. target, root cause of any gap, and specific action steps taken or planned',
          'Summarize last week\'s spend and ask leadership what to do next',
        ],
        correctIndex: 2,
        explanation: 'Review meetings require ownership of the narrative — not just reporting numbers, but explaining why, and presenting the plan. You are the expert on your accounts.',
      },
    ],
  },
  {
    id: 5,
    title: 'Ownership, Workflow & Role Integration',
    subtitle: 'What a full-cycle media buyer\'s day, week, and career actually looks like.',
    estimatedTime: '45 min',
    color: '#F97316',
    icon: '🎯',
    objective: 'Understand what owning 15–25 accounts actually requires day-to-day, how you collaborate with other departments, and what growth in this role looks like.',
    sections: [
      {
        heading: 'What Account Ownership Actually Means',
        items: [
          'You own 15–25 accounts. "Own" means: if performance is off on any of them, it\'s your problem to identify and fix.',
          'Ownership is not the same as knowing what happened. It means knowing why, and having a plan.',
          'The mindset shift from the old model: you don\'t wait to be told what to fix. You find it, diagnose it, and act.',
          'This means staying on top of 15–25 accounts simultaneously — which requires a system, not just effort.',
        ],
        callout: {
          type: 'rule',
          text: 'If a client account is underperforming and you didn\'t catch it until leadership flagged it to you — that\'s a process failure, not just a performance miss. Your system needs to catch it first.',
        },
      },
      {
        heading: 'No Client Contact — Ever',
        items: [
          'Media buyers have zero client-facing responsibilities. This is not a gray area.',
          'Do not email clients. Do not message them on Slack. Do not hop on calls with them.',
          'Do not share performance data directly with clients, even if they ask.',
          'All client communication — performance updates, questions, concerns, good news, bad news — goes through Sales/CSM.',
          'If a client somehow reaches you directly: be professional, acknowledge them, and route them to Sales/CSM immediately.',
          'This protects you, it protects the client relationship, and it protects the company.',
        ],
        callout: {
          type: 'warning',
          text: 'This is a hard boundary. If you\'re ever unsure whether something is client-facing, assume it is and route it through Sales/CSM. When in doubt, don\'t.',
        },
      },
      {
        heading: 'Your Daily & Weekly Workflow',
        items: [
          'Every morning: check spend pacing and any overnight lead volume changes across all accounts.',
          'Daily: respond to flags from VAs, monitor for anomalies (CPL spikes, pacing issues, dead ad sets).',
          'Weekly: full audit of each account — KPIs, frequency, creative age, spend trajectory, log book review.',
          'Monday/Thursday: reports documented (exact format TBD — will be specified before rollout).',
          'Tuesday/Friday: team calls (structure still evolving — this is the likely cadence).',
          'Creative requests: submit when you see performance data that suggests a specific new asset would improve results.',
        ],
      },
      {
        heading: 'Collaborating with the VA Team',
        items: [
          'VAs call leads and book appointments. You generate the leads. You both share accountability for booked appointments during this phase.',
          'When leads aren\'t being called promptly: flag it through the proper channel, not to individual VAs directly unless it\'s a quick coordination moment.',
          'When bookings are low: first verify call volume before assuming it\'s a lead quality problem.',
          'When you have a lead quality concern: bring data — not anecdote. "These 15 leads from this ad set all had disconnected numbers" is actionable. "The leads feel low quality" is not.',
          'Long-term: the VA/Call Center department takes over full booked-appointment accountability. For now, it\'s shared.',
        ],
      },
      {
        heading: 'Collaborating with the Creative Department',
        items: [
          'The Creative Department produces ad assets. You direct what gets made based on what\'s working in the account.',
          'This is a feedback loop: you request → they build → you run it → you report results → they iterate.',
          'How to request: be specific. "I need a new static ad for X market targeting homeowners, angle: urgency around storm damage season, similar to the format that performed in account Y."',
          'How to give performance feedback: bring data. "This video got 3.2% CTR and $18 CPL in the first week — let\'s make more in this style" or "This format got 0.6% CTR — not worth repeating."',
          'You retain ownership of creative performance even though you didn\'t build the asset.',
        ],
        callout: {
          type: 'tip',
          text: 'The better your creative requests (with context, data, and specific direction), the better the assets you get back. Vague requests produce generic output.',
        },
      },
      {
        heading: 'Growth in This Role',
        items: [
          'Level 1: Execute well across your accounts. No fires, no surprises, consistent performance.',
          'Level 2: Proactively identify and fix problems before leadership sees them. Lead account reviews with clear analysis.',
          'Level 3: Develop repeatable playbooks — creative formats, targeting strategies, and diagnostic frameworks that you can apply across accounts and teach to others.',
          'Level 4: Lead a training session. Review another MB\'s accounts. Contribute to the Creative direction strategy.',
          'Compensation structure tied to performance on your accounts — exact structure TBD before rollout.',
          'The ceiling in this role is tied directly to the quality of your ownership, not just your time.',
        ],
      },
    ],
    keyTakeaways: [
      'Account ownership means: you find the problems before leadership does. That\'s the standard.',
      'Zero client contact. No exceptions. All client comms go through Sales/CSM.',
      'Weekly audit cadence, daily monitoring, Monday/Thursday reports, Tuesday/Friday calls (structure evolving).',
      'VA collaboration: bring data, not anecdote. Flag through proper channels.',
      'Creative collaboration: be specific in requests, bring performance data in feedback.',
    ],
    quiz: [
      {
        question: 'As a full-cycle media buyer, how many accounts are you typically responsible for?',
        options: [
          '5–10 accounts',
          '15–25 accounts',
          '30–40 accounts',
          'However many get assigned without a set cap',
        ],
        correctIndex: 1,
        explanation: 'The 15–25 account range is the design target for a full-cycle media buyer. Below that is under-utilization; above that typically hurts account quality.',
      },
      {
        question: 'What is the media buyer\'s role in client communications?',
        options: [
          'They communicate KPIs directly to the client on a weekly basis',
          'They have zero client-facing role — all client communication goes through Sales/CSM',
          'They handle client communication during the onboarding phase only',
          'They communicate with clients only when there is a critical performance issue',
        ],
        correctIndex: 1,
        explanation: 'Media buyers are 100% internal. Zero client contact. No exceptions. All account performance information flows through Sales/CSM who own the client relationship.',
      },
      {
        question: 'How does a media buyer work with the Creative Department?',
        options: [
          'They produce their own creative assets using approved templates',
          'They request specific creative based on account performance data, give feedback, and let Creative build assets',
          'They send monthly creative briefs and approve the output',
          'They approve creative direction but don\'t provide performance data',
        ],
        correctIndex: 1,
        explanation: 'It\'s a performance-driven feedback loop. The MB drives creative strategy based on account data; the Creative Department executes. The MB still owns creative performance.',
      },
      {
        question: 'When bookings are low, what should you do before flagging it as a lead quality problem?',
        options: [
          'Launch new creative immediately to attract higher-intent leads',
          'Lower your CPL target to bring in more volume',
          'Verify with data that leads are being called promptly and at sufficient volume',
          'Rebuild the ad sets with more specific audience targeting',
        ],
        correctIndex: 2,
        explanation: 'Low bookings might be a lead quality issue — but it might also be a VA/calling issue. Always verify call data before changing ad strategy.',
      },
      {
        question: 'What does real account ownership mean for a media buyer?',
        options: [
          'Being the person who clicked "publish" on the ads',
          'Taking full accountability for lead gen performance — diagnosing problems, driving decisions, owning the outcomes',
          'Managing the client relationship alongside the Sales/CSM team',
          'Executing the tasks that leadership assigns on each account',
        ],
        correctIndex: 1,
        explanation: 'The core mindset shift: from task executor to account owner. If performance is off on any of your accounts, it\'s your problem to find and fix — not something you wait to be told.',
      },
    ],
  },
];

export const MB_WORKSHEET_SECTIONS = [
  {
    id: 'role-clarity',
    title: 'Role Clarity',
    description: 'Confirm your understanding of what you own and what you don\'t.',
    items: [
      'I understand that I own ad performance on my accounts — strategy, execution, and creative direction',
      'I understand that I have zero client-facing responsibilities — all client comms go through Sales/CSM',
      'I understand the distinction between my role and the VA/Call Center role',
      'I understand when to escalate and the correct escalation path',
      'I have reviewed my account list and know my current assignments',
      'I understand the cycle structure and know the current cycle dates for my accounts',
    ],
  },
  {
    id: 'account-audit',
    title: 'First Account Audit Checklist',
    description: 'Run through this when you inherit or audit any account for the first time.',
    items: [
      'Reviewed cycle dates and current spend vs. target pacing',
      'Read the log book from the last 30 days — understood what changed and why',
      'Pulled CPL by ad set for the current cycle and identified top/bottom performers',
      'Checked frequency on all active ad sets — flagged any above 3.5',
      'Verified all active ad sets should be running (no zombie creative tests)',
      'Audited last 20+ leads — confirmed whether they were called, when, and what happened',
      'Identified any warning signs requiring immediate action',
      'Documented findings and action steps in the log book',
    ],
  },
  {
    id: 'kpi-reference',
    title: 'KPI Reference & Thresholds',
    description: 'Key benchmarks to keep front of mind. These are starting points — context always applies.',
    items: [
      'CPL: compare against scalable target for the specific account — not a universal number',
      'Cost per booked appointment: must allow client to profit at their close rate and deal value',
      'Frequency: refresh creative if hitting 3–4+ on a cold audience',
      'CTR: declining CTR with stable spend = creative fatigue or audience saturation',
      'Spend pacing: at any point in the cycle, roughly (days elapsed ÷ total days) × budget = expected spend',
      'Budget increases: 20–30% at a time max to avoid resetting ad set learning',
      'Leads uncalled > 24 hours: immediate VA escalation required',
    ],
  },
  {
    id: 'weekly-workflow',
    title: 'Weekly Workflow Template',
    description: 'A starting structure for managing your week across 15–25 accounts.',
    items: [
      'Monday: review all accounts — KPIs, pacing, lead audit, log book catch-up. Submit Monday report.',
      'Tuesday: team call. Present account status for any flagged accounts. Action any items from the call.',
      'Wednesday: proactive deep-dives on accounts approaching cycle end or showing warning signs.',
      'Thursday: creative request submissions based on week\'s data. Submit Thursday report.',
      'Friday: team call. Finalize any cycle-end account actions. QA check on all accounts.',
      'Daily (AM): check overnight pacing and any new leads across accounts. Catch anomalies early.',
      'Daily (PM): review any VA flags, respond to any internal escalations, log book updates.',
    ],
  },
  {
    id: 'va-collab',
    title: 'VA Collaboration Protocol',
    description: 'How to flag issues and coordinate effectively with the VA/Call Center team.',
    items: [
      'Before flagging a booking issue: pull call data first — was it actually called?',
      'When flagging to VA team: include account name, lead count, timeframe, and specific concern',
      'A good flag: "Account X — 18 leads generated in the last 5 days. Call log shows 6 called. 12 uncalled. Requesting follow-up."',
      'Not a good flag: "The leads aren\'t booking, can you look into it?"',
      'Route systemic VA issues through the proper channel — not to individual VAs directly',
      'When bookings improve after a VA protocol fix: document in log book. Attribution matters.',
    ],
  },
  {
    id: 'creative-requests',
    title: 'Creative Request Protocol',
    description: 'How to request and give feedback on creative assets effectively.',
    items: [
      'Submit requests in the designated channel with: market, angle, format, and reference (if any)',
      'Include performance context: "Previous video in this format got 2.8% CTR and $22 CPL in Week 1"',
      'Specify the audience mindset you\'re targeting — not just demographics',
      'After running new creative for 1+ week: provide performance feedback with data (CTR, CPL, spend)',
      'Good feedback: "New static — 0.9% CTR vs 1.8% previous — not a format winner for this market."',
      'Not good feedback: "The creative looks good but didn\'t really perform."',
    ],
  },
];
