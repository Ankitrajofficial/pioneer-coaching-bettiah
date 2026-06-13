import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Why NCERT is Enough for Biology — Pioneer Coaching",
  description: "How to use NCERT effectively to score high in Class 11 and 12 Biology boards.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "blog-biology-ncert.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
