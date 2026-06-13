import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "FAQ — Pioneer Coaching, Bettiah",
  description: "Frequently asked questions about fees, batches, timings, demo classes and admissions at Pioneer Coaching, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "faq.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
