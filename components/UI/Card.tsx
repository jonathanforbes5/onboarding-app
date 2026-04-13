'use client';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  yellow?: boolean;
  dark?: boolean;
  border?: boolean;
}

export function Card({ children, className = '', yellow = false, dark = false, border = false }: CardProps) {
  const base = 'rounded-xl p-5';
  const variant = yellow
    ? 'bg-brand-yellow text-brand-black'
    : dark
    ? 'bg-brand-black text-white'
    : 'bg-white text-brand-black';
  const borderClass = border ? 'border border-brand-gray-mid' : '';

  return (
    <div className={`${base} ${variant} ${borderClass} ${className}`}>
      {children}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  yellow?: boolean;
  border?: boolean;
}

export function StatCard({ label, value, sub, yellow }: StatCardProps) {
  return (
    <Card yellow={yellow} border={!yellow} className="flex flex-col gap-1 text-center">
      <div className="text-3xl font-black tracking-tight">{value}</div>
      <div className="text-sm font-bold uppercase tracking-widest opacity-70">{label}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </Card>
  );
}

interface InfoBoxProps {
  title?: string;
  children: React.ReactNode;
  type?: 'tip' | 'warning' | 'info' | 'success';
  className?: string;
}

export function InfoBox({ title, children, type = 'info', className = '' }: InfoBoxProps) {
  const styles: Record<string, string> = {
    tip: 'bg-brand-yellow-light border-l-4 border-brand-yellow text-brand-black',
    warning: 'bg-orange-50 border-l-4 border-orange-400 text-orange-900',
    info: 'bg-blue-50 border-l-4 border-blue-400 text-blue-900',
    success: 'bg-green-50 border-l-4 border-green-500 text-green-900',
  };
  return (
    <div className={`rounded-r-xl p-4 ${styles[type]} ${className}`}>
      {title && <div className="font-bold mb-1 text-sm uppercase tracking-wide">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

interface TwoColProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftTitle?: string;
  rightTitle?: string;
  className?: string;
}

export function TwoCol({ left, right, leftTitle, rightTitle, className = '' }: TwoColProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div>
        {leftTitle && <h4 className="font-black text-sm uppercase tracking-widest mb-3 text-brand-gray">{leftTitle}</h4>}
        {left}
      </div>
      <div>
        {rightTitle && <h4 className="font-black text-sm uppercase tracking-widest mb-3 text-brand-gray">{rightTitle}</h4>}
        {right}
      </div>
    </div>
  );
}

interface TagProps {
  children: React.ReactNode;
  color?: 'yellow' | 'black' | 'gray' | 'green' | 'red';
}

export function Tag({ children, color = 'gray' }: TagProps) {
  const styles: Record<string, string> = {
    yellow: 'bg-brand-yellow text-brand-black',
    black: 'bg-brand-black text-white',
    gray: 'bg-brand-gray-mid text-brand-gray-dark',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles[color]}`}>
      {children}
    </span>
  );
}

interface BulletListProps {
  items: string[];
  check?: boolean;
  cross?: boolean;
  className?: string;
}

export function BulletList({ items, check, cross, className = '' }: BulletListProps) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 text-sm">
          {check && <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>}
          {cross && <span className="text-red-500 mt-0.5 flex-shrink-0">✗</span>}
          {!check && !cross && <span className="text-brand-yellow mt-1 flex-shrink-0">▸</span>}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
