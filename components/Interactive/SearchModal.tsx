'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Search, X, FileText, Video, BookOpen, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS } from '@/data/sections';
import sopData from '@/repo/data/sops.json';
import recordingsData from '@/repo/data/recordings.json';

type ResultKind = 'section' | 'sop' | 'resource' | 'recording' | 'loom';

interface SearchResult {
  kind: ResultKind;
  id: string | number;
  title: string;
  subtitle: string;
  url?: string;
  sectionId?: number;
  tab?: string;
}

const KIND_ICON: Record<ResultKind, React.ElementType> = {
  section:  BookOpen,
  sop:      FileText,
  resource: FileText,
  recording:Video,
  loom:     Video,
};

const KIND_LABEL: Record<ResultKind, string> = {
  section:  'Training',
  sop:      'SOP',
  resource: 'Resource',
  recording:'Recording',
  loom:     'Loom',
};

const KIND_COLOR: Record<ResultKind, string> = {
  section:  '#F5C800',
  sop:      '#4A90D9',
  resource: '#22C55E',
  recording:'#A78BFA',
  loom:     '#F59E0B',
};

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Training sections
  SECTIONS.forEach((s) => {
    results.push({
      kind: 'section',
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      sectionId: s.id,
      tab: 'sections',
    });
  });

  // SOPs
  sopData.sops.forEach((s) => {
    results.push({
      kind: 'sop',
      id: s.id,
      title: s.title,
      subtitle: s.description,
      url: s.url,
      tab: 'resources',
    });
  });

  // Quick access resources
  sopData.resources.forEach((r) => {
    results.push({
      kind: 'resource',
      id: r.id,
      title: r.title,
      subtitle: r.description,
      url: r.url,
      tab: 'resources',
    });
  });

  // Tools
  sopData.tools.forEach((t) => {
    results.push({
      kind: 'resource',
      id: t.id,
      title: t.title,
      subtitle: t.description,
      url: t.url,
      tab: 'resources',
    });
  });

  // Training videos (recordings)
  recordingsData.recordings.forEach((r) => {
    results.push({
      kind: 'recording',
      id: r.id,
      title: r.title,
      subtitle: r.description,
      url: r.url,
      tab: 'recordings',
    });
  });

  // Training Looms
  (recordingsData.training_looms as any[]).forEach((l) => {
    results.push({
      kind: 'loom',
      id: l.id,
      title: l.title,
      subtitle: l.description,
      url: l.url,
      tab: 'recordings',
    });
  });

  return results;
}

const ALL_RESULTS = buildIndex();

export function SearchModal() {
  const { showSearch, searchQuery, setShowSearch, setSearchQuery, setCurrentSection, setActiveTab, currentUser } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeKind, setActiveKind] = useState<ResultKind | 'all'>('all');

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setActiveKind('all');
    } else {
      setSearchQuery('');
    }
  }, [showSearch, setSearchQuery]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
      if (e.key === 'Escape') setShowSearch(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setShowSearch]);

  if (!showSearch) return null;

  const q = searchQuery.toLowerCase().trim();

  const filtered = (q ? ALL_RESULTS.filter((r) =>
    r.title.toLowerCase().includes(q) ||
    r.subtitle.toLowerCase().includes(q)
  ) : ALL_RESULTS).filter((r) => activeKind === 'all' || r.kind === activeKind);

  // Group results
  const grouped: Partial<Record<ResultKind, SearchResult[]>> = {};
  filtered.forEach((r) => {
    if (!grouped[r.kind]) grouped[r.kind] = [];
    grouped[r.kind]!.push(r);
  });

  const navigate = (result: SearchResult) => {
    if (result.kind === 'section' && result.sectionId) {
      setCurrentSection(result.sectionId);
      setActiveTab('sections');
    } else if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else if (result.tab) {
      setActiveTab(result.tab as any);
    }
    // Log the search query + result clicked (fire-and-forget)
    if (searchQuery.trim().length >= 2) {
      fetch('/api/search-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: searchQuery.trim(),
          result_title: result.title,
          result_kind: result.kind,
          user_name: currentUser?.userKey ?? 'anonymous',
        }),
      }).catch(() => {});
    }
    setShowSearch(false);
  };

  const kindCounts: Partial<Record<ResultKind | 'all', number>> = { all: filtered.length };
  (['section', 'sop', 'resource', 'recording', 'loom'] as ResultKind[]).forEach((k) => {
    const count = filtered.filter((r) => r.kind === k).length;
    if (count > 0) kindCounts[k] = count;
  });

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-16 px-4"
      onClick={() => setShowSearch(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-brand-gray-mid">
          <Search size={18} className="text-brand-gray flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search training, SOPs, recordings, tools…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none bg-transparent"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-brand-gray hover:text-brand-black">
              <X size={15} />
            </button>
          )}
          <button onClick={() => setShowSearch(false)} className="text-brand-gray hover:text-brand-black ml-1">
            <X size={18} />
          </button>
        </div>

        {/* Kind filter pills */}
        <div className="flex gap-1.5 px-4 py-2 border-b border-brand-gray-mid overflow-x-auto">
          {(['all', 'section', 'sop', 'resource', 'recording', 'loom'] as const).map((kind) => {
            const count = kindCounts[kind];
            if (count === undefined || count === 0) return null;
            const color = kind === 'all' ? '#111' : KIND_COLOR[kind];
            const active = activeKind === kind;
            return (
              <button
                key={kind}
                onClick={() => setActiveKind(kind)}
                style={{
                  padding: '3px 10px',
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 700,
                  border: `1px solid ${active ? color : '#E0E0E0'}`,
                  backgroundColor: active ? color : 'white',
                  color: active ? (kind === 'all' ? 'white' : '#000') : '#666',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {kind === 'all' ? 'All' : KIND_LABEL[kind]} {count}
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="px-4 py-12 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-gray-light flex items-center justify-center">
                <Search size={20} className="text-brand-gray" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-black">
                  {q ? 'No results found' : 'Start searching'}
                </p>
                <p className="text-xs text-brand-gray mt-1">
                  {q
                    ? `Nothing matched "${searchQuery}" — try a different term`
                    : 'Search training sections, SOPs, recordings, and tools'}
                </p>
              </div>
            </div>
          ) : (
            Object.entries(grouped).map(([kind, items]) => (
              <div key={kind}>
                <div className="px-4 py-1.5 bg-brand-gray-light border-b border-brand-gray-mid">
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: KIND_COLOR[kind as ResultKind] }}>
                    {KIND_LABEL[kind as ResultKind]}
                  </span>
                </div>
                {items!.map((result) => {
                  const Icon = KIND_ICON[result.kind];
                  const color = KIND_COLOR[result.kind];
                  return (
                    <button
                      key={`${result.kind}-${result.id}`}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-yellow/15 text-left transition-colors border-b border-brand-gray-mid/50 last:border-0"
                      onClick={() => navigate(result)}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: color + '22', color }}
                      >
                        {result.kind === 'section' ? (
                          <span className="text-xs font-black">{result.id}</span>
                        ) : (
                          <Icon size={13} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">{result.title}</div>
                        <div className="text-xs text-brand-gray truncate">{result.subtitle}</div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1.5">
                        {result.tab && (
                          <span className="text-[10px] text-brand-gray-mid capitalize">
                            {result.tab === 'sections' ? 'Company' : result.tab}
                          </span>
                        )}
                        <ChevronRight size={13} className="text-brand-gray-mid" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-brand-gray-mid bg-brand-gray-light flex items-center justify-between">
          <span className="text-xs text-brand-gray">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            {q ? ` for "${q}"` : ''}
          </span>
          <span className="text-xs text-brand-gray">ESC to close · ⌘K to open</span>
        </div>
      </div>
    </div>
  );
}
