import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Class 12 Board Revision Plan — Pioneer Coaching",
  description: "A week-by-week board revision plan for Class 12 Maths and Biology students.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "blog-board-strategy.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
