'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Quiz from '@/components/Quiz';
import {
  SUBJECTS,
  getSubject,
  getChapter,
  publishedChapters,
  subjectQuestionCount,
  fullSyllabusQuestions,
  type Subject,
} from '@/data/subjects';

const STREAMS_HREF = 'quiz.html'; // back to stream selection

function chaptersHref(subjectId: string) {
  return `?subject=${subjectId}`;
}

function QuizRouter() {
  const params = useSearchParams();
  const subjectId = params.get('subject');
  const ch = params.get('ch');
  const mode = params.get('mode');

  // Step 1: no subject chosen -> stream selection
  const subject = getSubject(subjectId);
  if (!subject) return <StreamSelect />;

  // Step 3a: full-syllabus paper for this subject
  if (mode === 'full') {
    const questions = fullSyllabusQuestions(subject, 50);
    if (questions.length === 0) return <ComingSoon subject={subject} title="Full Syllabus Test" />;
    return (
      <Quiz
        title={`${subject.name} — Full Syllabus Test`}
        subtitle={`${questions.length} mixed questions from across the published ${subject.classLabel} ${subject.name} chapters.`}
        questions={questions}
        backHref={chaptersHref(subject.id)}
      />
    );
  }

  // Step 3b: a specific chapter quiz
  if (ch) {
    const chapter = getChapter(subject, ch);
    if (!chapter) return <NotFound />;
    if (chapter.questions.length === 0) return <ComingSoon subject={subject} title={chapter.title} />;
    return (
      <Quiz
        title={chapter.title}
        subtitle={`${subject.name} • ${chapter.questions.length} questions • ${chapter.unit}`}
        questions={chapter.questions}
        backHref={chaptersHref(subject.id)}
      />
    );
  }

  // Step 2: subject chosen, no chapter yet -> chapter list
  return <ChapterSelect subject={subject} />;
}

/* ---------- Step 1: stream selection ---------- */
function StreamSelect() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Practice Quizzes</h1>
          <p>Choose your stream to begin. Pick a chapter test or attempt the full syllabus — answer all questions, then submit to see your score and explanations.</p>
          <div className="crumbs">
            <a href="index.html">Home</a> / Quiz
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="sec-head text-center">
            <span className="eyebrow">Step 1 of 3</span>
            <h2>Select your stream</h2>
          </div>
          <div className="grid grid-2 quiz-stream-grid">
            {SUBJECTS.map((s) => {
              const count = subjectQuestionCount(s);
              const ready = count > 0;
              return (
                <a key={s.id} href={`?subject=${s.id}`} className="card quiz-stream-card">
                  <div className="quiz-stream-icon">{s.icon}</div>
                  <h3>{s.name}</h3>
                  <p className="quiz-stream-meta">{s.classLabel} • {s.board}</p>
                  <p>{s.blurb}</p>
                  <span className={`quiz-ch-badge ${ready ? 'ready' : 'soon'}`}>
                    {ready ? `${count} questions` : 'Coming soon'}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Step 2: chapter selection ---------- */
function ChapterSelect({ subject }: { subject: Subject }) {
  const units = Array.from(new Set(subject.chapters.map((c) => c.unit)));
  const publishedCount = publishedChapters(subject).length;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>{subject.name} — {subject.classLabel}</h1>
          <p>{subject.board} pattern MCQs. Take a chapter test or attempt the full syllabus.</p>
          <div className="crumbs">
            <a href="index.html">Home</a> / <a href={STREAMS_HREF}>Quiz</a> / {subject.name}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="quiz-step-bar">
            <a href={STREAMS_HREF} className="quiz-back-link">← Change stream</a>
            <span className="eyebrow">Step 2 of 3 — Select a chapter</span>
          </div>

          {/* Full syllabus banner */}
          <a href={`?subject=${subject.id}&mode=full`} className={`card quiz-full-card ${publishedCount === 0 ? 'is-disabled' : ''}`}>
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

          {/* Chapter grid grouped by unit */}
          {units.map((unit) => (
            <div key={unit} className="quiz-unit">
              <h2 className="quiz-unit-title">{unit}</h2>
              <div className="grid grid-3">
                {subject.chapters.filter((c) => c.unit === unit).map((c) => {
                  const ready = c.questions.length > 0;
                  const num = subject.chapters.indexOf(c) + 1;
                  return (
                    <a
                      key={c.slug}
                      href={ready ? `?subject=${subject.id}&ch=${c.slug}` : undefined}
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

function ComingSoon({ subject, title }: { subject: Subject; title: string }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>Questions for this section are being prepared and will be published soon.</p>
        <div className="crumbs">
          <a href="index.html">Home</a> / <a href={STREAMS_HREF}>Quiz</a> / <a href={chaptersHref(subject.id)}>{subject.name}</a> / {title}
        </div>
        <p style={{ marginTop: 20 }}>
          <a className="btn btn-primary" href={chaptersHref(subject.id)}>Back to {subject.name} chapters</a>
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
          <a className="btn btn-primary" href={STREAMS_HREF}>Back to all streams</a>
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
