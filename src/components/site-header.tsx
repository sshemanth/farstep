"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { nav } from "@/lib/site";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`size-4 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M5 7.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function DesktopDropdown({ item, pathname }: { item: (typeof nav)[number]; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const active = pathname.startsWith(item.href);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li ref={wrap} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="menu-study-abroad"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold transition-colors ${
          active ? "bg-ink text-white" : "hover:bg-haze"
        }`}
      >
        {item.label}
        <Chevron open={open} />
      </button>
      {open && (
        <div
          id="menu-study-abroad"
          className="absolute top-full left-0 mt-3 w-[34rem] rounded-[1.5rem] bg-white p-3 shadow-[0_6px_0_0_var(--color-ink)] ring-2 ring-ink"
        >
          <ul className="grid grid-cols-2 gap-1">
            {item.children?.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === c.href ? "page" : undefined}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-haze aria-[current=page]:bg-sun"
                >
                  Study in {c.label}
                </Link>
              </li>
            ))}
            <li className="col-span-2 mt-1 border-t-2 border-ink/10 pt-2">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-bold text-cobalt hover:bg-haze"
              >
                Compare all destinations
              </Link>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" onClick={close} aria-label="Home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.href} item={item} pathname={pathname} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`rounded-full px-4 py-2 font-semibold transition-colors ${
                      pathname === item.href ? "bg-ink text-white" : "hover:bg-haze"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-sun hidden !py-2.5 sm:inline-flex">
            Book free counselling
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t-2 border-ink/10 bg-paper px-4 pb-6 lg:hidden"
        >
          <ul className="flex flex-col pt-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/10">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block py-4 font-display text-xl font-bold aria-[current=page]:text-cobalt"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="flex flex-wrap gap-2 pb-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={close}
                          className="inline-block rounded-full bg-haze px-3.5 py-1.5 text-sm font-bold aria-[current=page]:bg-sun"
                          aria-current={pathname === c.href ? "page" : undefined}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={close} className="btn btn-sun mt-6 w-full">
            Book free counselling
          </Link>
        </nav>
      )}
    </header>
  );
}
