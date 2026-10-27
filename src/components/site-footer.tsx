import Link from "next/link";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="on-dark mt-24 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Logo light />
          <p className="mt-4 text-white/75">
            Study abroad consultancy and course search, for students going anywhere.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold text-sun">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-white/85 hover:text-white hover:underline">
                  {n.label}
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
              <a href={`mailto:${site.email}`} className="hover:text-white hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white hover:underline">
                {site.phone}
              </a>
            </li>
            {site.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-white hover:underline">
                  {s.label}
                </a>
              </li>
            ))}
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
