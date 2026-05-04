'use client';
import React, { useEffect, useState } from 'react';

interface LoomSlotProps {
  /** Loom share or embed URL. When unset, falls back to remote slotKey lookup, then placeholder. */
  url?: string;
  /** Stable identifier — when set, fetches the URL from media_links table at runtime.
   *  Lets admins paste new Looms via /admin without redeploying. */
  slotKey?: string;
  title: string;
  subtitle?: string;
  recordedBy?: string;
  /** "1:23" — cosmetic only. */
  length?: string;
}

function toEmbed(url: string) {
  if (/loom\.com/.test(url) && url.includes('/share/')) {
    return url.replace('/share/', '/embed/');
  }
  return url;
}

export function LoomSlot({ url, slotKey, title, subtitle, recordedBy, length }: LoomSlotProps) {
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
  const filled = !!effectiveUrl && !effectiveUrl.includes('PLACEHOLDER');

  return (
    <div className="rounded-xl overflow-hidden border" style={{ borderColor: filled ? '#F5C80055' : '#E5E7EB', backgroundColor: filled ? '#0A0A0A' : '#fafafa' }}>
      <div className="px-3 py-2 flex items-center justify-between gap-2 flex-wrap"
           style={{ backgroundColor: filled ? '#000' : '#fff', borderBottom: filled ? '1px solid #F5C80022' : '1px solid #E5E7EB' }}>
        <div>
          <div className="font-black text-sm" style={{ color: filled ? '#fff' : '#111' }}>{title}</div>
          {subtitle && <div className="text-[11px]" style={{ color: filled ? '#888' : '#666' }}>{subtitle}</div>}
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          {recordedBy && (
            <span className="font-bold uppercase tracking-widest" style={{ color: filled ? '#F5C800' : '#999' }}>
              {recordedBy}
            </span>
          )}
          {length && (
            <span style={{ color: filled ? '#888' : '#999' }}>· {length}</span>
          )}
        </div>
      </div>
      {filled ? (
        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#000' }}>
          <iframe
            src={toEmbed(effectiveUrl!)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            allow="autoplay; fullscreen"
            allowFullScreen
            title={title}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center px-4 py-8 gap-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">
            {loading ? 'Checking for Loom…' : 'Loom not yet recorded'}
          </div>
          <div className="text-xs text-brand-gray max-w-md">
            {loading
              ? ' '
              : <>Placeholder — admins can paste a URL via <span className="font-mono">/admin → Media Links</span>{slotKey ? <> (slot: <span className="font-mono">{slotKey}</span>)</> : null}.</>
            }
          </div>
        </div>
      )}
    </div>
  );
}
