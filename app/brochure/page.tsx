import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Brochure — Pioneer Coaching, Bettiah",
  description: "Download the Pioneer Coaching brochure — Class 11 & 12 Maths and Biology courses, features and contact details.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "brochure.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
