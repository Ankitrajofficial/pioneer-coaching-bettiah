import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "5 Common Maths Mistakes — Pioneer Coaching",
  description: "Five common mistakes Class 11 and 12 students make in Maths and how to fix them.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "blog-maths-mistakes.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
