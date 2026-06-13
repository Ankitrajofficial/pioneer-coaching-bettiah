# Pioneer Coaching — Next.js

Next.js (App Router, TypeScript) version of the Pioneer Coaching website.

## Run

```bash
npm install
npm run dev      # http://localhost:3000  (dev)
npm run build    # production build
npm run start    # serve the production build
```

## How it's structured (Phase 1 — identical frontend)

- **`app/globals.css`** — the design system, copied verbatim from the original `css/style.css`.
- **`components/`** — shared chrome rendered on every page:
  - `SiteHeader.tsx` — nav (active tab via `usePathname`).
  - `SiteFooter.tsx`, `FloatWhatsApp.tsx`.
- **`public/main.js`** — the original site script, reused unchanged. It still drives the
  notice ticker, "More" dropdown, language (EN/हिंदी) toggle, scroll reveals, animated
  counters, FAQ accordion, gallery lightbox, mobile nav and the enquiry form. Loaded via
  `next/script` (afterInteractive) in `app/layout.tsx`.
- **`content/*.html`** — each page's body, extracted verbatim from the original HTML and
  rendered with `dangerouslySetInnerHTML`. This guarantees a pixel-identical frontend.
  Regenerate from the static site with `node gen.mjs`.
- **`app/<route>/page.tsx`** — one route per original page (`/about`, `/courses`,
  `/course-maths`, ...). Per-page `<title>`/description set via the Metadata API.
- **`next.config.mjs`** — rewrites so legacy `*.html` links keep working
  (`/about.html` → `/about`, `/index.html` → `/`). This also lets `main.js` keep
  identifying the page by filename exactly as before.

Internal links are intentionally plain `.html` anchors (full-page navigation) so `main.js`
re-initialises on every page the same way it did on the static site.

## Phase 2 (planned, not built yet)

Student login + study-material gating (public 25% / registered 100%). This is why the
site was moved to Next.js — it provides the server-side backend the static site lacked.
Likely: NextAuth + a database (Supabase/Postgres), with the locked files served only
after a server-side auth check. Convert content pages to full JSX as needed along the way.
