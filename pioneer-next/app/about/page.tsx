import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us — Pioneer Coaching, Bettiah",
  description: "About Pioneer Coaching, Bettiah — our mission, teaching approach and why students trust us for Class 11 & 12 Maths and Biology.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "about.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
