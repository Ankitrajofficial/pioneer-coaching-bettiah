import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mathematics — Class 11 & 12 Curriculum & Study Plan | Pioneer Coaching",
  description: "Full Class 11 & 12 Mathematics curriculum at Pioneer Coaching, Bettiah — complete unit-wise syllabus, teaching approach and a month-by-month study plan for boards and competitive foundation.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "course-maths.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
