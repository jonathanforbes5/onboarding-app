export const RECRUITER_GUIDE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Roof Ignite — Pod Manager Hiring Criteria Guide</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --gold:    #F5C800;
      --gold-lt: #FDF3B0;
      --black:   #0A0A0A;
      --dark:    #111111;
      --surf:    #161616;
      --surf2:   #1C1C1C;
      --border:  #2A2A2A;
      --text:    #F0F0F0;
      --muted:   #888888;
      --muted2:  #555555;
      --green:   #22C55E;
      --red:     #EF4444;
      --blue:    #3B82F6;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--black);
      color: var(--text);
      line-height: 1.6;
      font-size: 13px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 32px 64px;
    }

    /* ── Cover ── */
    .cover {
      background: linear-gradient(135deg, #0A0A0A 0%, #161616 100%);
      border-bottom: 1px solid var(--border);
      padding: 48px 32px 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      page-break-after: avoid;
    }
    .cover-left { flex: 1; }
    .cover-eyebrow {
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 10px;
    }
    .cover-title {
      font-size: 28px;
      font-weight: 900;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    .cover-sub {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 18px;
    }
    .cover-pills { display: flex; flex-wrap: wrap; gap: 8px; }
    .pill {
      background: var(--surf2);
      border: 1px solid var(--border);
      color: var(--muted);
      font-size: 10px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      letter-spacing: 0.04em;
    }
    .pill.gold { background: #1A1400; border-color: var(--gold); color: var(--gold); }
    .cover-logo { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
    .cover-logo img { height: 28px; opacity: 0.9; filter: brightness(0) invert(1); }
    .cover-date { font-size: 10px; color: var(--muted2); }

    /* ── Section layout ── */
    .section {
      margin-top: 36px;
      page-break-inside: avoid;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--border);
    }
    .section-num {
      background: var(--gold);
      color: var(--black);
      font-size: 9px;
      font-weight: 900;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }
    .section-sub {
      font-size: 11px;
      color: var(--muted);
      margin-top: 2px;
    }

    /* ── Table ── */
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    thead th {
      background: var(--surf);
      color: var(--gold);
      font-size: 9px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    tbody tr {
      border-bottom: 1px solid var(--border);
    }
    tbody tr:last-child { border-bottom: none; }
    tbody tr:nth-child(even) { background: #0D0D0D; }
    tbody td {
      padding: 9px 12px;
      color: var(--text);
      vertical-align: top;
    }
    .td-label {
      font-weight: 700;
      color: #fff;
    }
    .td-muted { color: var(--muted); font-size: 11px; }
    .gate-badge {
      display: inline-block;
      background: #1A0A0A;
      border: 1px solid var(--red);
      color: var(--red);
      font-size: 8px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.06em;
      vertical-align: middle;
      margin-left: 6px;
    }

    /* ── Cards grid ── */
    .cards { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .cards-3 { grid-template-columns: 1fr 1fr 1fr; }
    .card {
      background: var(--surf);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 16px;
    }
    .card-icon { font-size: 18px; margin-bottom: 6px; }
    .card-title { font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .card-body { font-size: 11px; color: var(--muted); line-height: 1.55; }
    .card.green { border-color: #22C55E33; }
    .card.red { border-color: #EF444433; }
    .card.gold { border-color: var(--gold) + '33'; border-color: #F5C80033; }

    /* ── Skill rating rows ── */
    .skills { display: flex; flex-direction: column; gap: 6px; }
    .skill-row {
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--surf);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
    }
    .skill-name { flex: 1; font-size: 12px; font-weight: 600; color: var(--text); }
    .skill-sub { font-size: 10px; color: var(--muted); margin-top: 1px; }
    .skill-dots { display: flex; gap: 4px; flex-shrink: 0; }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 3px;
      background: var(--border);
    }
    .dot.req { background: var(--gold); }
    .skill-label { font-size: 9px; font-weight: 700; color: var(--muted2); width: 60px; text-align: right; letter-spacing: 0.04em; text-transform: uppercase; }

    /* ── Question blocks ── */
    .questions { display: flex; flex-direction: column; gap: 10px; }
    .question-block {
      background: var(--surf);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 16px;
    }
    .q-num {
      font-size: 9px;
      font-weight: 800;
      color: var(--gold);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .q-text {
      font-size: 12px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 6px;
      font-style: italic;
    }
    .q-look {
      font-size: 11px;
      color: var(--muted);
      padding-left: 14px;
      border-left: 2px solid var(--gold);
      line-height: 1.55;
    }

    /* ── Score rubric ── */
    .rubric { display: flex; flex-direction: column; gap: 0; }
    .rubric-row {
      display: flex;
      align-items: center;
      padding: 9px 14px;
      border-bottom: 1px solid var(--border);
      background: var(--surf);
      gap: 12px;
    }
    .rubric-row:first-child { border-radius: 10px 10px 0 0; }
    .rubric-row:last-child { border-radius: 0 0 10px 10px; border-bottom: none; }
    .rubric-row.header {
      background: var(--dark);
      border-bottom: 2px solid var(--border);
      border-radius: 10px 10px 0 0;
    }
    .rubric-row.header span { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--gold); }
    .rubric-row.total { background: #1A1400; border-top: 1px solid var(--gold); }
    .rubric-cat { flex: 1; font-size: 12px; font-weight: 600; }
    .rubric-cat.bold { font-weight: 800; color: #fff; }
    .rubric-weight {
      font-size: 11px;
      font-weight: 700;
      color: var(--gold);
      width: 50px;
      text-align: right;
    }
    .rubric-score {
      font-size: 11px;
      font-weight: 700;
      color: var(--muted);
      width: 70px;
      text-align: right;
    }
    .score-box {
      width: 48px;
      height: 22px;
      background: var(--surf2);
      border: 1px solid var(--border);
      border-radius: 5px;
      flex-shrink: 0;
    }
    .rubric-row.total .rubric-cat { font-weight: 900; color: #fff; font-size: 13px; }
    .rubric-row.total .rubric-weight { font-size: 13px; color: var(--gold); }

    /* ── Threshold badges ── */
    .thresholds { display: flex; gap: 10px; margin-top: 12px; }
    .threshold {
      flex: 1;
      border-radius: 10px;
      padding: 12px 16px;
      text-align: center;
    }
    .threshold.advance { background: #0D1A0D; border: 1px solid #22C55E33; }
    .threshold.priority { background: #1A1400; border: 1px solid var(--gold); }
    .threshold-score { font-size: 22px; font-weight: 900; }
    .threshold.advance .threshold-score { color: var(--green); }
    .threshold.priority .threshold-score { color: var(--gold); }
    .threshold-label { font-size: 10px; font-weight: 700; color: var(--muted); margin-top: 2px; text-transform: uppercase; letter-spacing: 0.06em; }

    /* ── Ideal profile ── */
    .ideal-box {
      background: #1A1400;
      border: 1px solid var(--gold);
      border-radius: 12px;
      padding: 20px 22px;
    }
    .ideal-box p { font-size: 13px; color: var(--text); line-height: 1.7; }
    .ideal-titles { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .title-tag {
      background: var(--surf);
      border: 1px solid var(--border);
      color: var(--muted);
      font-size: 11px;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: 20px;
    }

    /* ── Recording eval ── */
    .rec-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
    .rec-card {
      border-radius: 10px;
      padding: 14px 15px;
    }
    .rec-card.green { background: #0D1A0D; border: 1px solid #22C55E33; }
    .rec-card.yellow { background: #1A1600; border: 1px solid #EAB30833; }
    .rec-card.red { background: #1A0D0D; border: 1px solid #EF444433; }
    .rec-card-title {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }
    .rec-card.green .rec-card-title { color: var(--green); }
    .rec-card.yellow .rec-card-title { color: #EAB308; }
    .rec-card.red .rec-card-title { color: var(--red); }
    .rec-list { list-style: none; display: flex; flex-direction: column; gap: 5px; }
    .rec-list li { font-size: 11px; color: var(--muted); line-height: 1.5; padding-left: 12px; position: relative; }
    .rec-list li::before { content: '›'; position: absolute; left: 0; font-weight: 700; }
    .rec-card.green .rec-list li::before { color: var(--green); }
    .rec-card.yellow .rec-list li::before { color: #EAB308; }
    .rec-card.red .rec-list li::before { color: var(--red); }

    /* ── Comp banner ── */
    .comp-banner {
      background: var(--surf);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 18px 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      flex-wrap: wrap;
      margin-top: 8px;
    }
    .comp-item { text-align: center; }
    .comp-val { font-size: 20px; font-weight: 900; color: var(--gold); }
    .comp-key { font-size: 10px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
    .comp-divider { width: 1px; height: 40px; background: var(--border); }

    /* ── Footer ── */
    .footer {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-brand { font-size: 11px; font-weight: 800; color: var(--muted2); letter-spacing: 0.06em; }
    .footer-note { font-size: 10px; color: var(--muted2); }

    /* ── Print ── */
    @media print {
      body { background: #fff !important; color: #111 !important; }
      .page { padding: 0 20px 40px; }
      .section { page-break-inside: avoid; }
      @page { margin: 20mm 15mm; size: A4; }
    }

    /* ── Utilities ── */
    .mt-8 { margin-top: 8px; }
    .mt-12 { margin-top: 12px; }
    .bold { font-weight: 700; }
    .text-gold { color: var(--gold); }
    .text-green { color: var(--green); }
    .text-red { color: var(--red); }
    .text-muted { color: var(--muted); }
    ul.check { list-style: none; display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
    ul.check li { font-size: 12px; color: var(--muted); padding-left: 18px; position: relative; line-height: 1.5; }
    ul.check li::before { content: '✓'; position: absolute; left: 0; color: var(--green); font-weight: 800; }
    ul.cross { list-style: none; display: flex; flex-direction: column; gap: 5px; margin-top: 8px; }
    ul.cross li { font-size: 12px; color: var(--muted); padding-left: 18px; position: relative; line-height: 1.5; }
    ul.cross li::before { content: '✕'; position: absolute; left: 0; color: var(--red); font-weight: 800; }

    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 12px; }
    .col-box {
      background: var(--surf);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px 16px;
    }
    .col-box-title { font-size: 11px; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; }
  </style>
</head>
<body>
<div class="cover">
  <div class="cover-left">
    <div class="cover-eyebrow">Recruiting Agency — Confidential</div>
    <div class="cover-title">Pod Manager<br>Hiring Criteria Guide</div>
    <div class="cover-sub">RoofIgnite Performance Marketing · Remote · Full-Time</div>
    <div class="cover-pills">
      <span class="pill gold">Must Read Before Screening</span>
      <span class="pill">Facebook Ads</span>
      <span class="pill">GoHighLevel</span>
      <span class="pill">Agency Client Mgmt</span>
      <span class="pill">Direct Response</span>
      <span class="pill gold">Full Commitment · No Side Agencies</span>
      <span class="pill">Startup Environment</span>
    </div>
  </div>
  <div class="cover-logo">
    <img src="/logo.png" alt="RoofIgnite" />
    <div class="cover-date">Prepared May 2026</div>
  </div>
</div>

<div class="page">

  <!-- ── Role Context ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">→</div>
      <div>
        <div class="section-title">What This Role Actually Is</div>
        <div class="section-sub">Read this before looking at resumes</div>
      </div>
    </div>
    <div class="ideal-box" style="background:#0D0D1A; border-color:#3B82F633;">
      <p>A Pod Manager at RoofIgnite is a <strong style="color:#fff;">revenue partner and pod quarterback</strong> — not a strategist, media buyer, or GHL technician. They own outcomes for <strong style="color:#fff;">20–30 active roofing (and some HVAC/gutter) client accounts simultaneously</strong>, each on a <strong style="color:#fff;">28-day performance cycle</strong> where the company only bills if it delivers 80%+ of the contracted appointment target. They set up campaigns using proven copy and creatives (provided), run daily triage via the Command Centre dashboard, conduct structured check-ins every Monday and Thursday, coordinate a VA team on lead follow-up, and escalate issues well before they become client churn.</p>
      <p style="margin-top:10px;">Success in this role is <strong style="color:#fff;">50% results</strong> (bookings, CPA, show rate) and <strong style="color:#fff;">50% narrative management</strong> — keeping the client's story aligned with reality, inoculating against outside doubt, and proactively communicating before a client ever has to ask. The company is scaling aggressively. This person must be someone who <strong style="color:#fff;">executes flawlessly under pressure</strong> and treats their client book like their own business. They are NOT the landing page builder, the Meta specialist, the GHL technician, or the VA manager — they coordinate all of those, own the outcome, and escalate precisely when needed.</p>
      <p style="margin-top:10px;"><strong style="color:#fff;">This is an entrepreneurial, full-commitment role.</strong> RoofIgnite provides the book of business, the systems, the specialists, and the clients. The Pod Manager runs it like an owner. In exchange, the role requires <strong style="color:#fff;">100% professional dedication</strong> — no active side agency, no freelance client roster being built in parallel, no competing commitments. Outside competition of any kind is a direct conflict of interest and will result in penalties or termination. This is not a contractor arrangement or a stepping stone — it is a career position with real upside for the right person.</p>
      <p style="margin-top:10px;"><strong style="color:#fff;">Startup environment. Fast pace. Big commitment. Big opportunity.</strong> RoofIgnite is scaling from $300K to $1M+/month. Things change quickly — processes evolve, new SOPs get written, the org grows around you. The hours are real, the pace is real, and not every week is smooth. The candidates who thrive here are energized by that, not stressed by it. The upside is equally real: book growth compounds, bonuses scale, and CSMs who perform at 30 clients become first in line for team lead and senior roles as the company scales to multiple pods.</p>
    </div>
  </div>

  <!-- ── Section 1: Hard Gates ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">1</div>
      <div>
        <div class="section-title">Must-Have Qualifications</div>
        <div class="section-sub">Hard gates — missing any one = do not advance</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width:28px;">#</th>
          <th>Requirement</th>
          <th>How to Verify</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-label">1</td>
          <td><span class="td-label">2+ years hands-on Facebook/Meta Ads</span> <span class="gate-badge">HARD GATE</span><br><span class="td-muted">Must have managed campaigns end-to-end — not just "boosted posts" or supported a buyer</span></td>
          <td class="td-muted">Resume + ask for specific ad account spend levels managed</td>
        </tr>
        <tr>
          <td class="td-label">2</td>
          <td><span class="td-label">GoHighLevel (GHL) hands-on experience</span> <span class="gate-badge">HARD GATE</span><br><span class="td-muted">Must have built workflows, sub-accounts, or automations — not just "aware of" GHL</span></td>
          <td class="td-muted">Application screen question + ask them to describe a specific workflow they built</td>
        </tr>
        <tr>
          <td class="td-label">3</td>
          <td><span class="td-label">Multi-account agency experience</span> <span class="gate-badge">HARD GATE</span><br><span class="td-muted">Must have managed multiple client accounts simultaneously (not one brand in-house)</span></td>
          <td class="td-muted">Resume — look for agency-side roles, not in-house brand roles</td>
        </tr>
        <tr>
          <td class="td-label">4</td>
          <td><span class="td-label">Fluent English — written and verbal</span> <span class="gate-badge">HARD GATE</span><br><span class="td-muted">Client-facing role. Must communicate clearly and confidently with roofing business owners</span></td>
          <td class="td-muted">Application voice recording + interview call</td>
        </tr>
        <tr>
          <td class="td-label">5</td>
          <td><span class="td-label">Remote-ready and async-first</span><br><span class="td-muted">Must be self-directed with reliable internet, professional setup, and no timezone blockers (overlap with North America required)</span></td>
          <td class="td-muted">Confirm timezone and home office setup in screening</td>
        </tr>
        <tr>
          <td class="td-label">6</td>
          <td><span class="td-label">Full professional commitment — no active outside agency or competing clients</span> <span class="gate-badge">HARD GATE</span><br><span class="td-muted">Non-compete, full-dedication role. Cannot be running or actively growing their own agency, freelance roster, or any competing service business in parallel. Ask directly in screening.</span></td>
          <td class="td-muted">Ask: "Are you currently running your own agency or managing clients outside of your employer?" Active competing engagement without a firm wind-down plan = do not advance</td>
        </tr>
        <tr>
          <td class="td-label">7</td>
          <td><span class="td-label">Startup-ready mindset — comfortable with pace, change, and ambiguity</span><br><span class="td-muted">RoofIgnite is scaling 3x+ in revenue. Processes evolve constantly, hours are real, and weeks vary. Must be energized by growth and opportunity — not looking for a predictable, structured 9-to-5 environment.</span></td>
          <td class="td-muted">Listen for ownership and growth language. Red flags: requests for rigid hours, "what does a typical day look like," or signs they need a highly structured environment</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ── Section 2: Technical Skills ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">2</div>
      <div>
        <div class="section-title">Technical Skill Rating Sheet</div>
        <div class="section-sub">Score each area 1–5 during screening call</div>
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <div style="font-size:11px; font-weight:800; color:var(--gold); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; padding-left:4px;">Facebook / Meta Ads Platform</div>
      <div class="skills">
        <div class="skill-row">
          <div><div class="skill-name">Campaign architecture</div><div class="skill-sub">CBO vs. ABO, objective selection (Lead Gen not Conversions), ad set structure, naming conventions (B2C required in every campaign name)</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Layer 1/2/3 diagnostic framework</div><div class="skill-sub">Layer 1 = outcome (bookings vs target, cost per booked appointment). Layer 2 = drivers (CPM, CTR, survey rate, VA booking rate, OSA%). Layer 3 = levers (creative refresh, survey shortening, speed to lead). Must know: if Layer 1 is green, STOP — don't touch Layer 2.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Lead gen optimization — cost per booked appointment</div><div class="skill-sub">Key metric is cost per booked appointment, NOT cost per lead and NOT ROAS. Must understand the full funnel: ad click → landing page → qualification survey → VA call → booked appointment</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Creative monitoring & swap decisions</div><div class="skill-sub">Recognising ad fatigue (Andromeda concentrates spend on top 3–4 ads, accelerating fatigue). Knowing when to refresh creatives vs. change targeting. Post-Andromeda protocol: duplicate ad set, turn off top-reach, launch new set, wait 48h before full refresh.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Meta Business Manager admin</div><div class="skill-sub">Pixel setup, CAPI (Conversion API) verification, ad account permissions, BM ownership rules (client must own their BM — never create one for them)</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>
    </div>

    <div style="margin-bottom:14px;">
      <div style="font-size:11px; font-weight:800; color:var(--gold); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; padding-left:4px;">GoHighLevel (GHL) / CRM</div>
      <div class="skills">
        <div class="skill-row">
          <div><div class="skill-name">Sub-account setup & management</div><div class="skill-sub">Configuring new client accounts, pipeline stages, contact management</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Workflow & automation builds</div><div class="skill-sub">A2P SMS registration, follow-up sequences, trigger logic, lead routing</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Calendar & booking integrations</div><div class="skill-sub">Setting up appointment calendars, confirmation sequences, survey forms</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Landing page & funnel setup</div><div class="skill-sub">Building lead capture pages within GHL, connecting to ad campaigns</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>
    </div>

    <div>
      <div style="font-size:11px; font-weight:800; color:var(--gold); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; padding-left:4px;">Operations & Communication Tools</div>
      <div class="skills">
        <div class="skill-row">
          <div><div class="skill-name">Command Centre — daily triage dashboard</div><div class="skill-sub">Must open FIRST every morning. Shows all accounts with 🟢🟡🟠🔴 health status. Red = 40%+ behind target (escalate same day). This is the most critical daily habit — not checking it is a red flag.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">ClickUp — specialist task coordination</div><div class="skill-sub">ALL requests to Emmanuel (GHL/tech), Ken (creatives), Mervin (overflow) go through ClickUp — NEVER Slack DM. Every task must include: client name, GHL link, all assets, 48-hour deadline. This discipline is non-negotiable.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Slack — async team communication</div><div class="skill-sub">Primary internal comms for all pod updates, escalations, status posts. Response SLA: 5–30 min during business hours. Mon/Thu status updates posted to #ops-manager-discussion per account.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Loom — async video communication</div><div class="skill-sub">Pre-launch QC walkthroughs (5-min Loom before every launch — pre-handles 90% of mid-cycle objections). Client update videos. Recorded via Fathom on all onboarding calls (team visibility enabled).</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Google Sheets / Logbook / Client Check-In Sheet</div><div class="skill-sub">Logbook = central truth for ALL lead data across every account (maintained by VAs). Client Check-In Sheet = structured Mon/Thu update tracker. Both must be kept current — Jonathan and Oscar track from these.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div>
        </div>
        <div class="skill-row">
          <div><div class="skill-name">Canva — light creative editing</div><div class="skill-sub">Basic image edits for ad creatives, resizing, brand colour application. Ken handles full creative production — Canva is for quick edits only.</div></div>
          <div class="skill-label">Score /5</div>
          <div class="dot req"></div><div class="dot req"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
        </div>
      </div>
    </div>
    <div class="mt-8" style="font-size:10px; color:var(--muted2); padding-left:4px;">● filled = required proficiency level &nbsp;|&nbsp; ○ empty = bonus</div>
  </div>

  <!-- ── Section 3: Behavioral Traits ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">3</div>
      <div>
        <div class="section-title">Behavioral Traits — Non-Negotiables</div>
        <div class="section-sub">What separates adequate hires from great ones in this specific role</div>
      </div>
    </div>
    <div class="cards">
      <div class="card">
        <div class="card-icon">👑</div>
        <div class="card-title">Extreme Ownership</div>
        <div class="card-body">Wins and losses both belong to them — no blame-shifting to the platform, the creative team, or the client. When an account is red, they diagnose it, act on it, and update Jonathan with a plan before anyone asks. A-player standard: problems surface up with a proposed solution attached, not just a question.</div>
      </div>
      <div class="card">
        <div class="card-icon">💼</div>
        <div class="card-title">Revenue Partner Mindset</div>
        <div class="card-body">Treats their client book like their own business — not a list of tickets to manage. Proactively pursues testimonials, referrals, ad spend upsells, and cycle renewals. Understands that every retained client compounds. The book is the scorecard: grow it or it shrinks. Not a customer service rep — a revenue operator.</div>
      </div>
      <div class="card">
        <div class="card-icon">📞</div>
        <div class="card-title">Narrative Management (50/50)</div>
        <div class="card-body">50% of the job is results, 50% is narrative — keeping the client's story aligned with reality. Pre-handles objections before they arise ("someone's going to tell you leads are slow — bring it to me first"). Doesn't wait for a client to call with a complaint. Inoculates against outside doubt on the setup call, not mid-crisis.</div>
      </div>
      <div class="card">
        <div class="card-icon">🔬</div>
        <div class="card-title">Diagnostic, Not Reactive</div>
        <div class="card-body">Applies Layer 1 → Layer 2 → Layer 3 thinking before touching anything. If Layer 1 (bookings vs target) is green, they stop — they don't tweak campaigns because something looks interesting. If Layer 1 is red, they drill one metric at a time, pick the biggest lever, pull it, and verify. No random changes, no "boiling the ocean."</div>
      </div>
      <div class="card">
        <div class="card-icon">📋</div>
        <div class="card-title">Process & Documentation Discipline</div>
        <div class="card-body">Mon/Thu status updates in Slack (per account: cycle #, day of 28, bookings vs target, health colour, action with due date). All specialist requests via ClickUp with full context. Onboarding post-call checklist completed within 1 hour. The paper trail IS the job — if it's not documented, it didn't happen.</div>
      </div>
      <div class="card">
        <div class="card-icon">⚡</div>
        <div class="card-title">Speed & Accountability</div>
        <div class="card-body">Billing failure = call the client the same day, every time. Unresolved blockers escalate on a 24/48-hour clock: 0–24h message the owner, 24–48h switch channels, 48h+ escalate to Jonathan with a paper trail. Response SLA to clients: same day. Slack response: 5–30 minutes during business hours. No client ever discovers a problem before this person does.</div>
      </div>
    </div>
  </div>

  <!-- ── Section 4: Role-Specific Knowledge ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">4</div>
      <div>
        <div class="section-title">Differentiating Experience</div>
        <div class="section-sub">Nice-to-have — candidates with these will ramp significantly faster</div>
      </div>
    </div>
    <div class="two-col">
      <div class="col-box">
        <div class="col-box-title">Industry Background</div>
        <ul class="check">
          <li>Home services / contractor marketing (roofing, HVAC, plumbing, siding)</li>
          <li>B2C lead generation — not e-commerce / DTC (completely different optimization mindset)</li>
          <li>Appointment-setting funnels vs. product purchase funnels</li>
          <li>Seasonal campaign management (roofing slows in winter — they need to handle this conversation with clients)</li>
        </ul>
      </div>
      <div class="col-box">
        <div class="col-box-title">Scale & Depth</div>
        <ul class="check">
          <li>Managed $5K–$30K/month in ad spend per individual client account</li>
          <li>Simultaneously managed 20–30 accounts at full capacity</li>
          <li>Has managed or supervised a VA / call center team in a lead gen context</li>
          <li>Experience building landing pages (not just Facebook lead forms)</li>
          <li>Fluent in direct response copywriting principles (hooks, proof, urgency)</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ── Section 5: Red Flags ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">5</div>
      <div>
        <div class="section-title">Red Flags — Do Not Advance</div>
        <div class="section-sub">These patterns indicate a poor fit regardless of resume strength</div>
      </div>
    </div>
    <div class="cards" style="grid-template-columns:1fr;">
      <table>
        <thead>
          <tr>
            <th>Red Flag</th>
            <th>Why It's Disqualifying</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="td-label text-red">Only e-commerce / DTC experience</td>
            <td class="td-muted">ROAS-first optimization logic is wrong for local B2C lead gen. Will apply the wrong benchmarks and framework to client accounts.</td>
          </tr>
          <tr>
            <td class="td-label text-red">"I mostly boost posts" or organic-first background</td>
            <td class="td-muted">No structured campaign architecture experience. Cannot set up ad sets, configure targeting, or read performance data at the required level.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Vague about GHL — can't describe a specific workflow</td>
            <td class="td-muted">GHL is used daily for every client account. "Familiar with it" or "I've heard of it" is not acceptable. Must have built something real in it.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Wants to "build their own strategy" / questions every SOP</td>
            <td class="td-muted">This role executes a proven system. Strategic input is welcomed over time, but early on, SOPs are non-negotiable. A "I'd do it differently" mentality creates chaos at scale.</td>
          </tr>
          <tr>
            <td class="td-label text-red">No examples of managing multiple simultaneous accounts</td>
            <td class="td-muted">Managing one large brand in-house is fundamentally different from juggling 20–30 smaller accounts at once. The context-switching, triage, and prioritization skills don't transfer the same way.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Reactive communicator — needs to be chased down</td>
            <td class="td-muted">Pod Managers are the main point of contact for clients. Slow or chased responses directly damage client retention and trust.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Only in-house / single-brand experience</td>
            <td class="td-muted">Agency execution pace is 3–5x higher. Managing 20–30 accounts is not 20x harder — it requires a completely different operating rhythm that in-house experience rarely builds.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Thinks "cost per lead" is the primary KPI</td>
            <td class="td-muted">At RoofIgnite the metric is cost per booked appointment, not cost per lead. A candidate anchored on CPL is using the wrong framework and will misdiagnose account health from day one.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Wants to create their own ad strategy / questions proven creative systems</td>
            <td class="td-muted">Proven copy and creatives are provided. The role is execution, optimization, and coordination — not creative strategy. Someone who needs to "put their stamp on it" will create chaos in a system built for repeatability at scale.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Currently running or actively growing their own agency / freelance client roster</td>
            <td class="td-muted">This is a full-commitment, non-compete role. RoofIgnite provides the book of business — candidates cannot be building a competing business on the side. Any outside competition is a direct conflict of interest and is subject to penalty or termination. Ask directly: "Do you currently have your own clients or agency you're running?" A yes without a clear plan to wind it down is a disqualifier.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Looking for a side income stream or bridge role</td>
            <td class="td-muted">The hours, pace, and commitment required make this incompatible with a side gig mentality. This role demands full professional bandwidth — someone treating it as supplemental income will underperform and damage the client book.</td>
          </tr>
          <tr>
            <td class="td-label text-red">Wants stability over growth — "9-to-5" mindset</td>
            <td class="td-muted">RoofIgnite is a startup scaling 3x+ in revenue. Processes change. Weeks vary. The role rewards ownership and adaptability — candidates who need rigid structure, minimal hours, or a highly predictable environment will not thrive here.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ── Section 6: Screening Questions ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">6</div>
      <div>
        <div class="section-title">Screening Interview Questions</div>
        <div class="section-sub">Ask all 6 — the answers reveal real competency far better than resume claims</div>
      </div>
    </div>
    <div class="questions">
      <div class="question-block">
        <div class="q-num">Question 01 · Facebook Ads Architecture</div>
        <div class="q-text">"Walk me through how you'd set up a Facebook campaign from scratch for a new roofing client. What objective, targeting approach, and budget structure would you use?"</div>
        <div class="q-look">Looking for: Lead Generation objective (not Conversions/Sales), local radius targeting around the client's service area, ABO vs. CBO reasoning, awareness that roofing clients need appointment volume not website traffic. <strong>Red flag:</strong> mentions ROAS, pixel-based retargeting as primary strategy, or broad targeting as a positive.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 02 · Account Troubleshooting</div>
        <div class="q-text">"Tell me about a client account that was underperforming. What did you diagnose, what specifically did you change, and what happened?"</div>
        <div class="q-look">Looking for: Systematic diagnostic process (creative fatigue? audience exhaustion? landing page issue? follow-up gap?), specific changes made (not just "tweaked the audience"), and measured outcome. <strong>Red flag:</strong> vague answer, can't remember specifics, or blames the client / platform.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 03 · Diagnostic Thinking (Layer 1/2/3)</div>
        <div class="q-text">"A client is on Day 18 of their 28-day cycle and at 40% of their booking target. Walk me through exactly how you'd diagnose the account and what you'd do."</div>
        <div class="q-look">Looking for: Layer 1 check first (bookings vs target — confirmed red). Layer 2 drill (CPM high? CTR low? Survey completion low? VA booking rate low? OSA% high?). Layer 3 lever based on the actual broken metric (creative refresh? survey shortening? speed to lead fix?). Escalation to Jonathan same day for a red account this deep in cycle. <strong>Red flag:</strong> immediately suggests changing the audience or killing the campaign without first diagnosing which layer is broken. Random changes, not structured diagnosis.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 04 · Difficult Client Handling</div>
        <div class="q-text">"Describe a time a client was upset about results. What happened, what did you say, and what was the outcome?"</div>
        <div class="q-look">Looking for: Proactive communication (ideally they caught it before the client complained), data-backed confidence in the conversation (showing numbers, explaining what's being done), no blame-shifting to the platform or creative team. <strong>Red flag:</strong> says "I escalated it to my manager" as the only action taken, or describes placating the client without a real plan.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 05 · Multi-Account Day Management</div>
        <div class="q-text">"How do you structure your day when you're managing 20–30 active client accounts? Walk me through a typical Monday morning."</div>
        <div class="q-look">Looking for: Structured triage first thing (dashboard check, red-flag accounts first), scheduled check-in cadence, task management system (ClickUp or equivalent), not reactive firefighting. <strong>Red flag:</strong> "I just check in when something goes wrong" — reactive, not proactive operating model.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 06 · VA / Team Accountability</div>
        <div class="q-text">"Have you managed VAs or a call center team? How did you keep them accountable without micromanaging every call?"</div>
        <div class="q-look">Looking for: Clear KPIs set for the VA team (call volume, follow-up timing, booking rate), regular check-in cadence, tools used for visibility (CRM tracking, call logs). <strong>Red flag:</strong> "I just told them what to do" with no system, or never managed a remote team at all.</div>
      </div>
      <div class="question-block">
        <div class="q-num">Question 07 · Client Narrative / Relationship Management</div>
        <div class="q-text">"Midway through a client's second cycle, results are fine but they tell you they've been talking to someone who says Facebook ads don't work for roofing. How do you handle it?"</div>
        <div class="q-look">Looking for: Recognition that this is a "little birdie" situation — someone external is whispering doubt. The right move is to pull out the data, re-anchor on the numbers, and remind the client of what they agreed to. Ideally they pre-handled this on the onboarding call ("if someone tells you leads are slow, bring it to me first"). <strong>Red flag:</strong> gets defensive, dismisses the concern, or doesn't have a structured way to handle narrative drift. This is the 50% of the job that isn't in any ad manager dashboard.</div>
      </div>
    </div>
  </div>

  <!-- ── Section 7: Scoring ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">7</div>
      <div>
        <div class="section-title">Candidate Scoring Rubric</div>
        <div class="section-sub">Complete after screening call — use to prioritize who to advance</div>
      </div>
    </div>
    <div class="rubric">
      <div class="rubric-row header">
        <span style="flex:1;">Competency</span>
        <span style="width:50px;text-align:right;">Weight</span>
        <span style="width:70px;text-align:right;">Max Score</span>
        <span style="width:58px;text-align:right;">Actual</span>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">Facebook / Meta Ads Proficiency<br><span style="font-size:10px;color:var(--muted);">Campaign structure, optimization, lead gen logic, creative decisions</span></div>
        <div class="rubric-weight">25%</div>
        <div class="rubric-score">25 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">GoHighLevel / Technical CRM Operations<br><span style="font-size:10px;color:var(--muted);">Sub-accounts, workflows, automations, landing pages</span></div>
        <div class="rubric-weight">20%</div>
        <div class="rubric-score">20 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">Client Communication & Relationship Management<br><span style="font-size:10px;color:var(--muted);">Proactivity, difficult conversations, check-in discipline</span></div>
        <div class="rubric-weight">20%</div>
        <div class="rubric-score">20 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">Process Discipline & SOP Execution<br><span style="font-size:10px;color:var(--muted);">Can they follow systems without ego? Do they document?</span></div>
        <div class="rubric-weight">15%</div>
        <div class="rubric-score">15 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">Performance Analysis & Reporting<br><span style="font-size:10px;color:var(--muted);">Reads data, makes logical decisions, communicates results to clients</span></div>
        <div class="rubric-weight">10%</div>
        <div class="rubric-score">10 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row">
        <div class="rubric-cat">VA / Internal Team Management<br><span style="font-size:10px;color:var(--muted);">Setting KPIs, accountability systems, delegation quality</span></div>
        <div class="rubric-weight">10%</div>
        <div class="rubric-score">10 pts</div>
        <div class="score-box"></div>
      </div>
      <div class="rubric-row total">
        <div class="rubric-cat bold">Total Score</div>
        <div class="rubric-weight">100%</div>
        <div class="rubric-score">100 pts</div>
        <div class="score-box"></div>
      </div>
    </div>
    <div class="thresholds">
      <div class="threshold advance">
        <div class="threshold-score">70+</div>
        <div class="threshold-label">Advance to Interview</div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px;">No hard gate failures</div>
      </div>
      <div class="threshold priority">
        <div class="threshold-score">85+</div>
        <div class="threshold-label">Priority Candidate</div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px;">Fast-track to RoofIgnite team</div>
      </div>
    </div>
  </div>

  <!-- ── Section 8: Voice Recording Eval ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">8</div>
      <div>
        <div class="section-title">Evaluating the 60-Second Voice Recording</div>
        <div class="section-sub">This is a client-facing role — communication quality IS a performance metric</div>
      </div>
    </div>
    <div class="rec-grid">
      <div class="rec-card green">
        <div class="rec-card-title">✓ Green Flags</div>
        <ul class="rec-list">
          <li>Clear, confident, concise — gets to the point within 15 seconds</li>
          <li>Mentions specific metrics or results ("I managed $400K/month, dropped CPL by 35%")</li>
          <li>Sounds like someone who could reassure a stressed roofing contractor on a call</li>
          <li>Professional audio environment — no background noise, shows attention to detail</li>
          <li>Natural energy — not robotic or over-rehearsed</li>
        </ul>
      </div>
      <div class="rec-card yellow">
        <div class="rec-card-title">⚠ Yellow Flags</div>
        <ul class="rec-list">
          <li>Scripted reading — may struggle with live, unscripted client calls</li>
          <li>Vague about results ("worked with Facebook ads for a few years")</li>
          <li>Mentions only personal brand / freelance projects without agency context</li>
          <li>Strong accent but comprehensible — flag for client communication assessment</li>
        </ul>
      </div>
      <div class="rec-card red">
        <div class="rec-card-title">✕ Red Flags</div>
        <ul class="rec-list">
          <li>Difficult to understand — client-facing English fluency is required</li>
          <li>No energy, flat delivery — will not inspire client confidence</li>
          <li>Rambles past 90 seconds without a clear point</li>
          <li>Didn't submit one — shows low motivation or difficulty following instructions</li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ── Section 9: Ideal Candidate Profile ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">9</div>
      <div>
        <div class="section-title">Ideal Candidate Profile Summary</div>
        <div class="section-sub">Use this as a north star when comparing candidates</div>
      </div>
    </div>
    <div class="ideal-box">
      <p>The ideal RoofIgnite Pod Manager has spent <strong style="color:#fff;">2–4 years at a performance marketing agency</strong> running paid social for local service businesses — ideally home services (roofing, HVAC, contractors). They've managed <strong style="color:#fff;">20–30 client accounts simultaneously at full capacity</strong>, each at $3K–$20K/month in ad spend, and have seen the full lifecycle: onboarding, campaign launch, performance optimization, troubleshooting, and cycle renewal. They understand that the primary metric is <strong style="color:#fff;">cost per booked appointment</strong> — not cost per lead, not ROAS. They know what a struggling account looks like before the client calls to complain, and they diagnose it layer by layer rather than making random changes. They've built real GHL workflows — not just set up a pipeline. They communicate in a way that makes roofing business owners feel informed and confident, and they pre-handle doubt before it becomes a mid-cycle crisis. They are a <strong style="color:#fff;">revenue partner</strong>, not an account manager — their book is their business, and they grow it through retention, referrals, and proactive upsells. They are <strong style="color:#fff;">energized by a fast-moving, high-growth environment</strong>, not looking for a stable 9-to-5. Above all, they respect a well-built system, execute it precisely, and make it better over time.</p>
      <div class="ideal-titles">
        <div style="font-size:10px;font-weight:800;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-right:4px;line-height:2;">Titles they may currently hold:</div>
        <span class="title-tag">Media Buyer (Agency)</span>
        <span class="title-tag">Performance Marketing Manager</span>
        <span class="title-tag">Paid Social Specialist</span>
        <span class="title-tag">Client Success Manager (w/ ads execution)</span>
        <span class="title-tag">Digital Marketing Manager (Agency)</span>
        <span class="title-tag">Account Manager — Paid Media</span>
      </div>
    </div>
  </div>

  <!-- ── Compensation ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">→</div>
      <div>
        <div class="section-title">Compensation & Role Details</div>
        <div class="section-sub">Revenue share model — share with candidates post-screening</div>
      </div>
    </div>

    <!-- OTE headline banner -->
    <div class="comp-banner" style="margin-bottom:14px;">
      <div class="comp-item">
        <div class="comp-val">$72K</div>
        <div class="comp-key">Base Salary (CAD/yr)</div>
      </div>
      <div class="comp-divider"></div>
      <div class="comp-item">
        <div class="comp-val">$105K–$134K+</div>
        <div class="comp-key">OTE Range (CAD/yr)</div>
      </div>
      <div class="comp-divider"></div>
      <div class="comp-item">
        <div class="comp-val">2%</div>
        <div class="comp-key">Monthly retainer commission (all clients)</div>
      </div>
      <div class="comp-divider"></div>
      <div class="comp-item">
        <div class="comp-val">100% Remote</div>
        <div class="comp-key">Work Location</div>
      </div>
      <div class="comp-divider"></div>
      <div class="comp-item">
        <div class="comp-val">Full-Time</div>
        <div class="comp-key">Employment Type</div>
      </div>
    </div>

    <!-- How it works callout -->
    <div style="background:#0D0D1A;border:1px solid #3B82F633;border-radius:12px;padding:16px 18px;margin-bottom:14px;font-size:12px;color:var(--muted);line-height:1.7;">
      <span style="color:#fff;font-weight:800;">How it works:</span> This is a revenue share model, not a simple bonus. The CSM earns <strong style="color:#fff;">2% of collected retainer revenue from every client in their book, every month</strong>. A 25-client book at a $4,000 average retainer generates $2,000/month in commission on top of base. The more clients they retain, the more their book grows, the more they earn — no ceiling.
    </div>

    <!-- OTE by book size table -->
    <table style="margin-bottom:14px;">
      <thead>
        <tr>
          <th>Book Size</th>
          <th>Churn Rate</th>
          <th>Monthly Commission</th>
          <th>Milestone Bonuses</th>
          <th>Performance Levers</th>
          <th style="color:#F5C800;">Total OTE (CAD/yr)</th>
          <th>Monthly Take-Home</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-label">20 clients</td>
          <td class="td-muted">5.2% avg</td>
          <td class="td-muted">$1,600/mo</td>
          <td class="td-muted">$6,000/yr</td>
          <td class="td-muted">~$7,900/yr</td>
          <td style="color:var(--green);font-weight:800;">~$105,100</td>
          <td class="td-muted">~$8,760/mo</td>
        </tr>
        <tr>
          <td class="td-label">25 clients <span style="background:#1A1400;color:var(--gold);font-size:8px;font-weight:800;padding:2px 6px;border-radius:4px;margin-left:6px;">TARGET</span></td>
          <td class="td-muted">3.5% strong</td>
          <td class="td-muted">$2,000/mo</td>
          <td class="td-muted">$7,500/yr</td>
          <td class="td-muted">~$16,500/yr</td>
          <td style="color:var(--gold);font-weight:800;">~$120,000</td>
          <td class="td-muted">~$10,000/mo</td>
        </tr>
        <tr>
          <td class="td-label">30 clients</td>
          <td class="td-muted">2.5% elite</td>
          <td class="td-muted">$2,400/mo</td>
          <td class="td-muted">$9,300/yr</td>
          <td class="td-muted">~$23,600/yr</td>
          <td style="color:#A78BFA;font-weight:800;">~$133,700</td>
          <td class="td-muted">~$11,140/mo</td>
        </tr>
      </tbody>
    </table>

    <!-- Earning levers -->
    <div style="font-size:11px;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">What Drives the Variable Comp</div>
    <table>
      <thead>
        <tr>
          <th>Lever</th>
          <th>Structure</th>
          <th>Earning Potential</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-label">2% Retainer Commission</td>
          <td class="td-muted">2% of every client's monthly retainer, paid on collected revenue</td>
          <td class="td-muted">$19,200–$28,800/yr at 20–30 clients</td>
        </tr>
        <tr>
          <td class="td-label">Client Milestone Bonus</td>
          <td class="td-muted">$150 when client completes Cycle 1 · $100 when client completes Cycle 2</td>
          <td class="td-muted">$6,000–$9,300/yr (3 new clients/month, strong retention)</td>
        </tr>
        <tr>
          <td class="td-label">Fast Launch Bonus</td>
          <td class="td-muted">$50 within 7 days of close · $25 within 14 days · $0 after 14 days</td>
          <td class="td-muted">Up to $1,800/yr (3 clients/month launching on time)</td>
        </tr>
        <tr>
          <td class="td-label">Onboarding Quality Bonus</td>
          <td class="td-muted">$50 at 90%+ QA score · $25 at 80–89% · $0 below 80%</td>
          <td class="td-muted">Up to $1,800/yr (3 onboardings/month at 90%+)</td>
        </tr>
        <tr>
          <td class="td-label">Referral & Testimonial</td>
          <td class="td-muted">$500 per referral that closes · $250 per video testimonial (uncapped)</td>
          <td class="td-muted">Uncapped — reflects relationship quality</td>
        </tr>
        <tr>
          <td class="td-label">Ad Spend Upsell</td>
          <td class="td-muted">10% of monthly management fee when client ad spend exceeds $200/day — ongoing</td>
          <td class="td-muted">$8,000–$9,000/yr across 9–10 accounts above threshold</td>
        </tr>
      </tbody>
    </table>

    <div style="background:var(--surf);border:1px solid var(--border);border-radius:10px;padding:12px 16px;margin-top:12px;font-size:11px;color:var(--muted);line-height:1.65;">
      <strong style="color:#fff;">Key note for candidates:</strong> Commission is calculated on <em>collected</em> retainer revenue, not invoiced. The CSM owns the payment relationship and has a direct financial incentive to keep clients current. Price concessions used to save a client are commission-protected at the original rate for 3 cycles. Full structure: <a href="https://docs.google.com/document/d/1H5NYHSFK4PBrSj259_d7ijWuY5Q9SST7DNeFQWqK0Lg/edit?usp=drive_link" target="_blank" style="color:var(--gold);text-decoration:none;">Compensation Structure Doc ↗</a>
    </div>
  </div>

  <!-- ── Terminology ── -->
  <div class="section">
    <div class="section-header">
      <div class="section-num">→</div>
      <div>
        <div class="section-title">Key Terminology — For Recruiter Reference</div>
        <div class="section-sub">Terms you'll hear in interviews and in the role — use these to probe depth during screening</div>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Term</th>
          <th>What It Means</th>
          <th>Why It Matters in Screening</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="td-label">Layer 1 / Layer 2 / Layer 3</td>
          <td class="td-muted">Diagnostic framework: L1 = outcomes (bookings vs target), L2 = drivers (CPM, CTR, survey rate, VA booking rate), L3 = levers to pull (creative refresh, survey shortening, speed to lead). If L1 is green, don't touch L2.</td>
          <td class="td-muted">A candidate who thinks diagnostically in this structure will ramp in weeks, not months</td>
        </tr>
        <tr>
          <td class="td-label">Cost Per Booked Appointment</td>
          <td class="td-muted">The primary metric — ad spend divided by confirmed booked appointments. NOT cost per lead, NOT ROAS. Candidates from e-commerce backgrounds often anchor on ROAS or CPL, which is the wrong framework.</td>
          <td class="td-muted">Ask what metric they optimise toward — wrong answer = CPL or ROAS</td>
        </tr>
        <tr>
          <td class="td-label">Death Valley</td>
          <td class="td-muted">Days 7–21 after a client launches. 60% of all client churn originates in this window. The Cycle 1 and Cycle 2 milestone bonuses exist specifically to reward getting clients through it.</td>
          <td class="td-muted">Strong candidates will recognise this danger zone without being told</td>
        </tr>
        <tr>
          <td class="td-label">80% Rule</td>
          <td class="td-muted">RoofIgnite only bills a client if it delivers at least 80% of the contracted appointment target. If 20 appointments were agreed, 16 is the billing minimum. Below that, the cycle extends at no charge.</td>
          <td class="td-muted">Shows the company's accountability model — good candidates see this as motivating, not risky</td>
        </tr>
        <tr>
          <td class="td-label">28-Day Cycle</td>
          <td class="td-muted">All client contracts run on 28-day performance billing cycles. Renewal is confirmed 5–7 days before cycle end. "Cycle 1 renewal" and "Cycle 2 renewal" are milestone bonus triggers.</td>
          <td class="td-muted">Different from monthly retainer mindset — requires active renewal management every 28 days</td>
        </tr>
        <tr>
          <td class="td-label">OSA Rate</td>
          <td class="td-muted">Out-of-Service-Area lead rate. If &gt;20% of leads come from outside the client's service area, it's a targeting issue that must be fixed — these leads can't convert.</td>
          <td class="td-muted">Layer 2 metric — candidates who know this metric understand local service business nuances</td>
        </tr>
        <tr>
          <td class="td-label">Command Centre</td>
          <td class="td-muted">Internal dashboard showing all accounts with 🟢🟡🟠🔴 health status. Opened first thing every morning — it's the daily triage starting point, not email or Slack.</td>
          <td class="td-muted">Morning triage discipline is non-negotiable. Ask how they start their day.</td>
        </tr>
        <tr>
          <td class="td-label">A2P / 10DLC</td>
          <td class="td-muted">GHL phone number registration for business SMS. Not Meta-related. Handled by Emmanuel. Rejection means a 2–3 week SMS lockout — getting it right on setup matters.</td>
          <td class="td-muted">Advanced GHL knowledge indicator — few candidates will know this without real GHL experience</td>
        </tr>
        <tr>
          <td class="td-label">KRS / Gutter Shutter</td>
          <td class="td-muted">Preferred brand partner franchise networks. Billed at $3,300/cycle (not the standard $4,000). Must be identified before the onboarding call — wrong billing rate causes revenue issues.</td>
          <td class="td-muted">Attention to detail and ICP knowledge — they need to verify franchise status on every new client</td>
        </tr>
        <tr>
          <td class="td-label">Logbook</td>
          <td class="td-muted">Central Google Sheet documenting every lead across every account. Maintained by the VA team. The Pod Manager reads it to understand lead quality and VA performance — it's the ground truth for diagnosing Layer 2 issues.</td>
          <td class="td-muted">Data literacy and systems discipline — candidates who manage by gut feel won't use it</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ── Footer ── -->
  <div class="footer">
    <div class="footer-brand">ROOFIGNITE · CONFIDENTIAL</div>
    <div class="footer-note">Prepared for recruiting agency use only · May 2026 · Do not distribute to candidates</div>
  </div>

</div>
</body>
</html>
`;
