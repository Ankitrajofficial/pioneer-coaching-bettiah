import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const SRC = join(process.cwd(), '..'); // static site root
const PAGES = [
  { file: 'index.html',               slug: 'home',               route: '' },
  { file: 'about.html',               slug: 'about',              route: 'about' },
  { file: 'courses.html',             slug: 'courses',            route: 'courses' },
  { file: 'course-maths.html',        slug: 'course-maths',       route: 'course-maths' },
  { file: 'course-biology.html',      slug: 'course-biology',     route: 'course-biology' },
  { file: 'faculty.html',             slug: 'faculty',            route: 'faculty' },
  { file: 'results.html',             slug: 'results',            route: 'results' },
  { file: 'gallery.html',             slug: 'gallery',            route: 'gallery' },
  { file: 'contact.html',             slug: 'contact',            route: 'contact' },
  { file: 'notices.html',             slug: 'notices',            route: 'notices' },
  { file: 'timetable.html',           slug: 'timetable',          route: 'timetable' },
  { file: 'blog.html',                slug: 'blog',               route: 'blog' },
  { file: 'blog-board-strategy.html', slug: 'blog-board-strategy',route: 'blog-board-strategy' },
  { file: 'blog-maths-mistakes.html', slug: 'blog-maths-mistakes',route: 'blog-maths-mistakes' },
  { file: 'blog-biology-ncert.html',  slug: 'blog-biology-ncert', route: 'blog-biology-ncert' },
  { file: 'faq.html',                 slug: 'faq',                route: 'faq' },
  { file: 'brochure.html',            slug: 'brochure',           route: 'brochure' },
];

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
const pick = (html, re, d = '') => { const m = html.match(re); return m ? decode(m[1].trim()) : d; };

for (const p of PAGES) {
  const html = readFileSync(join(SRC, p.file), 'utf8');
  const title = pick(html, /<title>([\s\S]*?)<\/title>/i);
  const desc  = pick(html, /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i);

  // Body = everything between the end of the header and the start of the footer.
  const afterHeader = html.split('</header>')[1] ?? html;
  const body = afterHeader.split('<footer')[0].trim();
  writeFileSync(join(process.cwd(), 'content', p.slug + '.html'), body + '\n');

  const dir = p.route ? join(process.cwd(), 'app', p.route) : join(process.cwd(), 'app');
  mkdirSync(dir, { recursive: true });
  const tsx =
`import { readFileSync } from 'fs';
import { join } from 'path';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(desc)},
};

export default function Page() {
  const html = readFileSync(join(process.cwd(), 'content', ${JSON.stringify(p.slug + '.html')}), 'utf8');
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
`;
  writeFileSync(join(dir, 'page.tsx'), tsx);
  console.log(`✓ ${p.file.padEnd(26)} -> /${p.route}  (body ${body.length}b)`);
}
console.log('done:', PAGES.length, 'pages');
