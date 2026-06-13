import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Biology — Class 11 & 12 Curriculum & Study Plan | Pioneer Coaching",
  description: "Full Class 11 & 12 Biology curriculum at Pioneer Coaching, Bettiah — complete unit-wise NCERT syllabus, NEET foundation, diagrams & MCQ practice, with a month-by-month study plan.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "course-biology.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
