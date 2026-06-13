import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Results & Toppers — Pioneer Coaching, Bettiah",
  description: "Board results and topper achievements of Pioneer Coaching students, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "results.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
