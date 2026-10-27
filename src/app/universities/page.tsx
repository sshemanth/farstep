import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { UniCard } from "@/components/uni-card";
import { QsPanel } from "@/components/qs-panel";
import { CtaBand } from "@/components/cta-band";
import { countryPages, placeName } from "@/lib/countries";
import { universitiesIn } from "@/lib/universities";

export const metadata: Metadata = {
  title: "Universities",
  description:
    "Popular universities for international students in the UK, USA, Canada, Australia, Ireland, Germany and New Zealand.",
};

export default function UniversitiesPage() {
  return (
    <>
      <PageHero
        tone="cobalt"
        title="Popular universities."
        lede="Well-known universities that international students often choose, in each of our 7 countries. Want more options? Search thousands more on QS TopUniversities."
      >
        <nav aria-label="Jump to a country" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {countryPages.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="inline-block rounded-full bg-white px-4 py-2 font-bold text-ink hover:bg-sun">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {countryPages.map((c) => {
          const list = universitiesIn(c.code);
          if (!list.length) return null;
          return (
            <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-unis`} className="scroll-mt-24 pt-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 id={`${c.slug}-unis`} className="text-display">
                  {c.name}
                </h2>
                <a href={`/study-abroad/${c.slug}`} className="font-bold underline decoration-2 underline-offset-4">
                  Studying in {placeName(c.name)}
                </a>
              </div>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((u) => (
                  <UniCard key={u.n} u={u} />
                ))}
              </ul>
            </section>
          );
        })}

        <div className="pt-24">
          <QsPanel />
        </div>
        <p className="mt-6 text-sm text-ink/60">
          Logos are each university’s own website icon and belong to that university. Listing a university here does
          not mean we are partnered with it.
        </p>
      </div>

      <div className="mt-24">
        <CtaBand title="Not sure which university is right?" />
      </div>
    </>
  );
}
