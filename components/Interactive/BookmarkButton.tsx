'use client';
import React from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BookmarkButtonProps {
  sectionId: number;
  className?: string;
}

export function BookmarkButton({ sectionId, className = '' }: BookmarkButtonProps) {
  const { toggleBookmark, isBookmarked } = useApp();
  const bookmarked = isBookmarked(sectionId);

  return (
    <button
      onClick={() => toggleBookmark(sectionId)}
      title={bookmarked ? 'Remove bookmark' : 'Bookmark this section'}
      className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
        bookmarked
          ? 'bg-brand-yellow border-brand-yellow text-brand-black'
          : 'border-brand-gray-mid text-brand-gray hover:border-brand-black hover:text-brand-black'
      } ${className}`}
    >
      <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'} />
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
