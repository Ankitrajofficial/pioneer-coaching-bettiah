'use client';

import { usePathname } from 'next/navigation';

// Top-level nav links (the "More" dropdown + language toggle are injected by main.js).
const LINKS = [
  { href: 'index.html', slug: 'index', label: 'Home' },
  { href: 'about.html', slug: 'about', label: 'About' },
  { href: 'courses.html', slug: 'courses', label: 'Courses' },
  { href: 'quiz.html', slug: 'quiz', label: 'Quiz' },
  { href: 'faculty.html', slug: 'faculty', label: 'Faculty' },
  { href: 'results.html', slug: 'results', label: 'Results' },
  { href: 'gallery.html', slug: 'gallery', label: 'Gallery' },
  { href: 'contact.html', slug: 'contact', label: 'Contact' },
];

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  let current = (pathname.split('/').pop() || '').replace('.html', '') || 'index';
  // Course detail pages keep the "Courses" tab highlighted.
  if (current === 'course-maths' || current === 'course-biology') current = 'courses';

  return (
    <header className="header">
      <div className="container nav">
        <a href="index.html" className="logo">
          <div className="logo-mark">PC</div>
          <div className="logo-text">Pioneer</div>
        </a>
        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.slug} href={l.href} className={current === l.slug ? 'active' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-cta">
          <a href="tel:+916202149922" className="btn btn-outline always">Call Now</a>
          <a href="contact.html" className="btn btn-primary">Enquire Now</a>
        </div>
        <button className="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </header>
  );
}
