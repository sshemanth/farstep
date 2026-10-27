import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { countryPages, type Tone } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Study abroad destinations",
  description: "Compare study destinations: intakes, student visas and work after study in the UK, USA, Canada, Australia, Ireland, Germany and New Zealand.",
};

const toneClass: Record<Tone, string> = {
  sun: "bg-sun text-ink",
  flamingo: "bg-flamingo text-ink",
  mint: "bg-mint text-ink",
  cobalt: "bg-cobalt text-white on-dark",
};

export default function StudyAbroadPage() {
  return (
    <>
      <PageHero
        tone="ink"
        title="Where will you study?"
        lede="Each country has its own intakes, visas and way of teaching. Start here, then talk it through with a counsellor."
      />

      <section aria-label="Destinations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {countryPages.map((c, i) => {
            const intake = c.facts.find((f) => f.label === "Main intakes")?.value;
            return (
              <li
                key={c.slug}
                className={
                  i === 0
                    ? "sm:col-span-2 lg:col-span-1 lg:row-span-2"
                    : i === countryPages.length - 1
                      ? "lg:col-span-2"
                      : ""
                }
              >
                <Link
                  href={`/study-abroad/${c.slug}`}
                  className={`group relative flex h-full min-h-60 flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 ${toneClass[c.tone]}`}
                >
                  <span
                    aria-hidden="true"
                    className="stamp absolute -top-4 -right-4 grid size-28 rotate-12 place-items-center font-display text-2xl font-black opacity-80 transition-transform group-hover:rotate-0 motion-reduce:transition-none"
                  >
                    {c.code}
                  </span>
                  <div className="pr-20">
                    <h2 className="text-title">{c.headline}</h2>
                    {i === 0 && <p className="mt-4 max-w-sm text-ink/85">{c.intro}</p>}
                  </div>
                  <div className="mt-8">
                    {intake && <p className="text-sm font-semibold opacity-80">Intakes: {intake}</p>}
                    <p className="mt-3 font-bold underline decoration-2 underline-offset-4 group-hover:decoration-4">
                      Explore {c.name}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <CtaBand title="Can’t decide between countries?" body="That’s normal. In a free session we compare your options side by side, based on your budget, course and career plans." />
    </>
  );
}
