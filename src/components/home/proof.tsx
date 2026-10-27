"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { isSample, partners, reviews, stats } from "@/lib/proof";

function SampleBadge({ inline = false }: { inline?: boolean }) {
  if (!isSample) return null;
  return (
    <span
      className={`z-10 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white ring-2 ring-white ${
        inline ? "mb-3 inline-block" : "absolute top-4 right-4"
      }`}
    >
      Sample — edit src/lib/proof.ts
    </span>
  );
}

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        root.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = Math.round(counter.v).toLocaleString("en");
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-label="Our numbers" className="px-2 pt-4 sm:px-4">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-sun px-6 py-10 sm:rounded-[2.75rem] sm:px-12">
        <SampleBadge inline />
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 font-semibold text-ink/80">{s.label}</dt>
              <dd className="font-display text-[clamp(2.25rem,4vw,3.5rem)] leading-none font-black tracking-tight">
                <span data-count={s.value}>{s.value.toLocaleString("en")}</span>
                {s.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function Partners() {
  const row = [...partners, ...partners];
  return (
    <section aria-labelledby="partners-title" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SampleBadge inline />
        <h2 id="partners-title" className="text-title">
          Universities we work with
        </h2>
      </div>
      <div className="group mt-10 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <ul className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row.map((p, i) => (
            <li
              key={`${p.name}-${i}`}
              aria-hidden={i >= partners.length ? true : undefined}
              className="flex h-24 w-64 shrink-0 items-center justify-center rounded-2xl bg-white px-6 text-center ring-2 ring-ink/10"
            >
              {p.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.logo} alt={p.name} className="max-h-14 w-auto object-contain" />
              ) : (
                <span className="font-display text-sm font-bold text-ink/80">{p.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Lines the slider up with the page's content edge on wide screens.
const EDGE = "max(1rem, calc((100vw - 80rem) / 2 + 1.5rem))";

export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 360) + 24), behavior: "smooth" });
  };

  const tones = ["bg-mint", "bg-flamingo", "bg-white ring-2 ring-ink", "bg-sun"];

  return (
    <section aria-labelledby="reviews-title" className="relative pb-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-6">
        <div>
          <SampleBadge inline />
          <h2 id="reviews-title" className="max-w-[18ch] text-display">
            Postcards from our students
          </h2>
        </div>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => scroll(d)}
              aria-label={d === -1 ? "Previous reviews" : "Next reviews"}
              className="grid size-12 place-items-center rounded-full bg-ink text-white hover:bg-cobalt"
            >
              <svg viewBox="0 0 24 24" className={`size-5 ${d === -1 ? "rotate-180" : ""}`} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pt-2 pb-6 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        style={{ paddingInline: EDGE, scrollPaddingInline: EDGE }}
      >
        {reviews.map((r, i) => (
          <li key={i} className="w-[85vw] shrink-0 snap-start sm:w-[420px]">
            <figure className={`relative flex h-full flex-col justify-between rounded-[1.25rem] p-7 text-ink ${tones[i % tones.length]}`}>
              <span
                className="stamp absolute top-5 right-5 grid size-14 -rotate-12 place-items-center font-display text-xs font-black text-ink/70"
                aria-hidden="true"
              >
                {r.countryCode}
              </span>
              <blockquote className="pr-14 text-lg leading-relaxed">“{r.quote}”</blockquote>
              <figcaption className="mt-8 border-t-2 border-dashed border-ink/25 pt-4">
                <p className="font-display font-bold">{r.name}</p>
                <p className="text-sm text-ink/75">
                  {r.course}, {r.university}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
