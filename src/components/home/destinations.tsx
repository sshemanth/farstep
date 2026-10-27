import Link from "next/link";
import Form from "next/form";
import { countryPages } from "@/lib/countries";

const ink = ["text-cobalt", "text-flamingo", "text-ink"];
const tilt = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-3", "rotate-2", "-rotate-5"];

export function Destinations() {
  return (
    <section aria-labelledby="dest-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-md shrink-0">
          <h2 id="dest-title" className="text-display">
            Where do you want to go?
          </h2>
          <p className="mt-4 text-ink/75">
            Pick a country to see intakes, visas and what studying there is like. Or search for a course.
          </p>

          <Form action="/course-finder" className="mt-8">
            <label htmlFor="dest-q" className="text-sm font-bold">
              What do you want to study?
            </label>
            <div className="mt-2 flex rounded-full bg-white p-1.5 ring-2 ring-ink focus-within:ring-4 focus-within:ring-cobalt">
              <input
                id="dest-q"
                name="q"
                type="search"
                placeholder="Try “data science”"
                className="min-w-0 flex-1 rounded-full bg-transparent px-4 placeholder:text-ink/50 focus:outline-none"
              />
              <button type="submit" className="rounded-full bg-ink px-5 py-2.5 font-bold text-white hover:bg-cobalt">
                Search<span className="hidden sm:inline"> courses</span>
              </button>
            </div>
          </Form>
        </div>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-8">
          {countryPages.map((c, i) => (
            <li key={c.slug}>
              <Link
                href={`/study-abroad/${c.slug}`}
                className={`stamp grid size-32 place-items-center text-center transition-transform hover:scale-105 hover:rotate-0 motion-reduce:transition-none sm:size-36 ${ink[i % ink.length]} ${tilt[i % tilt.length]}`}
              >
                <span>
                  <span className="block font-display text-3xl font-black tracking-tight">{c.code}</span>
                  <span className="mt-1 block px-3 text-xs leading-tight font-bold">{c.name}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
