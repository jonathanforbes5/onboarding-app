'use client';
import React, { useEffect, useState } from 'react';
import { X, Brain } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SECTIONS, QuizQuestion } from '@/data/sections';

interface PromptData {
  sectionId: number;
  sectionTitle: string;
  question: QuizQuestion;
}

export function QuizPrompt() {
  const { currentUser, completedSections } = useApp();
  const userKey = currentUser?.userKey;
  const [prompt, setPrompt] = useState<PromptData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!userKey || completedSections.length === 0) return;

    // Check if user has quiz reminders enabled (default: true)
    try {
      const pref = localStorage.getItem(`ri_${userKey}_quiz_reminder`);
      if (pref === 'false') return;
    } catch {}

    // Check if already shown this session
    try {
      if (sessionStorage.getItem('ri_quiz_shown')) return;
    } catch {}

    // Pick a random completed section and random question
    const delay = setTimeout(() => {
      const eligibleSections = SECTIONS.filter(s => completedSections.includes(s.id) && s.quiz && s.quiz.length > 0);
      if (eligibleSections.length === 0) return;

      const section = eligibleSections[Math.floor(Math.random() * eligibleSections.length)];
      const questions = section.quiz;
      const q = questions[Math.floor(Math.random() * questions.length)];

      setPrompt({ sectionId: section.id, sectionTitle: section.title, question: q });

      try { sessionStorage.setItem('ri_quiz_shown', '1'); } catch {}
    }, 12000); // show after 12 seconds

    return () => clearTimeout(delay);
  }, [userKey, completedSections.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!prompt || dismissed) return null;

  const isAnswered = selected !== null;
  const isCorrect = selected === prompt.question.correctIndex;

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 43,
      width: 'min(440px, calc(100vw - 32px))',
      backgroundColor: '#141414',
      border: '1px solid #2A2A2A',
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      fontFamily: 'Inter, system-ui, sans-serif',
      animation: 'qp-slide-up 0.3s ease',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes qp-slide-up {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>

      {/* Accent bar */}
      <div style={{ height: 2, backgroundColor: '#F5C800' }} />

      <div style={{ padding: '14px 16px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <Brain size={14} color="#F5C800" />
            <span style={{ fontSize: 10, fontWeight: 800, color: '#F5C800', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Quick refresh · Section {prompt.sectionId}
            </span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#444', padding: 2 }}
            title="Dismiss"
          >
            <X size={14} />
          </button>
        </div>

        {/* Question */}
        <p style={{ color: '#E0E0E0', fontSize: 13, fontWeight: 700, margin: '0 0 10px', lineHeight: 1.4 }}>
          {prompt.question.question}
        </p>

        {/* Options */}
        {!isAnswered ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {prompt.question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                style={{
                  textAlign: 'left', padding: '8px 12px', borderRadius: 8,
                  backgroundColor: '#1C1C1C', border: '1px solid #2A2A2A',
                  color: '#CCC', fontSize: 12, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.1s',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#242424'; e.currentTarget.style.borderColor = '#F5C80055'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#1C1C1C'; e.currentTarget.style.borderColor = '#2A2A2A'; }}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div style={{
              padding: '10px 12px', borderRadius: 8, marginBottom: 8,
              backgroundColor: isCorrect ? '#0D1A0D' : '#1A0D0D',
              border: `1px solid ${isCorrect ? '#22C55E33' : '#EF444433'}`,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 16 }}>{isCorrect ? '✓' : '✗'}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: isCorrect ? '#22C55E' : '#EF4444' }}>
                {isCorrect ? 'Correct!' : `Correct answer: ${prompt.question.options[prompt.question.correctIndex]}`}
              </span>
            </div>
            {prompt.question.explanation && (
              <p style={{ color: '#666', fontSize: 11, margin: '0 0 10px', lineHeight: 1.5 }}>
                {prompt.question.explanation}
              </p>
            )}
            <button
              onClick={() => setDismissed(true)}
              style={{
                width: '100%', backgroundColor: '#1C1C1C', color: '#888',
                fontWeight: 700, fontSize: 12, padding: '8px', borderRadius: 8,
                border: '1px solid #2A2A2A', cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
