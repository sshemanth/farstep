import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a free session",
  description: "Book a free first session with a study abroad counsellor, online or in person.",
};

const next = [
  { title: "We read your message", body: "A counsellor looks at your goals and the countries you’re thinking about." },
  { title: "We set up a call", body: "We email you to pick a time that suits you, online or in person." },
  { title: "You get a plan", body: "You leave the session with clear next steps, whatever you decide." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        tone="flamingo"
        title="Book a free session."
        lede="Tell us a little about your plans. A counsellor will get back to you to set up a time."
      />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
        <Suspense fallback={<div className="h-[640px]" />}>
          <ContactForm />
        </Suspense>

        <aside className="space-y-12">
          <div>
            <h2 className="text-title">What happens next</h2>
            <ol className="mt-6 space-y-6">
              {next.map((n, i) => (
                <li key={n.title} className="flex gap-4">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-ink font-display font-bold text-white"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-bold">{n.title}</h3>
                    <p className="text-ink/80">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[1.75rem] bg-haze p-8">
            <h2 className="font-sans text-lg font-bold">Prefer to reach us directly?</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={`mailto:${site.email}`} className="font-semibold break-all underline underline-offset-4">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:+${site.phoneDigits}`} className="font-semibold underline underline-offset-4">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink mt-3 !bg-[#128c4a] !shadow-[0_4px_0_0_var(--color-ink)]"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
