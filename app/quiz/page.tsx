'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import { CHAPTERS, SUBJECT, getChapter, fullSyllabusQuestions, publishedChapters } from '@/data/bio12';

const BACK_HREF = 'quiz.html';

function QuizRouter() {
  const params = useSearchParams();
  const ch = params.get('ch');
  const mode = params.get('mode');

  // Full-syllabus mixed paper
  if (mode === 'full') {
    const questions = fullSyllabusQuestions(50);
    if (questions.length === 0) return <ComingSoon title="Full Syllabus Test" />;
    return (
      <Quiz
        title="Full Syllabus Test"
        subtitle={`${questions.length} mixed questions from across the published ${SUBJECT.classLabel} ${SUBJECT.name} chapters.`}
        questions={questions}
        backHref={BACK_HREF}
      />
    );
  }

  // Single chapter
  if (ch) {
    const chapter = getChapter(ch);
    if (!chapter) return <NotFound />;
    if (chapter.questions.length === 0) return <ComingSoon title={chapter.title} />;
    return (
      <Quiz
        title={chapter.title}
        subtitle={`${chapter.questions.length} questions • ${chapter.unit}`}
        questions={chapter.questions}
        backHref={BACK_HREF}
      />
    );
  }

  return <Hub />;
}

function Hub() {
  const units = Array.from(new Set(CHAPTERS.map((c) => c.unit)));
  const publishedCount = publishedChapters().length;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Practice Quizzes</h1>
          <p>
            {SUBJECT.classLabel} {SUBJECT.name} — {SUBJECT.board} pattern MCQs. Take a chapter test or attempt the full
            syllabus. Answer all questions, then submit to see your score and explanations.
          </p>
          <div className="crumbs">
            <a href="index.html">Home</a> / Quiz
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {/* Full syllabus banner */}
          <a href="?mode=full" className={`card quiz-full-card ${publishedCount === 0 ? 'is-disabled' : ''}`}>
            <div className="quiz-full-icon">📝</div>
            <div>
              <h3>Full Syllabus Test</h3>
              <p>
                {publishedCount === 0
                  ? 'Available once chapters are published.'
                  : 'A mixed paper of 50 questions sampled from all published chapters — great for revision.'}
              </p>
            </div>
            <span className="quiz-full-go">Start →</span>
          </a>

          {/* Chapter grid, grouped by unit */}
          {units.map((unit) => (
            <div key={unit} className="quiz-unit">
              <h2 className="quiz-unit-title">{unit}</h2>
              <div className="grid grid-3">
                {CHAPTERS.filter((c) => c.unit === unit).map((c, i) => {
                  const ready = c.questions.length > 0;
                  const num = CHAPTERS.indexOf(c) + 1;
                  return (
                    <a
                      key={c.slug}
                      href={ready ? `?ch=${c.slug}` : undefined}
                      className={`card quiz-ch-card ${ready ? '' : 'is-disabled'}`}
                    >
                      <div className="quiz-ch-top">
                        <span className="quiz-ch-num">{num}</span>
                        {ready ? (
                          <span className="quiz-ch-badge ready">{c.questions.length} Qs</span>
                        ) : (
                          <span className="quiz-ch-badge soon">Coming soon</span>
                        )}
                      </div>
                      <h3>{c.title}</h3>
                      <p>{ready ? 'Start chapter test →' : 'Not yet available'}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>Questions for this section are being prepared and will be published soon.</p>
        <div className="crumbs">
          <a href="index.html">Home</a> / <a href={BACK_HREF}>Quiz</a> / {title}
        </div>
        <p style={{ marginTop: 20 }}>
          <a className="btn btn-primary" href={BACK_HREF}>
            Back to all chapters
          </a>
        </p>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>Quiz not found</h1>
        <p>That chapter doesn’t exist.</p>
        <p style={{ marginTop: 20 }}>
          <a className="btn btn-primary" href={BACK_HREF}>
            Back to all chapters
          </a>
        </p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '60px 0' }}>Loading…</div>}>
      <QuizRouter />
    </Suspense>
  );
}
