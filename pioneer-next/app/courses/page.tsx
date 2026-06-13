import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Courses — Class 11 & 12 Maths & Biology | Pioneer Coaching",
  description: "Course details for Class 11 & 12 Mathematics and Biology at Pioneer Coaching, Bettiah — syllabus, batch timings, test series and fees.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "courses.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
