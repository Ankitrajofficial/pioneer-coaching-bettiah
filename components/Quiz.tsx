'use client';

import { useMemo, useState } from 'react';
import type { MCQ } from '@/data/bio12';

interface QuizProps {
  title: string;
  subtitle?: string;
  questions: MCQ[];
  backHref: string; // where the "Back to chapters" link points
}

export default function Quiz({ title, subtitle, questions, backHref }: QuizProps) {
  // answers[i] = chosen option index, or -1 if unanswered
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [submitted, setSubmitted] = useState(false);

  const total = questions.length;
  const attempted = answers.filter((a) => a !== -1).length;
  const score = useMemo(
    () => answers.reduce((s, a, i) => (a === questions[i].answer ? s + 1 : s), 0),
    [answers, questions],
  );

  function choose(qIndex: number, optIndex: number) {
    if (submitted) return;
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
  }

  function submit() {
    setSubmitted(true);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function retake() {
    setAnswers(questions.map(() => -1));
    setSubmitted(false);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pct = total ? Math.round((score / total) * 100) : 0;
  const verdict =
    pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good — keep practising.' : pct >= 40 ? 'Needs work.' : 'Revise this chapter.';

  return (
    <section>
      <div className="container quiz-wrap">
        <div className="crumbs">
          <a href="index.html">Home</a> / <a href={backHref}>Quiz</a> / {title}
        </div>
        <div className="quiz-head">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {submitted && (
          <div className="quiz-scorecard reveal in">
            <div className="score-ring" data-pct={pct} style={{ '--pct': pct } as React.CSSProperties}>
              <span className="score-num">
                {score}/{total}
              </span>
            </div>
            <div className="score-meta">
              <h2>{verdict}</h2>
              <p>
                You scored <b>{pct}%</b> — {score} correct out of {total}. Scroll down to review the answers.
              </p>
              <div className="quiz-actions">
                <button className="btn btn-primary" onClick={retake}>
                  Retake test
                </button>
                <a className="btn btn-outline" href={backHref}>
                  Choose another chapter
                </a>
              </div>
            </div>
          </div>
        )}

        <ol className="quiz-list">
          {questions.map((q, i) => {
            const chosen = answers[i];
            return (
              <li key={i} className="quiz-q card">
                <p className="q-text">
                  <span className="q-num">Q{i + 1}.</span> {q.q}
                </p>
                <div className="q-options">
                  {q.options.map((opt, oi) => {
                    const isChosen = chosen === oi;
                    const isCorrect = q.answer === oi;
                    let state = '';
                    if (submitted) {
                      if (isCorrect) state = 'correct';
                      else if (isChosen) state = 'wrong';
                    } else if (isChosen) {
                      state = 'chosen';
                    }
                    return (
                      <button
                        key={oi}
                        type="button"
                        className={`q-opt ${state}`}
                        onClick={() => choose(i, oi)}
                        disabled={submitted}
                      >
                        <span className="q-opt-key">{String.fromCharCode(65 + oi)}</span>
                        <span className="q-opt-text">{opt}</span>
                      </button>
                    );
                  })}
                </div>
                {submitted && q.explanation && (
                  <p className="q-explain">
                    <b>Explanation:</b> {q.explanation}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        {!submitted && (
          <div className="quiz-footer">
            <span className="quiz-progress">
              Attempted {attempted} of {total}
            </span>
            <button className="btn btn-primary btn-lg" onClick={submit} disabled={attempted === 0}>
              Submit test
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
