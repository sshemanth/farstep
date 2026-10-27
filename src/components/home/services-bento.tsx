import Link from "next/link";
import { services, type Service } from "@/lib/content";
import { subjects } from "@/lib/courses";

const toneClass: Record<Service["tone"], string> = {
  sun: "bg-sun",
  flamingo: "bg-flamingo",
  mint: "bg-mint",
  white: "bg-white ring-2 ring-ink",
};

const layout: Record<string, string> = {
  applications: "lg:col-span-2",
  "test-prep": "",
  visas: "",
  loans: "lg:col-span-3 lg:flex-row lg:items-end lg:justify-between lg:gap-12",
};

function ServiceTile({ s }: { s: Service }) {
  return (
    <article className={`flex flex-col rounded-[1.75rem] p-7 text-ink sm:p-9 ${toneClass[s.tone]} ${layout[s.id]}`}>
      <div className="max-w-xl">
        <h3 className="text-title">{s.title}</h3>
        <p className="mt-3 text-ink/85">{s.short}</p>
      </div>
      <Link
        href={`/services#${s.id}`}
        className="mt-8 inline-flex w-fit shrink-0 font-bold underline decoration-2 underline-offset-4 hover:decoration-4"
      >
        More about {s.title.toLowerCase()}
      </Link>
    </article>
  );
}

export function ServicesBento() {
  const [applications, testPrep, visas, loans] = services;
  return (
    <section aria-labelledby="services-title" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <h2 id="services-title" className="max-w-[22ch] text-display">
        Everything between “I want to study abroad” and landing.
      </h2>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        <ServiceTile s={applications} />

        <article className="on-dark flex flex-col justify-between rounded-[1.75rem] bg-ink p-7 text-white sm:p-9 lg:row-span-2">
          <div>
            <h3 className="text-title">Course finder</h3>
            <p className="mt-3 text-white/80">
              Search courses by country, level and subject. Free, and no sign-up.
            </p>
          </div>
          <ul className="my-8 flex flex-wrap gap-2" aria-label="Browse by subject">
            {subjects.map((s, i) => (
              <li key={s}>
                <Link
                  href={`/course-finder?subject=${encodeURIComponent(s)}`}
                  className={`inline-block rounded-full px-3.5 py-1.5 text-sm font-bold text-ink ${
                    ["bg-sun", "bg-flamingo", "bg-mint", "bg-white", "bg-haze"][i % 5]
                  }`}
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/course-finder" className="btn btn-sun w-fit">
            Open the course finder
          </Link>
        </article>

        <ServiceTile s={testPrep} />
        <ServiceTile s={visas} />
        <ServiceTile s={loans} />
      </div>
    </section>
  );
}
