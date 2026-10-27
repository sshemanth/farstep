import Link from "next/link";
import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div>
          <h2 id="faq-title" className="text-display">
            Questions students ask us
          </h2>
          <p className="mt-4 max-w-sm text-ink/75">Something else on your mind? Ask a counsellor directly.</p>
          <Link href="/contact" className="btn btn-ink mt-6">
            Ask a question
          </Link>
        </div>
        <div className="divide-y-2 divide-ink/10 border-y-2 border-ink/10">
          {faqs.map((f) => (
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
    </section>
  );
}
