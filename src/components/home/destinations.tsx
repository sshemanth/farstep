import { destinations } from "@/lib/content";

const ink = ["text-cobalt", "text-flamingo", "text-ink"];
const tilt = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-3", "rotate-2", "-rotate-5"];

export function Destinations() {
  return (
    <section aria-labelledby="dest-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
        <div className="max-w-sm shrink-0">
          <h2 id="dest-title" className="text-title">
            Countries we cover
          </h2>
          <p className="mt-3 text-ink/75">
            Our counsellors know the universities, the costs and the visa rules in each of these places.
          </p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-8">
          {destinations.map((d, i) => (
            <li
              key={d.code}
              className={`stamp grid size-32 place-items-center text-center sm:size-36 ${ink[i % ink.length]} ${tilt[i % tilt.length]}`}
            >
              <span>
                <span className="block font-display text-3xl font-black tracking-tight">{d.code}</span>
                <span className="mt-1 block px-3 text-xs leading-tight font-bold">{d.country}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
