'use client';
import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Trophy, ChevronRight } from 'lucide-react';
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
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const prevScore = quizScores[sectionId];
  const q = questions[current];
  const answerState = answers[current];

  const handleSelect = (optIdx: number) => {
    if (answerState !== 'unanswered') return;
    const isCorrect = optIdx === q.correctIndex;
    const newAnswers = [...answers];
    newAnswers[current] = isCorrect ? 'correct' : 'incorrect';
    setAnswers(newAnswers);
    setSelected(optIdx);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const score = Math.round((answers.filter((a) => a === 'correct').length / questions.length) * 100);
      saveQuizScore(sectionId, score);
      setFinished(true);
      if (score >= 80 && onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill('unanswered'));
    setShowExplanation(false);
    setFinished(false);
  };

  const score = Math.round((answers.filter((a) => a === 'correct').length / questions.length) * 100);

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
          {score >= 100 ? 'Perfect score!' : score >= 80 ? 'Section complete!' : 'Review the section and try again'}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-brand-gray-mid text-sm font-bold hover:bg-brand-gray-light transition-colors"
          >
            <RotateCcw size={14} />
            Retake Quiz
          </button>
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

  return (
    <div className="bg-white rounded-xl border border-brand-gray-mid overflow-hidden">
      {/* Header */}
      <div className="bg-brand-black text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-brand-yellow font-black text-sm">KNOWLEDGE CHECK</span>
          {prevScore !== undefined && (
            <span className="text-xs text-white/50">Previous: {prevScore}%</span>
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
        <div className={`mx-5 mb-4 p-3 rounded-lg text-sm ${answerState === 'correct' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
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
