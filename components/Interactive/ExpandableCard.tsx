'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  accent?: boolean;
  icon?: React.ReactNode;
}

export function ExpandableCard({ title, subtitle, children, defaultOpen = false, accent = false, icon }: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`rounded-xl border ${accent ? 'border-brand-yellow' : 'border-brand-gray-mid'} overflow-hidden`}>
      <button
        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
          open
            ? accent ? 'bg-brand-yellow text-brand-black' : 'bg-brand-black text-white'
            : 'bg-white hover:bg-brand-gray-light text-brand-black'
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {icon && <span className={open ? '' : 'text-brand-gray'}>{icon}</span>}
          <div>
            <div className="font-bold text-sm">{title}</div>
            {subtitle && <div className={`text-xs mt-0.5 ${open ? 'opacity-70' : 'text-brand-gray'}`}>{subtitle}</div>}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="p-4 bg-white border-t border-brand-gray-mid animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
