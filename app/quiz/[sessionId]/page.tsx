import type { Metadata } from 'next';
import { StandaloneQuizClient } from './client';

export const metadata: Metadata = {
  title: 'Knowledge Check — RoofIgnite Media Buying',
  robots: { index: false, follow: false },
};

export default function QuizPage({ params }: { params: { sessionId: string } }) {
  return <StandaloneQuizClient sessionId={Number(params.sessionId)} />;
}
