# Pioneer Coaching — Website

A fast, responsive, no-build static website for **Pioneer Coaching**, Bettiah.
Built with plain HTML + CSS + JavaScript — host it anywhere, free.

## Pages
| File | Page |
|------|------|
| `index.html` | Home (hero, features, courses, stats, toppers, testimonials) |
| `about.html` | About / mission / vision |
| `courses.html` | Class 11 & 12 Maths & Biology — details, fees, batches |
| `faculty.html` | Teacher profiles |
| `results.html` | Toppers & board results |
| `gallery.html` | Photo gallery |
| `contact.html` | Enquiry form + Google Map |

## Functional features (no server needed)
- **Enquiry forms** open WhatsApp pre-filled with the student's details → you receive the enquiry as a chat message.
- **Floating WhatsApp button** on every page.
- **Click-to-call** phone links.
- Animated counters, scroll reveals, mobile menu, Google Map embed.

## ✏️ How to customize
1. **Phone / WhatsApp / address / email** — edit the `PIONEER` object at the top of `js/main.js`.
   - Note: the `tel:` and `wa.me` links inside the HTML are also hardcoded as `+916202149922` / `916202149922`. Search & replace if your number changes.
2. **Faculty** — edit names, roles and initials in `faculty.html`.
3. **Toppers & results** — edit names/scores in `results.html` and the toppers block in `index.html`.
4. **Photos** — put real images in the `assets/` folder and replace the colored placeholder blocks in `gallery.html` / `faculty.html` with `<img src="assets/your-photo.jpg">`.
5. **Colors / fonts** — all in `:root` at the top of `css/style.css`.

> ⚠️ Stats like "500+ students", "95% pass rate" and topper names are **sample placeholders** — replace them with real figures before going live.

## 🚀 Preview locally
```bash
cd pioneer-coaching
python3 -m http.server 8000
# open http://localhost:8000
```

## 🌐 Publish (free options)
- **Netlify** — drag the `pioneer-coaching` folder onto app.netlify.com/drop.
- **Vercel** — `vercel` in this folder, or import via the dashboard.
- **GitHub Pages** — push to a repo, enable Pages on the main branch.
- A custom domain like `pioneercoaching.in` can be pointed at any of these.

## 🔮 Phase 2 — adding a backend later
The site is structured so you can add dynamic features without a rewrite:
- **Student login + online tests / mock exams**
- **Online fee payment** (Razorpay / UPI)
- **Admin dashboard** to add courses, results & notices
- **Real enquiry storage** (replace the WhatsApp form action with a form backend like Formspree, or an API route)

Recommended stack for phase 2: **Next.js + Prisma + Postgres**, reusing this design system.
