import { site } from "@/lib/site";

export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="17" fill="var(--color-cobalt)" />
      <path
        d="M7 26 C 14 8, 28 6, 34 14"
        fill="none"
        stroke="var(--color-sun)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="34" cy="14" r="4.5" fill="var(--color-flamingo)" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="size-9" />
      <span
        className={`font-display text-xl font-bold tracking-tight lowercase ${light ? "text-white" : "text-ink"}`}
      >
        {site.name}
      </span>
    </span>
  );
}
