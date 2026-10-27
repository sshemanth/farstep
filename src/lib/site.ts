import { countryPages } from "./countries";

// Brand settings. Change these to your real details — everything else reads from here.
export const site = {
  name: "Farstep",
  description:
    "Study abroad consultancy. We help international students choose universities, apply, prepare for tests, get student visas and fund their studies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "dasaridishwank0908@gmail.com",
  phone: "+91 93920 84263",
  // Same number in international format, digits only — used for tel: and WhatsApp links.
  phoneDigits: "919392084263",
};

export const whatsappUrl = `https://wa.me/${site.phoneDigits}`;

export const nav: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  {
    label: "Study abroad",
    href: "/study-abroad",
    children: countryPages.map((c) => ({ label: c.name, href: `/study-abroad/${c.slug}` })),
  },
  { label: "Services", href: "/services" },
  { label: "Universities", href: "/universities" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
