'use client';
import React, { useState } from 'react';
import { MB_TRAINING_DAYS } from '@/data/mbTrainingData';

const C = {
  bg: '#0A0A0A', surf: '#111111', surf2: '#161616',
  border: '#1E1E1E', border2: '#2A2A2A', text: '#F5F5F5', muted: '#888888',
};

type Stage = 'name' | 'quiz' | 'done';
type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function StandaloneQuizClient({ sessionId }: { sessionId: number }) {
  const day = MB_TRAINING_DAYS.find((d) => d.id === sessionId);

  if (!day) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, system-ui, sans-serif', color: '#888' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#555' }}>Quiz not found</div>
          <div style={{ fontSize: 13, color: '#444', marginTop: 8 }}>This link may be invalid or the session doesn&apos;t exist.</div>
        </div>
      </div>
    );
  }

  const quizLength = day?.quiz.length ?? 0;
  const [stage, setStage] = useState<Stage>('name');
  const [name, setName] = useState('');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(Array(quizLength).fill('unanswered'));
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(quizLength).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!day) return null;
  const q = day.quiz[current];
  const currentAnswer = answers[current];
  const isAnswered = currentAnswer !== 'unanswered';

  function handleSelect(idx: number) {
    if (isAnswered) return;
    const isCorrect = idx === q.correctIndex;
    const newAnswers = [...answers];
    newAnswers[current] = isCorrect ? 'correct' : 'incorrect';
    const newOptions = [...selectedOptions];
    newOptions[current] = idx;
    setAnswers(newAnswers);
    setSelectedOptions(newOptions);
    setShowExplanation(true);
  }

  async function handleNext() {
    if (current < quizLength - 1) {
      setCurrent(current + 1);
      setShowExplanation(selectedOptions[current + 1] !== -1);
    } else {
      const correct = answers.filter((a) => a === 'correct').length;
      const score = Math.round((correct / quizLength) * 100);
      setFinalScore(score);
      setStage('done');
      setSubmitting(true);
      try {
        await fetch('/api/quiz/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, name: name.trim(), score, totalQuestions: quizLength }),
        });
      } catch {
        setSubmitError('Result could not be saved — please let your trainer know your score.');
      } finally {
        setSubmitting(false);
      }
    }
  }

  if (stage === 'name') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          {/* Confidentiality notice */}
          <div style={{ backgroundColor: '#1A1400', border: '1px solid #F5C80033', borderRadius: 10, padding: '10px 14px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>🔒</span>
            <span style={{ color: '#F5C800', fontSize: 11, fontWeight: 800 }}>CONFIDENTIAL — RoofIgnite Media Buying Team Only</span>
          </div>

          {/* Session info */}
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{day.icon}</div>
            <div style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Session {day.id} Knowledge Check</div>
            <div style={{ color: C.text, fontSize: 22, fontWeight: 900, marginBottom: 8 }}>{day.title}</div>
            <div style={{ color: '#666', fontSize: 13 }}>{day.quiz.length} questions · {day.date} · {day.owner}</div>
          </div>

          {/* Name entry */}
          <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 14, padding: '28px 28px' }}>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 800, marginBottom: 6 }}>Enter your name to begin</div>
            <div style={{ color: '#666', fontSize: 12.5, lineHeight: 1.55, marginBottom: 20 }}>Your result will be recorded and shared with your trainer. Answer every question honestly — this helps us understand what landed and what to revisit.</div>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && name.trim().length >= 2) setStage('quiz'); }}
              autoFocus
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 10,
                border: `1.5px solid ${name.trim().length >= 2 ? day.color + '88' : C.border2}`,
                background: C.surf2, color: C.text, fontSize: 14, fontFamily: 'Inter, system-ui, sans-serif',
                outline: 'none', marginBottom: 14, boxSizing: 'border-box', transition: 'border-color 0.2s',
              }}
            />
            <button
              onClick={() => setStage('quiz')}
              disabled={name.trim().length < 2}
              style={{
                width: '100%', padding: '13px', borderRadius: 10,
                border: 'none', background: name.trim().length >= 2 ? day.color : '#2A2A2A',
                color: name.trim().length >= 2 ? '#000' : '#444',
                fontWeight: 800, fontSize: 14, cursor: name.trim().length >= 2 ? 'pointer' : 'default',
                transition: 'all 0.2s',
              }}
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'done') {
    const passed = finalScore >= 80;
    const correct = answers.filter((a) => a === 'correct').length;
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ width: '100%', maxWidth: 480 }}>
          <div style={{ backgroundColor: C.surf, border: `1px solid ${passed ? '#22C55E44' : '#EF444444'}`, borderRadius: 16, padding: '40px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>{passed ? '🏆' : '📖'}</div>
            <div style={{ color: passed ? '#22C55E' : '#EF4444', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              {passed ? 'Passed' : 'Keep Studying'}
            </div>
            <div style={{ color: C.text, fontSize: 42, fontWeight: 900, margin: '0 0 6px', lineHeight: 1 }}>{finalScore}%</div>
            <div style={{ color: C.muted, fontSize: 14, marginBottom: 6 }}>
              {correct} of {day.quiz.length} correct
            </div>
            <div style={{ color: '#555', fontSize: 12, marginBottom: 24 }}>
              Submitted for {name}
            </div>
            <div style={{ backgroundColor: C.surf2, border: `1px solid ${C.border2}`, borderRadius: 10, padding: '14px 16px', marginBottom: 20 }}>
              <div style={{ color: '#666', fontSize: 12, lineHeight: 1.6 }}>
                {passed
                  ? 'Your result has been recorded. Your trainer can see your score. Session 1 content is in the RoofIgnite app for reference.'
                  : 'Your result has been recorded. Review the Session 1 material and ask your trainer about any concepts that were unclear.'}
              </div>
            </div>
            {!submitting && submitError && (
              <div style={{ backgroundColor: '#EF44440D', border: '1px solid #EF444433', borderRadius: 8, padding: '10px 14px', color: '#EF4444', fontSize: 12, marginBottom: 12 }}>
                {submitError}
              </div>
            )}
            {submitting && (
              <div style={{ color: '#555', fontSize: 12 }}>Saving result...</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Quiz stage
  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', paddingTop: 24 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div style={{ color: day.color, fontSize: 12, fontWeight: 800 }}>Session {day.id} — {name}</div>
          <div style={{ color: C.muted, fontSize: 12 }}>{current + 1} / {day.quiz.length}</div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, backgroundColor: C.border2, borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((current + 1) / day.quiz.length) * 100}%`, backgroundColor: day.color, transition: 'width 0.3s' }} />
        </div>

        {/* Question */}
        <div style={{ backgroundColor: C.surf, border: `1px solid ${C.border}`, borderRadius: 14, padding: '24px 24px 20px', marginBottom: 14 }}>
          <div style={{ color: C.text, fontSize: 16, fontWeight: 700, lineHeight: 1.55, marginBottom: 22 }}>{q.question}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              const isSelected = selectedOptions[current] === i;
              const isCorrect = i === q.correctIndex;
              let borderColor = C.border2;
              let bgColor = C.surf2;
              let textColor = '#bbb';
              if (isAnswered) {
                if (isCorrect) { borderColor = '#22C55E'; bgColor = '#22C55E12'; textColor = '#22C55E'; }
                else if (isSelected) { borderColor = '#EF4444'; bgColor = '#EF444412'; textColor = '#EF4444'; }
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={isAnswered}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '12px 14px', borderRadius: 10,
                    border: `1.5px solid ${borderColor}`, background: bgColor,
                    cursor: isAnswered ? 'default' : 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                    border: `1.5px solid ${borderColor}`,
                    backgroundColor: isAnswered && isCorrect ? '#22C55E' : isAnswered && isSelected ? '#EF4444' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 900, color: isAnswered && (isCorrect || isSelected) ? '#fff' : borderColor,
                    marginTop: 1,
                  }}>
                    {isAnswered ? (isCorrect ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + i)) : String.fromCharCode(65 + i)}
                  </div>
                  <span style={{ color: textColor, fontSize: 13.5, lineHeight: 1.5 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div style={{
              marginTop: 16,
              backgroundColor: currentAnswer === 'correct' ? '#22C55E0E' : '#EF44440E',
              border: `1px solid ${currentAnswer === 'correct' ? '#22C55E33' : '#EF444433'}`,
              borderRadius: 10, padding: '12px 14px',
            }}>
              <div style={{ color: currentAnswer === 'correct' ? '#22C55E' : '#EF4444', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                {currentAnswer === 'correct' ? 'Correct' : 'Incorrect'}
              </div>
              <div style={{ color: '#bbb', fontSize: 12.5, lineHeight: 1.6 }}>{q.explanation}</div>
            </div>
          )}
        </div>

        {isAnswered && (
          <button
            onClick={handleNext}
            style={{
              width: '100%', padding: '13px', borderRadius: 10,
              border: 'none', background: day.color,
              color: '#000', fontWeight: 800, fontSize: 14, cursor: 'pointer',
            }}
          >
            {current < day.quiz.length - 1 ? 'Next Question →' : 'See My Score →'}
          </button>
        )}
      </div>
    </div>
  );
}
