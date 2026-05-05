'use client';
import React, { useEffect, useState } from 'react';

interface MiroBoardProps {
  /** Direct Miro share/embed URL. If unset, falls back to remote slotKey lookup. */
  url?: string;
  slotKey?: string;
  title: string;
  subtitle?: string;
  /** Cosmetic — e.g. "20 nodes" or "v2". */
  caption?: string;
}

function toMiroEmbed(raw: string) {
  if (!raw) return raw;

  // Already an embed URL
  if (raw.includes('/app/live-embed/')) return raw;

  // Shape: https://miro.com/app/board/<id>/?...   →   live-embed
  const boardMatch = raw.match(/miro\.com\/app\/board\/([A-Za-z0-9_=-]+)/);
  if (boardMatch) {
    return `https://miro.com/app/live-embed/${boardMatch[1]}/?embedMode=view_only_without_ui`;
  }

  // Public board share: https://miro.com/welcomeonboard/<token>
  const welcomeMatch = raw.match(/miro\.com\/welcomeonboard\/([A-Za-z0-9_=-]+)/);
  if (welcomeMatch) {
    return `https://miro.com/app/live-embed/${welcomeMatch[1]}/?embedMode=view_only_without_ui`;
  }

  // Fallback — pass through, in case Oscar pasted an embed URL we don't recognise
  return raw;
}

export function MiroBoard({ url, slotKey, title, subtitle, caption }: MiroBoardProps) {
  const [remoteUrl, setRemoteUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(!!slotKey && !url);

  useEffect(() => {
    if (!slotKey || url) { setLoading(false); return; }
    let cancelled = false;
    fetch(`/api/media-links?slot=${encodeURIComponent(slotKey)}`)
      .then(r => r.ok ? r.json() : null)
      .then(j => { if (!cancelled) { setRemoteUrl(j?.link?.url ?? null); setLoading(false); } })
      .catch(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [slotKey, url]);

  const effectiveUrl = url ?? remoteUrl ?? undefined;
  const filled = !!effectiveUrl;

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: filled ? '#F5C80055' : '#E5E7EB', backgroundColor: filled ? '#0A0A0A' : '#fafafa' }}>
      <div className="px-3 py-2 flex items-center justify-between gap-2 flex-wrap"
           style={{ backgroundColor: filled ? '#000' : '#fff', borderBottom: filled ? '1px solid #F5C80022' : '1px solid #E5E7EB' }}>
        <div>
          <div className="font-black text-sm" style={{ color: filled ? '#fff' : '#111' }}>{title}</div>
          {subtitle && <div className="text-[11px]" style={{ color: filled ? '#888' : '#666' }}>{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="font-bold uppercase tracking-widest" style={{ color: filled ? '#F5C800' : '#999' }}>
            Miro
          </span>
          {caption && <span style={{ color: filled ? '#888' : '#999' }}>· {caption}</span>}
          {filled && (
            <a href={url ?? remoteUrl ?? '#'} target="_blank" rel="noopener noreferrer"
               className="ml-1 text-[10px] font-bold underline"
               style={{ color: '#F5C800' }}>
              Open ↗
            </a>
          )}
        </div>
      </div>
      {filled ? (
        <div style={{ position: 'relative', paddingTop: '62%', backgroundColor: '#000' }}>
          <iframe
            src={toMiroEmbed(effectiveUrl!)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allow="fullscreen; clipboard-read; clipboard-write"
            allowFullScreen
            title={title}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-4 py-10 gap-1.5">
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">
            {loading ? 'Checking for Miro board…' : 'Miro board not yet pasted'}
          </div>
          <div className="text-xs text-brand-gray max-w-md">
            {loading
              ? ' '
              : <>Paste the Miro share URL via <span className="font-mono">/admin → Media Links</span>{slotKey ? <> (slot: <span className="font-mono">{slotKey}</span>)</> : null}.</>
            }
          </div>
        </div>
      )}
    </div>
  );
}
