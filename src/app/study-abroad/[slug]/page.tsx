import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/lead-form";
import { CtaBand } from "@/components/cta-band";
import { countryPages, getCountry, placeName, type Tone } from "@/lib/countries";
import { qsLinks, universitiesIn } from "@/lib/universities";
import { UniCard } from "@/components/uni-card";

const toneClass: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  flamingo: "bg-flamingo text-ink",
  mint: "bg-mint text-ink",
  cobalt: "bg-cobalt text-white on-dark",
};
const dotClass: Record<Tone, string> = {
  sun: "bg-sun",
  flamingo: "bg-flamingo",
  mint: "bg-mint",
  cobalt: "bg-cobalt",
};

export function generateStaticParams() {
  return countryPages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/study-abroad/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCountry(slug);
  if (!c) return {};
  return { title: c.headline, description: c.intro };
}

// The page shell renders instantly; the country content streams in from the URL.
export default function CountryPage({ params }: PageProps<"/study-abroad/[slug]">) {
  return (
    <Suspense fallback={<CountrySkeleton />}>
      <CountryContent params={params} />
    </Suspense>
  );
}

function CountrySkeleton() {
  return (
    <div className="px-2 sm:px-4" aria-busy="true">
      <div className="h-[560px] animate-pulse rounded-[2rem] bg-haze motion-reduce:animate-none sm:rounded-[2.75rem]" />
    </div>
  );
}

async function CountryContent({ params }: { params: PageProps<"/study-abroad/[slug]">["params"] }) {
  const { slug } = await params;
  const c = getCountry(slug);
  if (!c) notFound();

  const dark = c.tone === "cobalt";
  const unis = universitiesIn(c.code);
  const others = countryPages.filter((x) => x.slug !== c.slug);

  return (
    <>
      <section className="px-2 sm:px-4">
        <div className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] ${toneClass[c.tone]}`}>
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:px-14">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm font-semibold">
                <ol className="flex gap-2">
                  <li>
                    <Link href="/study-abroad" className="underline underline-offset-4">
                      Study abroad
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{c.name}</li>
                </ol>
              </nav>
              <h1 className="mt-6 text-hero">{c.headline}</h1>
              <p className={`mt-6 max-w-[36rem] text-lede ${dark ? "text-white/90" : "text-ink/85"}`}>{c.intro}</p>
              <span
                aria-hidden="true"
                className="stamp mt-10 hidden size-28 -rotate-12 place-items-center font-display text-3xl font-black lg:grid"
              >
                {c.code}
              </span>
            </div>
            <LeadForm idPrefix={`lead-${c.slug}`} defaultCountry={c.name} title={`Talk to a counsellor about ${placeName(c.name)}`} />
          </div>
        </div>
      </section>

      <section aria-labelledby="facts-title" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 id="facts-title" className="text-display">
              At a glance
            </h2>
            <p className="mt-4 max-w-sm text-ink/75">
              Visa and work rules change often. Your counsellor will confirm the latest before you apply.
            </p>
          </div>
          <dl className="divide-y-2 divide-dashed divide-ink/20 rounded-[1.5rem] bg-white px-7 ring-2 ring-ink">
            {c.facts.map((f) => (
              <div key={f.label} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-6">
                <dt className="font-semibold text-ink/70">{f.label}</dt>
                <dd className="font-display font-bold">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="why-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <h2 id="why-title" className="text-display">
          Why students choose {placeName(c.name)}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {c.why.map((w) => (
            <div key={w.title}>
              <span className={`block h-2 w-16 rounded-full ${dotClass[c.tone]}`} aria-hidden="true" />
              <h3 className="mt-5 text-title">{w.title}</h3>
              <p className="mt-3 text-ink/80">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="cities-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
        <div>
          <div>
            <h2 id="cities-title" className="text-title">
              Popular student cities
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {c.cities.map((city) => (
                <li key={city} className="rounded-full bg-haze px-4 py-2 font-bold">
                  {city}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {unis.length > 0 && (
        <section aria-labelledby="unis-title" className="mx-auto max-w-7xl px-4 pt-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="unis-title" className="text-display">
              Popular universities
            </h2>
            <a
              href={qsLinks.universities}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline decoration-2 underline-offset-4"
            >
              Search more on QS TopUniversities<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {unis.map((u) => (
              <UniCard key={u.n} u={u} />
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="cfaq-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 id="cfaq-title" className="text-display">
            Questions about {placeName(c.name)}
          </h2>
          <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/10">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    className="grid size-9 shrink-0 place-items-center rounded-full bg-haze text-xl transition-transform group-open:rotate-45 group-open:bg-sun motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[60ch] pb-5 text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <nav aria-label="Other destinations" className="mt-20">
          <h2 className="font-sans text-lg font-bold">Other destinations</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/study-abroad/${o.slug}`}
                  className="inline-block rounded-full px-4 py-2 font-bold ring-2 ring-ink hover:bg-ink hover:text-white"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <CtaBand title={`Ready to plan your move to ${placeName(c.name)}?`} />
    </>
  );
}
