import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
      <p className="stamp mx-auto grid size-36 -rotate-6 place-items-center font-display text-4xl font-black text-flamingo">
        404
      </p>
      <h1 className="mt-10 text-display">This page took a different flight.</h1>
      <p className="mx-auto mt-4 max-w-md text-lede text-ink/80">
        The link may be old, or the page has moved. Try the home page or browse universities.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-sun">
          Go to the home page
        </Link>
        <Link href="/universities" className="btn btn-ink">
          Browse universities
        </Link>
      </div>
    </section>
  );
}
