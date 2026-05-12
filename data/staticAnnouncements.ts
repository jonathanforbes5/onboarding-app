export interface Announcement {
  id: string;
  title: string;
  body: string;
  link_url: string | null;
  loom_url: string | null;
  image_url: string | null;
  created_by: string;
  created_at: string;
  published: boolean;
}

// Announcements baked into the client bundle so they always appear in
// What's New and the mandatory popup — regardless of whether the Supabase
// announcements table exists yet.  Use stable string IDs (never UUIDs) so
// seen-state persists correctly across deploys.
export const STATIC_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'static_landing_page_v2_2026_05',
    title: 'Landing Page v2 Tutorial — SOP + Video Now Live',
    body: "Cole just dropped the new Landing Page v2 tutorial. There's a full written SOP and a Loom walkthrough covering the complete build flow end-to-end. Find both in Resources → SOPs (filter by Onboarding or Service Delivery).",
    link_url: 'https://docs.google.com/document/d/1T9aEbXitLV6XZkRCnYD8_7CX3_isp6okUEIxipZIGpQ/edit?tab=t.0',
    loom_url: 'https://www.loom.com/share/56ad708c46c24e138d0ba954b976c13d',
    image_url: null,
    created_by: 'Cole Yedema',
    created_at: '2026-05-12T00:00:00Z',
    published: true,
  },
];

/** Merge DB announcements with static ones, deduplicating by ID, sorted newest first. */
export function mergeAnnouncements(fromDb: Announcement[]): Announcement[] {
  const dbIds = new Set(fromDb.map(a => a.id));
  const extras = STATIC_ANNOUNCEMENTS.filter(s => !dbIds.has(s.id));
  return [...fromDb, ...extras].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}
