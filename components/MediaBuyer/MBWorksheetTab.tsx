'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MB_WORKSHEET_SECTIONS } from '@/data/mbTrainingData';

const C = {
  bg: '#0A0A0A',
  surf: '#111111',
  surf2: '#161616',
  surf3: '#1C1C1C',
  border: '#1E1E1E',
  border2: '#2A2A2A',
  text: '#F5F5F5',
  muted: '#888888',
  acc: '#F5C800',
};

export function MBWorksheetTab() {
  const { toggleChecklistItem, checklistItems } = useApp();

  const totalItems = MB_WORKSHEET_SECTIONS.reduce((sum, s) => sum + s.items.length, 0);
  const checkedItems = MB_WORKSHEET_SECTIONS.reduce((sum, s) =>
    sum + s.items.filter((_, i) => checklistItems[`mb_ws_${s.id}_${i}`]).length, 0);
  const pct = Math.round((checkedItems / totalItems) * 100);

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '28px 20px 80px', color: C.text,
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1A1400 0%, #111111 60%)',
          border: `1px solid ${C.acc}33`,
          borderRadius: 16,
          padding: '28px 28px 24px',
          marginBottom: 28,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.acc}, transparent)`, borderRadius: '16px 16px 0 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                Media Buyer
              </div>
              <h1 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.4px' }}>
                Onboarding Worksheet
              </h1>
              <p style={{ color: '#888', fontSize: 13, margin: 0, lineHeight: 1.65, maxWidth: 460 }}>
                Work through each section as you complete your training. Check off every item
                before your first solo account review.
              </p>
            </div>
            <div style={{
              backgroundColor: '#111', border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: '18px 22px', textAlign: 'center', minWidth: 120,
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: C.acc, lineHeight: 1 }}>{pct}%</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>Complete</div>
              <div style={{ color: '#444', fontSize: 10, marginTop: 5 }}>{checkedItems}/{totalItems} items</div>
              <div style={{ marginTop: 10, height: 4, backgroundColor: '#1f1f1f', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: C.acc, transition: 'width 0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MB_WORKSHEET_SECTIONS.map((section) => {
            const sectionChecked = section.items.filter((_, i) => checklistItems[`mb_ws_${section.id}_${i}`]).length;
            const sectionPct = Math.round((sectionChecked / section.items.length) * 100);
            const sectionDone = sectionChecked === section.items.length;

            return (
              <div key={section.id} style={{
                backgroundColor: C.surf,
                border: `1px solid ${sectionDone ? '#22C55E33' : C.border}`,
                borderRadius: 12,
                padding: '20px 22px',
                position: 'relative', overflow: 'hidden',
              }}>
                {sectionDone && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: '#22C55E' }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ color: C.text, fontSize: 15, fontWeight: 800 }}>{section.title}</span>
                      {sectionDone && (
                        <span style={{
                          backgroundColor: '#22C55E22', border: '1px solid #22C55E44',
                          color: '#22C55E', fontSize: 10, fontWeight: 800,
                          padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                        }}>Done</span>
                      )}
                    </div>
                    <p style={{ color: C.muted, fontSize: 12.5, margin: 0, lineHeight: 1.5 }}>{section.description}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ color: sectionDone ? '#22C55E' : C.acc, fontSize: 13, fontWeight: 800 }}>{sectionPct}%</div>
                    <div style={{ color: '#444', fontSize: 10, marginTop: 2 }}>{sectionChecked}/{section.items.length}</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ height: 3, backgroundColor: '#1f1f1f', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${sectionPct}%`,
                    backgroundColor: sectionDone ? '#22C55E' : C.acc,
                    transition: 'width 0.3s',
                  }} />
                </div>

                {/* Checklist items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {section.items.map((item, idx) => {
                    const key = `mb_ws_${section.id}_${idx}`;
                    const checked = !!checklistItems[key];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleChecklistItem(`mb_ws_${section.id}`, idx)}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '10px 12px', borderRadius: 8,
                          border: `1px solid ${checked ? '#22C55E33' : C.border2}`,
                          background: checked ? '#22C55E08' : C.surf2,
                          cursor: 'pointer', textAlign: 'left',
                          transition: 'all 0.15s',
                        }}
                      >
                        <div style={{
                          flexShrink: 0,
                          width: 18, height: 18, borderRadius: 4,
                          border: `1.5px solid ${checked ? '#22C55E' : C.border2}`,
                          backgroundColor: checked ? '#22C55E' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          marginTop: 1, transition: 'all 0.15s',
                        }}>
                          {checked && <span style={{ color: '#000', fontSize: 10, fontWeight: 900 }}>✓</span>}
                        </div>
                        <span style={{
                          color: checked ? '#666' : '#bbb',
                          fontSize: 13, lineHeight: 1.55,
                          textDecoration: checked ? 'line-through' : 'none',
                          transition: 'all 0.15s',
                        }}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion state */}
        {checkedItems === totalItems && (
          <div style={{
            marginTop: 28,
            backgroundColor: '#22C55E0D',
            border: '1px solid #22C55E33',
            borderRadius: 12,
            padding: '24px 28px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
            <div style={{ color: '#22C55E', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              Worksheet Complete
            </div>
            <div style={{ color: '#888', fontSize: 13, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
              You&apos;re ready for your first solo account review.
              Keep this worksheet as your reference checklist — the same protocols apply every week.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
