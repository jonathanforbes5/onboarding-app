import type { Metadata } from 'next';
import RecruiterGuideClient from './client';

export const metadata: Metadata = {
  title: 'Pod Manager Hiring Criteria Guide — RoofIgnite',
  robots: { index: false, follow: false },
};

export default function RecruiterGuidePage() {
  return <RecruiterGuideClient />;
}
