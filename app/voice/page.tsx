import type { Metadata } from 'next';
import VoiceClient from './client';

export const metadata: Metadata = {
  title: 'Team Voice — RoofIgnite',
  description: 'Share ideas and feedback anonymously. No login required.',
  robots: { index: false, follow: false },
};

export default function VoicePage() {
  return <VoiceClient />;
}
