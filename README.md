# Farstep — study abroad consultancy website

A multi-page website for a study abroad consultancy and EdTech company.

**Built with:** Next.js 16 (App Router) · Tailwind CSS 4 · GSAP (ScrollTrigger + SplitText) · Three.js (via React Three Fiber) · TypeScript

## Pages

| Page | What it does |
| --- | --- |
| `/` Home | 3D globe hero with flight routes, countries, services, a scroll-pinned "5 steps" journey, FAQ |
| `/services` | Applications, test prep, student visas, education loans |
| `/course-finder` | Search and filter courses by country, level and subject |
| `/about` | Story and how you work |
| `/contact` | "Book a free session" form (sends email when set up) |

## Run it on your computer

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

1. **Brand name and contact details** — edit `src/lib/site.ts`. "Farstep" is a placeholder name.
2. **Service text, journey steps, FAQ** — edit `src/lib/content.ts`.
3. **Courses** — `src/lib/courses.ts` holds **sample** listings only. Replace them with your real course data (or call your course API). If you run a separate course-search platform, put its link in `courseFinderUrl` in `site.ts`.
4. **Colours and fonts** — the `@theme` block at the top of `src/app/globals.css`.
5. **Logo** — `src/components/logo.tsx` and `src/app/icon.svg`.

## Contact form emails

The form posts to `src/app/api/contact/route.ts`. To get enquiries by email, create a free account at [resend.com](https://resend.com), verify your domain, then add these environment variables (in Vercel: Project → Settings → Environment Variables):

```
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL=Website <hello@yourdomain.com>
```

Without them, the form still works, but enquiries are only written to the server log.

## Deploy to Vercel (easiest)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository. Vercel detects Next.js automatically — no settings needed.
3. Add the email environment variables above.
4. Add your own domain under Project → Settings → Domains.

All pages are pre-built as static files, so Vercel serves them from its global edge network. Only the contact form runs as a server function.

## Deploy to Cloudflare (alternative)

Cloudflare runs Next.js through the OpenNext adapter. Follow the current guide at
[opennext.js.org/cloudflare](https://opennext.js.org/cloudflare) — in short, you add `@opennextjs/cloudflare` and `wrangler`, then build and deploy with the commands the guide gives. Set the same email variables as Cloudflare secrets.

Note: this project uses Next.js Cache Components, which need the Node.js runtime. Don't add `export const runtime = "edge"` to any file.

## Project structure

```
src/
  app/                 pages, layout, API route, sitemap, robots
  components/
    globe/             Three.js globe (client-only, lazy-loaded)
    home/              hero, destinations, services, journey
  data/globe-points.json   land dots for the globe (made by scripts/make-globe-points.mjs)
  lib/                 site settings, content, courses, GSAP setup
```

## Accessibility and performance

- Respects "reduce motion": no intro animation, no pinned scroll, no spinning globe.
- The 3D scene loads only in the browser, after the page, and stops drawing when it's off screen.
- Keyboard focus is always visible; the form shows clear errors and moves focus to the first one.
- Fonts are self-hosted (no Google Fonts request).
