import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CtaBand } from "@/components/cta-band";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a study abroad consultancy and EdTech company. We pair real counsellors with simple tools.`,
};

const principles = [
  {
    title: "One counsellor, start to finish",
    body: "You won’t be passed between teams. The person who helps with your shortlist is the person who checks your visa file.",
    tone: "bg-sun",
  },
  {
    title: "Straight answers",
    body: "If a course is a stretch, or a plan won’t work, we say so early. You decide with the full picture.",
    tone: "bg-flamingo",
  },
  {
    title: "Tools that save you time",
    body: "Our course search and checklists do the busywork, so your sessions are spent on decisions, not admin.",
    tone: "bg-mint",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tone="mint"
        title="Good advice should be easy to find."
        lede={`${site.name} is a study abroad consultancy and EdTech company. We pair real counsellors with simple tools, so students everywhere can make big decisions with confidence.`}
      />

      <section aria-labelledby="why-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 id="why-title" className="text-display">
            Why we started
          </h2>
          <div className="max-w-[62ch] space-y-5 text-lede text-ink/85">
            <p>
              Studying abroad is one of the biggest choices a young person makes. Yet most students piece it together
              from forums, friends and agents who are paid to push certain universities.
            </p>
            <p>
              We wanted something better: honest counselling, clear steps and tools that make the research quick. So we
              built both — a team of counsellors and a course search platform — and made them work together.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <h2 id="how-title" className="text-display">
          How we work
        </h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className={`rounded-[1.75rem] p-8 ${p.tone}`}>
              <h3 className="text-title">{p.title}</h3>
              <p className="mt-4 text-ink/85">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="halves-title" className="px-2 sm:px-4">
        <div className="on-dark mx-auto max-w-7xl rounded-[2rem] bg-ink px-6 py-16 text-white sm:rounded-[2.75rem] sm:px-12 sm:py-20">
          <h2 id="halves-title" className="max-w-[20ch] text-display">
            Two parts, one company.
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-title text-sun">Counselling</h3>
              <p className="mt-4 text-white/85">
                Applications, test prep, student visas and education loans, guided by a counsellor who knows your
                plans.
              </p>
              <Link href="/services" className="mt-6 inline-block font-bold underline decoration-2 underline-offset-4">
                See our services
              </Link>
            </div>
            <div>
              <h3 className="text-title text-mint">Course finder</h3>
              <p className="mt-4 text-white/85">
                A free platform to search international courses by country, level and subject, and send good options
                straight to your counsellor.
              </p>
              <Link
                href="/course-finder"
                className="mt-6 inline-block font-bold underline decoration-2 underline-offset-4"
              >
                Search courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-24">
        <CtaBand />
      </div>
    </>
  );
}
