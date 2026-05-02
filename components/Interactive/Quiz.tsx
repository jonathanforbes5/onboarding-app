'use client';
import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight, Eye } from 'lucide-react';
import { QuizQuestion } from '@/data/sections';
import { useApp } from '@/context/AppContext';

interface QuizProps {
  sectionId: number;
  questions: QuizQuestion[];
  onComplete?: () => void;
}

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

export function Quiz({ sectionId, questions, onComplete }: QuizProps) {
  const { saveQuizScore, quizScores } = useApp();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<AnswerState[]>(Array(questions.length).fill('unanswered'));
  const [selectedOptions, setSelectedOptions] = useState<number[]>(Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  const prevScore = quizScores[sectionId];
  const q = questions[current];
  const answerState = answers[current];
  const score = Math.round((answers.filter((a) => a === 'correct').length / questions.length) * 100);
  const missed = questions.filter((_, i) => answers[i] === 'incorrect');

  const handleSelect = (optIdx: number) => {
    if (answerState !== 'unanswered') return;
    const isCorrect = optIdx === q.correctIndex;
    const newAnswers = [...answers];
    newAnswers[current] = isCorrect ? 'correct' : 'incorrect';
    const newSelected = [...selectedOptions];
    newSelected[current] = optIdx;
    setAnswers(newAnswers);
    setSelectedOptions(newSelected);
    setSelected(optIdx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const finalScore = Math.round((answers.filter((a) => a === 'correct').length / questions.length) * 100);
      saveQuizScore(sectionId, finalScore);
      setFinished(true);
      if (finalScore >= 80 && onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill('unanswered'));
    setSelectedOptions(Array(questions.length).fill(-1));
    setShowExplanation(false);
    setFinished(false);
    setReviewMode(false);
  };

  // ── Review mode (show missed questions) ──
  if (reviewMode) {
    const rq = missed[reviewIndex];
    return (
      <div className="bg-white rounded-xl border border-brand-gray-mid overflow-hidden">
        <div className="bg-brand-black text-white px-5 py-3 flex items-center justify-between">
          <span className="text-brand-yellow font-black text-sm">REVIEW — MISSED QUESTIONS</span>
          <span className="text-xs text-white/50">{reviewIndex + 1} / {missed.length}</span>
        </div>
        <div className="flex gap-1.5 px-5 pt-4">
          {missed.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full ${i === reviewIndex ? 'bg-brand-yellow' : i < reviewIndex ? 'bg-green-400' : 'bg-brand-gray-mid'}`} />
          ))}
        </div>
        <div className="px-5 pt-4 pb-2">
          <div className="text-xs font-bold text-brand-gray mb-1 uppercase tracking-widest">Correct answer:</div>
          <p className="font-bold text-sm leading-relaxed">{rq.question}</p>
        </div>
        <div className="px-5 pb-3 space-y-2">
          {rq.options.map((opt, i) => {
            const isCorrect = i === rq.correctIndex;
            return (
              <div
                key={i}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm flex items-center justify-between gap-3 ${
                  isCorrect ? 'border-green-500 bg-green-50' : 'border-brand-gray-mid bg-white opacity-40'
                }`}
              >
                <span>{opt}</span>
                {isCorrect && <CheckCircle size={16} className="text-green-500 flex-shrink-0" />}
              </div>
            );
          })}
        </div>
        <div className="mx-5 mb-4 p-3 rounded-lg text-sm bg-green-50 text-green-800">
          <span className="font-bold">Explanation: </span>{rq.explanation}
        </div>
        <div className="px-5 pb-5 flex gap-3">
          {reviewIndex < missed.length - 1 ? (
            <button
              onClick={() => setReviewIndex(i => i + 1)}
              className="flex-1 py-2.5 rounded-lg bg-brand-yellow text-brand-black font-bold text-sm flex items-center justify-center gap-2"
            >
              Next Missed Question <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="flex-1 py-2.5 rounded-lg bg-brand-yellow text-brand-black font-bold text-sm flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} /> Retake Quiz
            </button>
          )}
          <button
            onClick={() => { setReviewMode(false); }}
            className="px-4 py-2.5 rounded-lg border border-brand-gray-mid text-sm font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // ── Finished state ──
  if (finished) {
    return (
      <div className="bg-white rounded-xl border border-brand-gray-mid p-6 text-center">
        <div className="flex justify-center mb-4">
          {score >= 80 ? (
            <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center">
              <Trophy size={28} className="text-brand-black" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <RotateCcw size={28} className="text-red-500" />
            </div>
          )}
        </div>
        <div className="text-3xl font-black mb-1">{score}%</div>
        <div className="text-brand-gray text-sm mb-1">
          {answers.filter((a) => a === 'correct').length} of {questions.length} correct
        </div>
        <div className={`text-sm font-bold mb-5 ${score >= 80 ? 'text-green-600' : 'text-red-600'}`}>
          {score === 100 ? 'Perfect score! Outstanding.' : score >= 80 ? 'Section complete — well done!' : `Need 80% to pass. You scored ${score}% — review and retry.`}
        </div>

        {score < 80 && missed.length > 0 && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-100 text-left">
            <div className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">Missed {missed.length} question{missed.length > 1 ? 's' : ''}:</div>
            {missed.map((q) => (
              <div key={q.question} className="text-xs text-red-600 mb-1 flex items-start gap-1.5">
                <XCircle size={11} className="flex-shrink-0 mt-0.5" />
                <span className="truncate">{q.question}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-gray-mid text-sm font-bold hover:bg-brand-gray-light transition-colors"
          >
            <RotateCcw size={14} />
            Retake Quiz
          </button>
          {score < 80 && missed.length > 0 && (
            <button
              onClick={() => { setReviewMode(true); setReviewIndex(0); }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-sm font-bold hover:bg-blue-100 transition-colors"
            >
              <Eye size={14} />
              Review Missed ({missed.length})
            </button>
          )}
          {score >= 80 && onComplete && (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-yellow text-brand-black text-sm font-bold hover:bg-brand-yellow-dark transition-colors"
            >
              Continue <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Active quiz ──
  return (
    <div className="bg-white rounded-xl border border-brand-gray-mid overflow-hidden">
      {/* Header */}
      <div className="bg-brand-black text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-brand-yellow font-black text-sm">KNOWLEDGE CHECK</span>
          <span className="text-xs text-white/50">· Score 80%+ to complete</span>
          {prevScore !== undefined && (
            <span className="text-xs text-white/40">· Best: {prevScore}%</span>
          )}
        </div>
        <span className="text-xs text-white/50">
          {current + 1} / {questions.length}
        </span>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 px-5 pt-4">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < current
                ? answers[i] === 'correct' ? 'bg-green-400' : 'bg-red-400'
                : i === current
                ? 'bg-brand-yellow'
                : 'bg-brand-gray-mid'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="px-5 pt-4 pb-2">
        <p className="font-bold text-sm leading-relaxed">{q.question}</p>
      </div>

      {/* Options */}
      <div className="px-5 pb-4 space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.correctIndex;
          let style = 'border-brand-gray-mid bg-white hover:border-brand-black hover:bg-brand-gray-light';

          if (answerState !== 'unanswered') {
            if (isCorrect) style = 'border-green-500 bg-green-50';
            else if (isSelected && !isCorrect) style = 'border-red-400 bg-red-50';
            else style = 'border-brand-gray-mid bg-white opacity-50';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all ${style} flex items-center justify-between gap-3`}
              disabled={answerState !== 'unanswered'}
            >
              <span>{opt}</span>
              {answerState !== 'unanswered' && isCorrect && <CheckCircle size={16} className="text-green-500 flex-shrink-0" />}
              {answerState !== 'unanswered' && isSelected && !isCorrect && <XCircle size={16} className="text-red-500 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`mx-5 mb-4 p-3 rounded-lg text-sm animate-slide-up ${answerState === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <span className="font-bold">{answerState === 'correct' ? 'Correct! ' : 'Not quite. '}</span>
          {q.explanation}
        </div>
      )}

      {/* Next */}
      {showExplanation && (
        <div className="px-5 pb-5">
          <button
            onClick={handleNext}
            className="w-full py-2.5 rounded-lg bg-brand-yellow text-brand-black font-bold text-sm flex items-center justify-center gap-2 hover:bg-brand-yellow-dark transition-colors"
          >
            {current < questions.length - 1 ? 'Next Question' : 'See Results'}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
