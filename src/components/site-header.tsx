"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { nav } from "@/lib/site";

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

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 font-semibold transition-colors ${
                      active ? "bg-ink text-white" : "hover:bg-haze"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-sun hidden !py-2.5 sm:inline-flex">
            Book a free session
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-full bg-ink text-white md:hidden"
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
        <nav id="mobile-nav" aria-label="Main" className="border-t-2 border-ink/10 bg-paper px-4 pb-6 md:hidden">
          <ul className="flex flex-col pt-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block border-b border-ink/10 py-4 font-display text-xl font-bold aria-[current=page]:text-cobalt"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" onClick={close} className="btn btn-sun mt-6 w-full">
            Book a free session
          </Link>
        </nav>
      )}
    </header>
  );
}
