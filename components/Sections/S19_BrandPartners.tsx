'use client';
import React from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Card, InfoBox } from '@/components/UI/Card';

interface Partner {
  id: string;
  name: string;
  hierarchy: string;
  pricing: string;
  pricingNote: string;
  origin: string;
  howToTreat: string;
  watchOut: string;
  status: 'verified' | 'needs-detail';
}

const PARTNERS: Partner[] = [
  {
    id: 'krs',
    name: 'Klaus Roofing Systems (KRS)',
    hierarchy: 'A dealer network under the parent group. Sister brand to Gutter Shutter.',
    pricing: '$3,300 / cycle',
    pricingNote: 'Preferred-partner discount vs. our $4,000 standard.',
    origin: 'We did a great job for Close Roofing of Greater Buffalo and Klaus Roofing of Texas Hill Country. KRS leadership saw the work, then started referring us to other dealers in their network — who all get preferred pricing as part of the partner relationship.',
    howToTreat: 'Always check on the onboarding call: "are you a KRS dealer?" If yes, the pricing structure is different — confirm with Jon / Oscar before quoting. Same delivery model, special rate.',
    watchOut: 'KRS dealers often have brand-standard creative requirements (logos, colors). Pull their brand kit during onboarding so Ken / the media buyer don\'t produce off-brand creatives that get rejected.',
    status: 'verified',
  },
  {
    id: 'gs',
    name: 'Gutter Shutter (GS)',
    hierarchy: 'Sister brand to KRS — both sit under the same parent group.',
    pricing: '$3,300 / cycle',
    pricingNote: 'Same preferred-partner discount as KRS.',
    origin: 'Same dynamic as KRS — we delivered for early dealers, the network started referring. Most GS clients are gutter-focused but some run combined roofing + gutter offers.',
    howToTreat: 'Lead with their gutter-specific lead economics ($1K–$5K average job vs. $8K–$30K roofing). Volume play. They need 2–3x the lead count vs. roofing for the same revenue. Set CPA expectations accordingly.',
    watchOut: 'Don\'t apply roofing playbooks 1:1 to GS. The qualification survey, ad creative, and VA script all need volume-mode tweaks.',
    status: 'verified',
  },
  {
    id: 'stonegrove',
    name: 'Stonegrove',
    hierarchy: 'Private equity firm with a portfolio of roofing companies (separate from KRS / GS).',
    pricing: 'Preferred pricing — confirm exact rate with Oscar / Jon per deal.',
    pricingNote: 'Network-wide preferred-partner relationship.',
    origin: 'Initially referred to us by Bill Wright / Tanner — owners of Integrity Roofing in Seattle (one of our clients). After we delivered for them, they referred us into the broader Stonegrove dealer network. Stonegrove portfolio companies get preferred pricing because of this referral relationship.',
    howToTreat: 'Treat Stonegrove dealers as long-term relationships, not one-off cycles. The PE backing means decisions can move slowly but spend tends to be larger when committed. Communication can route through portfolio operators rather than the dealer directly.',
    watchOut: 'GNH Roofs (Logan Kulhanek) is an active Stonegrove partner client — flag if anything feels off, the relationship has reach. Ownership / decision-maker changes happen more often in PE-backed shops — watch for "change in ownership" churn signals (we have lost 2 accounts that way).',
    status: 'verified',
  },
];

const STATUS_BADGE: Record<Partner['status'], { bg: string; fg: string; label: string }> = {
  verified:       { bg: '#22C55E', fg: '#fff',   label: 'Verified' },
  'needs-detail': { bg: '#F59E0B', fg: '#000',   label: 'Needs detail' },
};

export function S19_BrandPartners() {
  return (
    <SectionWrapper sectionId={19}>

      <InfoBox type="tip" title="Why this matters">
        A meaningful slice of our client roster sits under <strong>preferred-partner relationships</strong>. The pricing,
        relationship dynamic, and creative requirements are different — and getting them right is non-negotiable. These are
        relationships earned through past performance. Don&apos;t break them.
      </InfoBox>

      <div className="space-y-4">
        {PARTNERS.map((p) => {
          const badge = STATUS_BADGE[p.status];
          return (
            <div key={p.id} className="rounded-xl overflow-hidden border border-brand-gray-mid">
              <div className="bg-brand-black text-white px-4 py-3 flex items-center justify-between gap-2 flex-wrap">
                <div>
                  <div className="font-black text-base">{p.name}</div>
                  <div className="text-[11px] text-white/60">{p.hierarchy}</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest"
                      style={{ backgroundColor: badge.bg, color: badge.fg }}>
                  {badge.label}
                </span>
              </div>

              <div className="bg-white px-4 py-3 space-y-2.5">
                <div className="rounded-lg bg-brand-yellow px-3 py-2">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-black/60">Pricing</div>
                  <div className="font-black text-sm text-brand-black">{p.pricing}</div>
                  <div className="text-[11px] text-brand-black/70">{p.pricingNote}</div>
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">How the relationship started</div>
                  <div className="text-xs text-brand-black mt-0.5 leading-relaxed">{p.origin}</div>
                </div>

                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">How to treat them</div>
                  <div className="text-xs text-brand-black mt-0.5 leading-relaxed">{p.howToTreat}</div>
                </div>

                <div className="rounded-lg bg-red-50 border-l-4 border-red-400 px-2.5 py-1.5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-red-700">Watch out for</div>
                  <div className="text-xs text-red-900 mt-0.5">{p.watchOut}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <InfoBox type="warning" title="Before any onboarding call">
        Always ask: <strong>&quot;Are you part of any dealer network — KRS, Gutter Shutter, Stonegrove?&quot;</strong>
        If yes, pause before quoting and confirm pricing with Jon or Oscar. Quoting standard pricing to a partner client is
        an awkward correction. Quoting partner pricing to a non-partner client is a permanent revenue leak.
      </InfoBox>

    </SectionWrapper>
  );
}
