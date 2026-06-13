import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact & Admissions — Pioneer Coaching, Bettiah",
  description: "Contact Pioneer Coaching, Bettiah for admissions and enquiries. Address, phone, WhatsApp and location map.",
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', "contact.html"), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
