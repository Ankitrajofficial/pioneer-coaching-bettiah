import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Gallery — Pioneer Coaching, Bettiah",
  description: "Photos from classrooms, events and student life at Pioneer Coaching, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "gallery.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
