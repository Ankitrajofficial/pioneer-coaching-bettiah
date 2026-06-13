import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Study Tips & Blog — Pioneer Coaching, Bettiah",
  description: "Exam strategies, study tips and updates for Class 11 & 12 Maths and Biology students from Pioneer Coaching, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "blog.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
