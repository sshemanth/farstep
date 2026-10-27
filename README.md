# Farstep — study abroad consultancy website

A multi-page website for a study abroad consultancy.

**Built with:** Next.js 16 (App Router) · Tailwind CSS 4 · GSAP (ScrollTrigger + SplitText) · Three.js (via React Three Fiber) · TypeScript

## Pages

| Page | What it does |
| --- | --- |
| `/` Home | 3D globe hero with a "book free counselling" form, countries, services, a scroll-pinned "5 steps" journey, FAQ |
| `/study-abroad` | All destinations |
| `/study-abroad/uk` (and `usa`, `canada`, `australia`, `ireland`, `germany`, `new-zealand`) | Country pages: lead form, key facts, why study there, cities, popular universities, latest news, FAQ |
| `/services` | Applications, test prep, student visas, education loans |
| `/universities` | Popular universities in each country with logos, plus links to search more on QS TopUniversities |
| `/about` | Story and how you work |
| `/contact` | "Book a free session" form (sends email when set up) |

## Run it on your computer

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## How to edit the site

The easiest way is right on GitHub — no software needed:

1. Open your repository on github.com and click the file you want to change (list below).
2. Click the **pencil icon** (Edit this file).
3. Make your change, then click **Commit changes…** → **Commit changes**.
4. Vercel sees the change and updates the live site in about 1–2 minutes. Check progress in Vercel → Deployments.

If a deployment fails (red in Vercel), open it to see the error. Usually it's a missing quote or comma — undo your last edit on GitHub (History → revert) or fix the typo.

### Which file to edit

| What you want to change | File |
| --- | --- |
| Business name, phone, WhatsApp | `src/lib/site.ts` |
| Menu links | `src/lib/site.ts` (`nav`) |
| Services, the 5 journey steps, home page FAQ | `src/lib/content.ts` |
| Country pages (intakes, visas, cities, FAQs) | `src/lib/countries.ts` |
| Universities list | `src/lib/universities.ts` |
| News search words for each country | `src/lib/news.ts` |
| A better logo file for a university | `src/lib/universities.ts` (`universityLogos`) + image in `public/logos/` |
| About page text | `src/app/about/page.tsx` |
| Colours and fonts | top of `src/app/globals.css` |
| Logo | `src/components/logo.tsx` and `src/app/icon.svg` |

Only change the text between quote marks `"like this"`. Keep the quotes, commas and brackets around it.

### Universities list

The list is in `src/lib/universities.ts`. Each line is one university:

```ts
{ n: "University of Melbourne", city: "Melbourne", c: "AUS", w: "https://www.unimelb.edu.au" },
```

- `n` name, `city` city, `c` country code (`UK`, `USA`, `CAN`, `AUS`, `IRL`, `GER`, `NZ`), `w` official website.
- To add one, copy a line and change it. To remove one, delete its line.
- Logos load automatically from the university's website. If one doesn't show, check the website address. To hide a logo (for example if a university asks), add its name to `hideLogo` in the same file.
- "Search more" buttons send students to QS TopUniversities. Those links are in `qsLinks` in the same file.

### Latest news on country pages

Each country page shows recent headlines from Google News (headline, source and date, linking to the original article). They refresh automatically every few hours — nothing to do. To change what kind of news appears, edit the search words for that country in `src/lib/news.ts`.

## Contact form emails (required)

Every form on the site sends you an email through [Resend](https://resend.com). Set these three environment variables in Vercel (Project → Settings → Environment Variables), then redeploy:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | Your API key from Resend (starts with `re_`) |
| `CONTACT_TO_EMAIL` | The email that receives enquiries |
| `CONTACT_FROM_EMAIL` | `Farstep <onboarding@resend.dev>` until you have your own domain |

**No domain yet?** Use `onboarding@resend.dev` as the sender. Resend only lets it send to the email you signed up with, so set `CONTACT_TO_EMAIL` to that same email. When you buy a domain, verify it in Resend and change the sender to something like `Farstep <hello@yourdomain.com>`.

If these are missing on the live site, the forms show an error and ask visitors to email you, so no enquiry is lost silently. When running locally (`npm run dev`), enquiries are printed in the terminal instead.

## Deploy to Vercel (easiest)

1. Push this folder to a GitHub repository (GitHub Desktop → Add Local Repository → Publish).
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
