import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Time Table — Pioneer Coaching, Bettiah",
  description: "Weekly class schedule for Class 11 & 12 Maths and Biology batches at Pioneer Coaching, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "timetable.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
