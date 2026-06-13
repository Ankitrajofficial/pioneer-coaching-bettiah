import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pioneer Coaching — Class 11 & 12 Maths & Biology | Bettiah, Bihar",
  description: "Pioneer Coaching, Bettiah — expert coaching for Class 11 & 12 Mathematics and Biology. Small batches, experienced faculty, regular tests and proven results.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "home.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
