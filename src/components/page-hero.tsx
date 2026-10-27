const tones = {
  sun: "bg-sun text-ink",
  mint: "bg-mint text-ink",
  flamingo: "bg-flamingo text-ink",
  cobalt: "bg-cobalt text-white on-dark",
  ink: "bg-ink text-white on-dark",
} as const;

export function PageHero({
  title,
  lede,
  tone,
  children,
}: {
  title: string;
  lede: string;
  tone: keyof typeof tones;
  children?: React.ReactNode;
}) {
  const dark = tone === "cobalt" || tone === "ink";
  return (
    <section className="px-2 sm:px-4">
      <div className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.75rem] ${tones[tone]}`}>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:px-14">
          <h1 className="max-w-[18ch] text-hero">{title}</h1>
          <p className={`mt-6 max-w-[40rem] text-lede ${dark ? "text-white/85" : "text-ink/85"}`}>{lede}</p>
          {children}
        </div>
        {/* Decorative flight path */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 200"
          className="pointer-events-none absolute -right-10 bottom-6 hidden w-[420px] opacity-60 lg:block"
        >
          <path
            d="M10 180 C 120 20, 260 10, 380 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="8 10"
            strokeLinecap="round"
          />
          <circle cx="380" cy="70" r="10" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
