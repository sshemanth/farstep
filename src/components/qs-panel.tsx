import { qsLinks } from "@/lib/universities";

const links = [
  { label: "Search universities", href: qsLinks.universities },
  { label: "Search courses", href: qsLinks.programs },
  { label: "See world rankings", href: qsLinks.rankings },
];

/** Sends students to QS TopUniversities to search beyond our list. */
export function QsPanel({ title = "Looking for more universities or courses?" }: { title?: string }) {
  return (
    <div className="on-dark rounded-[1.75rem] bg-ink p-8 text-white sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <h2 className="text-title">{title}</h2>
          <p className="mt-3 max-w-[46ch] text-white/80">
            Search thousands of universities and courses worldwide on QS TopUniversities. When you find ones you
            like, bring your shortlist to a free session and we’ll help you choose.
          </p>
        </div>
        <ul className="flex flex-wrap gap-3 lg:justify-end">
          {links.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn ${i === 0 ? "btn-sun" : "btn-ghost"}`}
              >
                {l.label}
                <span className="sr-only"> on QS TopUniversities (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-xs text-white/55">
        QS TopUniversities is a separate website, not run by us.
      </p>
    </div>
  );
}
