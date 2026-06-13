import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Notices & Announcements — Pioneer Coaching, Bettiah",
  description: "Latest notices, admission dates, test schedules and announcements from Pioneer Coaching, Bettiah.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "notices.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
