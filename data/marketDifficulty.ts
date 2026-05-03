// Market difficulty tier list — direct from Oscar.
// Drives: state-fill on the ClientMap, market guidance in S08, briefings before
// onboarding calls. Update here when the difficulty picture changes.

export type DifficultyTier = 'avoid' | 'hard' | 'easy' | 'great' | 'unknown';

export interface MarketEntry {
  // What the entry covers — can be a state, a metro, or a county-level area.
  area: string;
  // The state(s) the entry maps to for state-fill on the map.
  states: string[];
  tier: DifficultyTier;
  note?: string;
}

export const MARKET_ENTRIES: MarketEntry[] = [
  // AVOID — refuse the deal
  { area: 'Texas — DFW',           states: ['Texas'],     tier: 'avoid', note: 'High appt cost + low quality of lead. We have not made this work.' },
  { area: 'Texas — Houston Metro', states: ['Texas'],     tier: 'avoid', note: 'High appt cost + low quality of lead.' },
  { area: 'Hawaii',                states: ['Hawaii'],    tier: 'avoid', note: 'Geo / cost combo we have not made work.' },
  { area: 'Nashville, TN',         states: ['Tennessee'], tier: 'avoid', note: 'One failed attempt — being conservative until SD improves further.' },

  // HARD — proceed with very clear expectations and elevated pricing
  { area: 'Denver, CO + entire Colorado state', states: ['Colorado'],     tier: 'hard', note: 'High appt cost, low lead quality.' },
  { area: 'Manatee / Sarasota Counties (FL)',   states: ['Florida'],      tier: 'hard', note: 'Specific FL counties that under-perform.' },
  { area: 'Delaware',                            states: ['Delaware'],     tier: 'hard' },
  { area: 'Texas — San Antonio / New Braunfels', states: ['Texas'],        tier: 'hard', note: 'Higher costs but not horrible.' },
  { area: 'Los Angeles, CA',                     states: ['California'],   tier: 'hard' },
  { area: 'Charlotte / Raleigh, NC',             states: ['North Carolina'], tier: 'hard' },
  { area: 'Charleston, SC',                      states: ['South Carolina'], tier: 'hard' },
  { area: 'Annapolis, MD',                       states: ['Maryland'],     tier: 'hard' },
  { area: 'Northern New Jersey',                 states: ['New Jersey'],   tier: 'hard' },
  { area: 'Philadelphia / NJ / DE tri-state',    states: ['Pennsylvania', 'New Jersey', 'Delaware'], tier: 'hard', note: 'Sometimes succeeds, sometimes does not — 50/50.' },
  { area: 'Tucson, AZ',                          states: ['Arizona'],      tier: 'hard' },
  { area: 'Minneapolis / NW Wisconsin',          states: ['Minnesota', 'Wisconsin'], tier: 'hard', note: 'Not horrible, just not easy.' },

  // EASY / GREAT — typical CPA $225–$250 or even better
  { area: 'New York (most parts)',               states: ['New York'],     tier: 'great' },
  { area: 'Most of the Midwest',                 states: ['Ohio', 'Illinois', 'Missouri'], tier: 'great' },
  { area: 'San Diego, CA',                       states: ['California'],   tier: 'great' },
  { area: 'Most of Florida',                     states: ['Florida'],      tier: 'great' },
  { area: 'Most of Alabama',                     states: ['Alabama'],      tier: 'great' },
  { area: 'Atlanta, GA',                         states: ['Georgia'],      tier: 'great' },
  { area: 'Northeast (general)',                 states: ['Massachusetts', 'Connecticut', 'Rhode Island'], tier: 'great' },
  { area: 'Southeast (general)',                 states: ['Georgia', 'Alabama', 'South Carolina'], tier: 'great', note: 'South Carolina caveat: Charleston is hard — see above.' },
  { area: 'Washington / Oregon',                 states: ['Washington', 'Oregon'], tier: 'great' },

  // UNKNOWN — never had clients, no data
  { area: 'Montana',          states: ['Montana'],         tier: 'unknown' },
  { area: 'Idaho',            states: ['Idaho'],           tier: 'unknown' },
  { area: 'Wyoming',          states: ['Wyoming'],         tier: 'unknown' },
  { area: 'Utah',             states: ['Utah'],            tier: 'unknown', note: 'Mani has had issues closing on sales calls in this state.' },
  { area: 'New Mexico',       states: ['New Mexico'],      tier: 'unknown' },
  { area: 'North Dakota (excluding Fargo)', states: ['North Dakota'], tier: 'unknown' },
  { area: 'South Dakota',     states: ['South Dakota'],    tier: 'unknown' },
  { area: 'Nebraska (excluding Omaha + Sterling)', states: ['Nebraska'], tier: 'unknown' },
  { area: 'Kansas',           states: ['Kansas'],          tier: 'unknown' },
  { area: 'Iowa',             states: ['Iowa'],            tier: 'unknown', note: 'Client refunded before launch — no data.' },
  { area: 'Wisconsin (excluding NW)',  states: ['Wisconsin'], tier: 'unknown' },
  { area: 'Michigan',         states: ['Michigan'],        tier: 'unknown', note: 'Client refunded before launch — no data.' },
  { area: 'Indiana',          states: ['Indiana'],         tier: 'unknown' },
  { area: 'Kentucky',         states: ['Kentucky'],        tier: 'unknown', note: 'Sold a free trial early on but never committed to onboarding.' },
  { area: 'Mississippi',      states: ['Mississippi'],     tier: 'unknown', note: 'Sold a free trial early on but never committed to onboarding.' },
  { area: 'Louisiana',        states: ['Louisiana'],       tier: 'unknown' },
  { area: 'West Virginia',    states: ['West Virginia'],   tier: 'unknown' },
  { area: 'Vermont',          states: ['Vermont'],         tier: 'unknown' },

  // HONORABLE MENTIONS / WARNINGS
  { area: 'Minnesota (sales-call closing)', states: ['Minnesota'], tier: 'hard',    note: 'Mani has had issues closing sales calls. Different concern from delivery.' },
  { area: 'KCMO Missouri roofers',           states: ['Missouri'], tier: 'hard',    note: 'Roofers we have encountered are small-minded and never stick.' },
];

// State-level aggregate tier — picks the WORST tier among entries covering that state
// (because a state with even one "avoid" market should not be marketed as "great").
const TIER_RANK: Record<DifficultyTier, number> = { avoid: 4, hard: 3, unknown: 2, great: 1, easy: 1 };

export const STATE_TIER: Record<string, DifficultyTier> = (() => {
  const map: Record<string, DifficultyTier> = {};
  for (const e of MARKET_ENTRIES) {
    for (const s of e.states) {
      const cur = map[s];
      if (!cur || TIER_RANK[e.tier] > TIER_RANK[cur]) {
        map[s] = e.tier;
      }
    }
  }
  return map;
})();

export const TIER_LABELS: Record<DifficultyTier, string> = {
  avoid:   'Avoid',
  hard:    'Hard',
  great:   'Easy / Great',
  easy:    'Easy / Great',
  unknown: 'No data',
};

export const TIER_COLORS: Record<DifficultyTier, string> = {
  avoid:   '#7F1D1D',  // dark red
  hard:    '#EA580C',  // orange
  great:   '#16A34A',  // green
  easy:    '#16A34A',
  unknown: '#374151',  // grey
};
