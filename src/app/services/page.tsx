import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { services, type Service } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "University applications, test prep, student visas and education loans. Pick the help you need, or let one counsellor guide you through all of it.",
};

const dot: Record<Service["tone"], string> = {
  sun: "bg-sun",
  flamingo: "bg-flamingo",
  mint: "bg-mint",
  white: "bg-cobalt",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tone="sun"
        title="Help for every part of studying abroad."
        lede="Use one service or all four. Either way, you get one counsellor who knows your plans and keeps things moving."
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full bg-ink px-4 py-2 font-bold text-white hover:bg-cobalt"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {services.map((s) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-title`}
            className="grid scroll-mt-24 gap-10 border-b-2 border-ink/10 py-20 last:border-b-0 lg:grid-cols-[1fr_1.15fr] lg:gap-20"
          >
            <div className="lg:sticky lg:top-28 lg:self-start">
              <span className={`block size-12 rounded-full ${dot[s.tone]}`} aria-hidden="true" />
              <h2 id={`${s.id}-title`} className="mt-6 text-display">
                {s.title}
              </h2>
              <p className="mt-5 max-w-[34rem] text-lede text-ink/85">{s.long}</p>
              <p className="mt-5 max-w-[34rem] text-ink/70">
                <span className="font-bold text-ink">Good for: </span>
                {s.forWho}
              </p>
              <Link href={`/contact?service=${s.id}`} className="btn btn-ink mt-8">
                Ask about {s.title.toLowerCase()}
              </Link>
            </div>

            <div className="rounded-[1.75rem] bg-white p-7 ring-2 ring-ink sm:p-10">
              <h3 className="font-sans text-lg font-bold">What’s included</h3>
              <ul className="mt-6 space-y-5">
                {s.includes.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span className={`mt-2 size-3 shrink-0 rounded-full ${dot[s.tone]}`} aria-hidden="true" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <CtaBand title="Not sure what you need yet?" body="That’s what the free first session is for. We’ll look at where you are and tell you what makes sense next." />
    </>
  );
}
