'use client';
import { RECRUITER_GUIDE_HTML } from '@/lib/recruiter-guide-html';

export default function RecruiterGuideClient() {
  return (
    <iframe
      srcDoc={RECRUITER_GUIDE_HTML}
      style={{ width: '100%', height: '100vh', border: 'none', display: 'block' }}
      title="Pod Manager Hiring Criteria Guide"
    />
  );
}
