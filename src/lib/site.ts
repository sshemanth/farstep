// Brand settings. Change these to your real details — everything else reads from here.
export const site = {
  name: "Farstep",
  description:
    "Study abroad consultancy and EdTech platform. We help international students find courses, apply to universities, prepare for tests, get student visas and fund their studies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  email: "hello@example.com",
  phone: "+00 000 000 0000",
  // Optional: link to your own live course-search platform. Leave empty to use the built-in Course finder page.
  courseFinderUrl: "",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
  ],
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Course finder", href: "/course-finder" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
