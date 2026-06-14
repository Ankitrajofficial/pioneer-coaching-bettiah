// Quiz subject (stream) registry. Drives the stream-selection step on /quiz.
//
// Flow: choose a stream (subject) -> choose a chapter -> attempt the questions.

import type { MCQ, Chapter } from './bio12';
import { CHAPTERS as BIOLOGY_CHAPTERS } from './bio12';
import { MATHS_CHAPTERS } from './maths12';

export type { MCQ, Chapter };

export interface Subject {
  id: string; // used in the ?subject= query param
  name: string;
  classLabel: string;
  board: string;
  icon: string; // emoji shown on the stream card
  blurb: string;
  chapters: Chapter[];
}

export const SUBJECTS: Subject[] = [
  {
    id: 'biology',
    name: 'Biology',
    classLabel: 'Class 12',
    board: 'Bihar Board / NCERT',
    icon: '🧬',
    blurb: 'Chapter-wise MCQs across Reproduction, Genetics, Biotechnology and Ecology.',
    chapters: BIOLOGY_CHAPTERS,
  },
  {
    id: 'maths',
    name: 'Mathematics',
    classLabel: 'Class 12',
    board: 'Bihar Board / NCERT',
    icon: '📐',
    blurb: 'Chapter-wise MCQs across Calculus, Algebra, Vectors, 3-D Geometry and Probability.',
    chapters: MATHS_CHAPTERS,
  },
];

export function getSubject(id: string | null): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function getChapter(subject: Subject, slug: string): Chapter | undefined {
  return subject.chapters.find((c) => c.slug === slug);
}

export function publishedChapters(subject: Subject): Chapter[] {
  return subject.chapters.filter((c) => c.questions.length > 0);
}

export function subjectQuestionCount(subject: Subject): number {
  return subject.chapters.reduce((n, c) => n + c.questions.length, 0);
}

// Mixed "full syllabus" paper: sample up to `count` questions from all
// published chapters of the subject, in random order.
export function fullSyllabusQuestions(subject: Subject, count = 50): MCQ[] {
  const pool = publishedChapters(subject).flatMap((c) => c.questions);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
