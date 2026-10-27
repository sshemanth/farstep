import Link from "next/link";
import { Logo } from "./logo";
import { nav, site, whatsappUrl } from "@/lib/site";
import { services } from "@/lib/content";
import { countryPages } from "@/lib/countries";

export function SiteFooter() {
  return (
    <footer className="on-dark mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-4 text-white/75">
            Study abroad consultancy for students going anywhere.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-sun">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.filter((n) => !n.children).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/85 hover:text-white hover:underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-sun">Study abroad</h2>
          <ul className="mt-4 space-y-2">
            {countryPages.map((c) => (
              <li key={c.slug}>
                <Link href={`/study-abroad/${c.slug}`} className="text-white/85 hover:text-white hover:underline">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-sun">Services</h2>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services#${s.id}`} className="text-white/85 hover:text-white hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-sun">Get in touch</h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>
              <a href={`mailto:${site.email}`} className="break-all hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:+${site.phoneDigits}`} className="hover:text-white hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-sm text-white/60 sm:px-6">
          © {site.name}. Universities and visa offices make their own decisions; we help
          you prepare the strongest application you can.
        </p>
      </div>
    </footer>
  );
}
