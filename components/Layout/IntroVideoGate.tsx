'use client';
import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

const STORAGE_KEY = 'ri_intro_video_watched_v1';

// TODO[OSCAR]: replace with the real Loom URL once Jon (or Oscar) records it.
// Set NEXT_PUBLIC_INTRO_VIDEO_URL in Vercel and it'll override this default.
const FALLBACK_URL = 'https://www.loom.com/embed/PLACEHOLDER';

const MIN_VIEW_SECONDS = 30;

function isLoomUrl(url: string) {
  return /loom\.com/.test(url);
}

function toEmbed(url: string) {
  // Convert /share/ → /embed/ for Loom; pass others through.
  if (isLoomUrl(url) && url.includes('/share/')) {
    return url.replace('/share/', '/embed/');
  }
  return url;
}

export function IntroVideoGate() {
  const { currentUser } = useApp();
  const envUrl = (process.env.NEXT_PUBLIC_INTRO_VIDEO_URL as string | undefined);

  const [remoteUrl, setRemoteUrl] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Check media_links for an admin-set intro video — that takes priority over the env var.
  useEffect(() => {
    fetch('/api/media-links?slot=intro_video')
      .then(r => r.ok ? r.json() : null)
      .then(j => setRemoteUrl(j?.link?.url ?? null))
      .catch(() => {});
  }, []);

  const url = remoteUrl ?? envUrl ?? FALLBACK_URL;
  const isPlaceholder = url.includes('PLACEHOLDER');

  useEffect(() => {
    if (!currentUser) return;
    const watched = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1';
    setShown(!watched);
  }, [currentUser]);

  useEffect(() => {
    if (!shown) return;
    const timer = setInterval(() => setSecondsElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [shown]);

  const markWatched = () => {
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, '1');
    setShown(false);
  };

  if (!shown || !currentUser) return null;

  const canContinue = secondsElapsed >= MIN_VIEW_SECONDS || isPlaceholder;
  const remaining = Math.max(0, MIN_VIEW_SECONDS - secondsElapsed);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.92)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          backgroundColor: '#0A0A0A',
          border: '1px solid #F5C80033',
          borderRadius: 16,
          overflow: 'hidden',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #F5C80022', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ color: '#F5C800', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              Welcome — required first step
            </div>
            <div style={{ color: '#fff', fontSize: 16, fontWeight: 900, marginTop: 2 }}>
              How To Use This Onboarding Portal
            </div>
          </div>
          <div style={{ color: '#888', fontSize: 11 }}>
            One-time only
          </div>
        </div>

        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
          {isPlaceholder ? (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, textAlign: 'center',
            }}>
              <div style={{ color: '#F5C800', fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Video not yet uploaded
              </div>
              <div style={{ color: '#ccc', fontSize: 14, maxWidth: 540, lineHeight: 1.6 }}>
                Jon is recording a 5-minute walkthrough of how to use this portal. Once it&apos;s in,
                this gate will play it on first login. For now you can continue.
              </div>
            </div>
          ) : (
            <iframe
              src={toEmbed(url)}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Roof Ignite onboarding portal walkthrough"
            />
          )}
        </div>

        <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ color: '#888', fontSize: 12 }}>
            {isPlaceholder
              ? 'Placeholder — gate is staged but the real video isn’t in yet.'
              : canContinue
                ? 'You can continue now. Re-watch any time from your profile.'
                : `Stay here ${remaining}s before you can continue.`}
          </div>
          <button
            onClick={markWatched}
            disabled={!canContinue}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              border: 'none',
              fontWeight: 800,
              fontSize: 13,
              cursor: canContinue ? 'pointer' : 'not-allowed',
              backgroundColor: canContinue ? '#F5C800' : '#3a3a3a',
              color: canContinue ? '#000' : '#888',
              transition: 'all 200ms',
            }}
          >
            {canContinue ? 'I watched it — continue' : 'Watching…'}
          </button>
        </div>
      </div>
    </div>
  );
}
