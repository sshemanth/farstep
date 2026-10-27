import Link from "next/link";

export function CtaBand({
  title = "Talk to a counsellor this week.",
  body = "Your first session is free, online or in person. Bring your questions, and your parents if you like.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="px-2 sm:px-4">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-flamingo px-6 py-14 text-ink sm:rounded-[2.75rem] sm:px-12 sm:py-20">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-display">{title}</h2>
          <p className="mt-4 text-lede text-ink/85">{body}</p>
          <Link href="/contact" className="btn btn-ink mt-8">
            Book a free session
          </Link>
        </div>
        <div
          aria-hidden="true"
          className="stamp pointer-events-none absolute -right-6 -bottom-10 hidden size-64 rotate-12 place-items-center text-white sm:grid lg:right-16 lg:bottom-auto lg:top-1/2 lg:size-72 lg:-translate-y-1/2"
        >
          <span className="text-center font-display font-black">
            <span className="block text-5xl">Free</span>
            <span className="mt-1 block text-lg">first session</span>
          </span>
        </div>
      </div>
    </section>
  );
}
