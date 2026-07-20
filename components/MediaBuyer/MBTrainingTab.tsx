'use client';
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { MB_TRAINING_DAYS, MBQuizQuestion } from '@/data/mbTrainingData';

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

// ── Inline quiz engine ────────────────────────────────────────────────────────

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuizEngineProps {
  dayId: number;
  questions: MBQuizQuestion[];
  prevScore?: number;
  onComplete: (score: number) => void;
  onBack: () => void;
  onNextDay?: () => void;
}

function QuizEngine({ dayId, questions, prevScore, onComplete, onBack, onNextDay }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerState[]>(Array(questions.length).fill('unanswered'));
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];
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
    setSelected(idx);
    setShowExplanation(true);
  }

  function handleNext() {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(selectedOptions[current + 1] !== -1 ? selectedOptions[current + 1] : null);
      setShowExplanation(selectedOptions[current + 1] !== -1);
    } else {
      // answers[current] was already set by handleSelect before this button appeared
      const finalScore = Math.round((answers.filter((a) => a === 'correct').length / questions.length) * 100);
      setScore(finalScore);
      setFinished(true);
      onComplete(finalScore);
    }
  }

  function handleRetake() {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill('unanswered'));
    setSelectedOptions(Array(questions.length).fill(-1));
    setShowExplanation(false);
    setFinished(false);
    setScore(0);
  }

  if (finished) {
    const passed = score >= 80;
    return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '32px 20px' }}>
        <div style={{
          backgroundColor: C.surf,
          border: `1px solid ${passed ? '#22C55E44' : '#EF444444'}`,
          borderRadius: 16,
          padding: '36px 32px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>{passed ? '🏆' : '📖'}</div>
          <div style={{
            color: passed ? '#22C55E' : '#EF4444',
            fontSize: 11,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}>
            {passed ? 'Quiz Passed' : 'Try Again'}
          </div>
          <div style={{ color: C.text, fontSize: 36, fontWeight: 900, margin: '0 0 6px' }}>
            {score}%
          </div>
          <div style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>
            {answers.filter((a) => a === 'correct').length} of {questions.length} correct
            {!passed && ' — you need 80% to pass'}
          </div>
          {prevScore !== undefined && (
            <div style={{
              backgroundColor: C.surf2,
              border: `1px solid ${C.border2}`,
              borderRadius: 8,
              padding: '10px 16px',
              marginBottom: 20,
              fontSize: 12,
              color: C.muted,
            }}>
              Previous best: <span style={{ color: C.acc, fontWeight: 700 }}>{prevScore}%</span>
            </div>
          )}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleRetake}
              style={{
                padding: '11px 22px', borderRadius: 8,
                border: `1px solid ${C.border2}`, background: C.surf2,
                color: C.text, fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              Retake Quiz
            </button>
            <button
              onClick={onBack}
              style={{
                padding: '11px 22px', borderRadius: 8,
                border: `1px solid ${C.border2}`, background: 'transparent',
                color: C.muted, fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              ← Back to Content
            </button>
            {passed && onNextDay && (
              <button
                onClick={onNextDay}
                style={{
                  padding: '11px 22px', borderRadius: 8,
                  border: 'none', background: '#22C55E',
                  color: '#000', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                }}
              >
                Next Day →
              </button>
            )}
            {passed && !onNextDay && (
              <button
                onClick={onBack}
                style={{
                  padding: '11px 22px', borderRadius: 8,
                  border: 'none', background: '#22C55E',
                  color: '#000', fontWeight: 800, fontSize: 13, cursor: 'pointer',
                }}
              >
                ← Back to Training
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer', padding: 0 }}>
          ← Back to content
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {prevScore !== undefined && (
            <span style={{ fontSize: 11, color: C.muted }}>
              Best: <span style={{ color: C.acc, fontWeight: 700 }}>{prevScore}%</span>
            </span>
          )}
          <span style={{ fontSize: 12, color: C.muted }}>
            {current + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, backgroundColor: C.border2, borderRadius: 2, marginBottom: 28, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${((current + 1) / questions.length) * 100}%`,
          backgroundColor: C.acc,
          transition: 'width 0.3s',
        }} />
      </div>

      {/* Question */}
      <div style={{
        backgroundColor: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: '24px 24px 20px',
        marginBottom: 14,
      }}>
        <div style={{ color: C.text, fontSize: 16, fontWeight: 700, lineHeight: 1.5, marginBottom: 22 }}>
          {q.question}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.correctIndex;
            let borderColor = C.border2;
            let bgColor = C.surf2;
            let textColor = '#bbb';

            if (isAnswered) {
              if (isCorrect) { borderColor = '#22C55E'; bgColor = '#22C55E12'; textColor = '#22C55E'; }
              else if (isSelected) { borderColor = '#EF4444'; bgColor = '#EF444412'; textColor = '#EF4444'; }
            } else if (isSelected) {
              borderColor = C.acc;
              bgColor = C.acc + '12';
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
                  cursor: isAnswered ? 'default' : 'pointer',
                  textAlign: 'left', transition: 'all 0.15s',
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
                  {isAnswered
                    ? isCorrect ? '✓' : isSelected ? '✗' : String.fromCharCode(65 + i)
                    : String.fromCharCode(65 + i)}
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
            borderRadius: 10,
            padding: '12px 14px',
          }}>
            <div style={{
              color: currentAnswer === 'correct' ? '#22C55E' : '#EF4444',
              fontSize: 11,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 6,
            }}>
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
            border: 'none', background: C.acc,
            color: '#000', fontWeight: 800, fontSize: 14, cursor: 'pointer',
          }}
        >
          {current < questions.length - 1 ? 'Next Question →' : 'See Results →'}
        </button>
      )}
    </div>
  );
}

// ── Day detail view ───────────────────────────────────────────────────────────

interface DayDetailProps {
  dayId: number;
  onBack: () => void;
  onNextDay?: () => void;
}

function DayDetail({ dayId, onBack, onNextDay }: DayDetailProps) {
  const { mbQuizScores, markMBDayComplete, saveMBQuizScore, completedMBDays } = useApp();
  const [view, setView] = useState<'content' | 'quiz'>('content');
  const day = MB_TRAINING_DAYS.find((d) => d.id === dayId)!;
  const prevScore = mbQuizScores[dayId];
  const isDone = completedMBDays.includes(dayId);

  function handleQuizComplete(score: number) {
    saveMBQuizScore(dayId, score);
    if (score >= 80) markMBDayComplete(dayId);
  }

  if (view === 'quiz') {
    return (
      <QuizEngine
        dayId={dayId}
        questions={day.quiz}
        prevScore={prevScore}
        onComplete={handleQuizComplete}
        onBack={() => setView('content')}
        onNextDay={onNextDay}
      />
    );
  }

  const calloutColors: Record<string, string> = {
    warning: '#EF4444',
    tip: '#22C55E',
    rule: C.acc,
  };
  const calloutLabels: Record<string, string> = { warning: '⚠️ Warning', tip: '💡 Tip', rule: '📌 Rule' };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 20px 80px' }}>
      {/* Back */}
      <button
        onClick={onBack}
        style={{ background: 'none', border: 'none', color: C.muted, fontSize: 13, cursor: 'pointer', padding: '0 0 24px', display: 'block' }}
      >
        ← All Training Days
      </button>

      {/* Day header */}
      <div style={{
        background: `linear-gradient(135deg, ${day.color}12 0%, #111111 60%)`,
        border: `1px solid ${day.color}33`,
        borderRadius: 16,
        padding: '28px 28px 24px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: day.color, borderRadius: '16px 16px 0 0' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 12,
            background: day.color + '22', border: `1px solid ${day.color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            {day.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <span style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Day {day.id}</span>
              <span style={{ color: C.muted, fontSize: 11 }}>·</span>
              <span style={{ color: C.muted, fontSize: 11 }}>{day.estimatedTime}</span>
              {isDone && (
                <span style={{
                  backgroundColor: '#22C55E22', border: '1px solid #22C55E44',
                  color: '#22C55E', fontSize: 10, fontWeight: 800,
                  padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase',
                }}>✓ Complete</span>
              )}
              {prevScore !== undefined && (
                <span style={{
                  backgroundColor: (prevScore >= 80 ? '#22C55E' : '#EF4444') + '22',
                  border: `1px solid ${(prevScore >= 80 ? '#22C55E' : '#EF4444')}44`,
                  color: prevScore >= 80 ? '#22C55E' : '#EF4444',
                  fontSize: 10, fontWeight: 800,
                  padding: '2px 8px', borderRadius: 20,
                }}>Quiz: {prevScore}%</span>
              )}
            </div>
            <h1 style={{ color: C.text, fontSize: 22, fontWeight: 900, margin: '0 0 6px', letterSpacing: '-0.3px' }}>
              {day.title}
            </h1>
            <p style={{ color: '#999', fontSize: 13, margin: '0 0 12px', lineHeight: 1.6 }}>{day.subtitle}</p>
            <div style={{
              backgroundColor: day.color + '0E', border: `1px solid ${day.color}22`,
              borderRadius: 8, padding: '10px 14px',
            }}>
              <span style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Objective: </span>
              <span style={{ color: '#aaa', fontSize: 12.5 }}>{day.objective}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
        {day.sections.map((section, idx) => (
          <div key={idx} style={{
            backgroundColor: C.surf,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 3, height: 14, backgroundColor: day.color, borderRadius: 2 }} />
              <span style={{ color: C.text, fontSize: 14, fontWeight: 800 }}>{section.heading}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.items.map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: day.color, fontSize: 10, marginTop: 4, flexShrink: 0 }}>▸</span>
                  <span style={{ color: '#bbb', fontSize: 13, lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
            {section.callout && (
              <div style={{
                marginTop: 14,
                backgroundColor: calloutColors[section.callout.type] + '0D',
                border: `1px solid ${calloutColors[section.callout.type]}33`,
                borderLeft: `3px solid ${calloutColors[section.callout.type]}`,
                borderRadius: '0 8px 8px 0',
                padding: '10px 14px',
              }}>
                <div style={{ color: calloutColors[section.callout.type], fontSize: 11, fontWeight: 800, marginBottom: 4 }}>
                  {calloutLabels[section.callout.type]}
                </div>
                <div style={{ color: '#aaa', fontSize: 12.5, lineHeight: 1.6 }}>{section.callout.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div style={{
        backgroundColor: C.acc + '0A',
        border: `1px solid ${C.acc}22`,
        borderRadius: 12,
        padding: '20px 22px',
        marginBottom: 28,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, backgroundColor: C.acc, borderRadius: 2 }} />
          <span style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Takeaways</span>
        </div>
        {day.keyTakeaways.map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: i < day.keyTakeaways.length - 1 ? 8 : 0 }}>
            <span style={{ color: C.acc, fontSize: 10, marginTop: 4, flexShrink: 0 }}>✓</span>
            <span style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6, fontWeight: 500 }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Quiz CTA */}
      <div style={{
        backgroundColor: C.surf,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '20px 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.text, fontSize: 14, fontWeight: 800, marginBottom: 4 }}>
            Knowledge Check — {day.quiz.length} Questions
          </div>
          <div style={{ color: C.muted, fontSize: 12.5, lineHeight: 1.5 }}>
            Score 80% or above to mark this day complete.
            {prevScore !== undefined && ` Your best: ${prevScore}%.`}
          </div>
        </div>
        <button
          onClick={() => setView('quiz')}
          style={{
            padding: '12px 22px', borderRadius: 10,
            border: 'none', background: C.acc,
            color: '#000', fontWeight: 800, fontSize: 14, cursor: 'pointer', flexShrink: 0,
          }}
        >
          {prevScore !== undefined ? 'Retake Quiz' : 'Take Quiz'} →
        </button>
      </div>
    </div>
  );
}

// ── Overview ──────────────────────────────────────────────────────────────────

export function MBTrainingTab() {
  const { completedMBDays, mbQuizScores } = useApp();
  const [activeDay, setActiveDay] = useState<number | null>(null);

  if (activeDay !== null) {
    const currentIdx = MB_TRAINING_DAYS.findIndex((d) => d.id === activeDay);
    const nextDay = MB_TRAINING_DAYS[currentIdx + 1];
    return (
      <div style={{ minHeight: '100vh', backgroundColor: C.bg, fontFamily: 'Inter, system-ui, sans-serif', color: C.text }}>
        <DayDetail
          dayId={activeDay}
          onBack={() => setActiveDay(null)}
          onNextDay={nextDay ? () => setActiveDay(nextDay.id) : undefined}
        />
      </div>
    );
  }

  const totalDays = MB_TRAINING_DAYS.length;
  const doneDays = completedMBDays.length;
  const pct = Math.round((doneDays / totalDays) * 100);
  const nextIncompleteDay = MB_TRAINING_DAYS.find((d) => !completedMBDays.includes(d.id));

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: C.bg,
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '28px 20px 80px', color: C.text,
    }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Hero */}
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
            <div style={{ flex: 1 }}>
              <div style={{ color: C.acc, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                Full-Cycle Media Buyer
              </div>
              <h1 style={{ color: C.text, fontSize: 24, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.4px' }}>
                5-Day Training Program
              </h1>
              <p style={{ color: '#888', fontSize: 13, margin: 0, lineHeight: 1.65, maxWidth: 480 }}>
                From task execution to account ownership. 1–2 hours per day. Complete the reading,
                then pass the quiz at 80% to mark each day done.
              </p>
            </div>
            <div style={{
              backgroundColor: '#111', border: `1px solid ${C.border2}`,
              borderRadius: 12, padding: '18px 24px', textAlign: 'center', minWidth: 130,
            }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: C.acc, lineHeight: 1 }}>{pct}%</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 4 }}>Complete</div>
              <div style={{ color: '#444', fontSize: 10, marginTop: 5 }}>{doneDays} / {totalDays} days</div>
              <div style={{ marginTop: 10, height: 4, backgroundColor: '#1f1f1f', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: C.acc, transition: 'width 0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Resume banner — shown when in progress but not done */}
        {nextIncompleteDay && doneDays > 0 && (
          <button
            onClick={() => setActiveDay(nextIncompleteDay.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              backgroundColor: nextIncompleteDay.color + '0E',
              border: `1px solid ${nextIncompleteDay.color}33`,
              borderRadius: 12, padding: '16px 20px',
              marginBottom: 4, cursor: 'pointer', textAlign: 'left',
              width: '100%',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              backgroundColor: nextIncompleteDay.color + '22',
              border: `1px solid ${nextIncompleteDay.color}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}>
              {nextIncompleteDay.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: nextIncompleteDay.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                Continue Training
              </div>
              <div style={{ color: C.text, fontSize: 13.5, fontWeight: 700 }}>
                Day {nextIncompleteDay.id}: {nextIncompleteDay.title}
              </div>
            </div>
            <div style={{ color: nextIncompleteDay.color, fontSize: 18, flexShrink: 0 }}>→</div>
          </button>
        )}

        {/* Day cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MB_TRAINING_DAYS.map((day) => {
            const isDone = completedMBDays.includes(day.id);
            const quizScore = mbQuizScores[day.id];

            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                style={{
                  backgroundColor: C.surf,
                  border: `1px solid ${isDone ? '#22C55E33' : C.border}`,
                  borderRadius: 12, padding: '20px 22px',
                  textAlign: 'left', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'border-color 0.15s',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = day.color + '88'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = isDone ? '#22C55E33' : C.border; }}
              >
                {isDone && (
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', backgroundColor: '#22C55E' }} />
                )}

                {/* Day icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  backgroundColor: day.color + '18', border: `1px solid ${day.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {isDone ? '✅' : day.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                    <span style={{ color: day.color, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Day {day.id}
                    </span>
                    <span style={{ color: '#444', fontSize: 11 }}>·</span>
                    <span style={{ color: C.muted, fontSize: 11 }}>{day.estimatedTime}</span>
                    {isDone && (
                      <span style={{
                        backgroundColor: '#22C55E22', border: '1px solid #22C55E44',
                        color: '#22C55E', fontSize: 10, fontWeight: 800,
                        padding: '1px 7px', borderRadius: 20, textTransform: 'uppercase',
                      }}>Done</span>
                    )}
                    {quizScore !== undefined && (
                      <span style={{
                        backgroundColor: (quizScore >= 80 ? '#22C55E' : '#EF4444') + '18',
                        border: `1px solid ${(quizScore >= 80 ? '#22C55E' : '#EF4444')}44`,
                        color: quizScore >= 80 ? '#22C55E' : '#EF4444',
                        fontSize: 10, fontWeight: 800,
                        padding: '1px 7px', borderRadius: 20,
                      }}>Quiz {quizScore}%</span>
                    )}
                  </div>
                  <div style={{ color: C.text, fontSize: 15, fontWeight: 800, marginBottom: 3 }}>{day.title}</div>
                  <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.5 }}>{day.subtitle}</div>
                </div>

                <div style={{ color: '#333', fontSize: 20, flexShrink: 0 }}>›</div>
              </button>
            );
          })}
        </div>

        {/* Completion banner */}
        {doneDays === totalDays && (
          <div style={{
            marginTop: 28,
            backgroundColor: '#22C55E0D',
            border: '1px solid #22C55E33',
            borderRadius: 12,
            padding: '20px 24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}>🏆</div>
            <div style={{ color: '#22C55E', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Training Complete
            </div>
            <div style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}>
              You&apos;ve completed all 5 days and passed every quiz. The real learning starts on live accounts — use the SOPs and Tools tabs as your daily reference.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
