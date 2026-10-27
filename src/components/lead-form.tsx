"use client";

import { useState } from "react";
import { countries } from "@/lib/courses";
import { site } from "@/lib/site";

type Field = "name" | "email" | "phone";
type Errors = Partial<Record<Field | "form", string>>;

const input =
  "w-full rounded-xl bg-paper px-4 py-3 text-ink ring-2 ring-transparent placeholder:text-ink/45 focus:outline-none focus-visible:ring-cobalt aria-[invalid=true]:ring-flamingo";

/** Compact "book free counselling" form, used in the hero and on country pages. */
export function LeadForm({
  defaultCountry = "",
  title = "Book your free counselling session",
  idPrefix = "lead",
}: {
  defaultCountry?: string;
  title?: string;
  idPrefix?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const id = (f: string) => `${idPrefix}-${f}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter a valid email.";
    if ((data.phone ?? "").replace(/\D/g, "").length < 7) next.phone = "Enter a phone number we can call.";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "Free counselling form" }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: `Your request didn’t send. Try again, or email us at ${site.email}.` });
    }
  }

  return (
    <div className="rounded-[1.5rem] bg-white p-6 text-ink shadow-[0_6px_0_0_var(--color-ink)] sm:p-7">
      {status === "sent" ? (
        <div role="status" className="py-6 text-center">
          <p className="font-display text-2xl font-bold">You’re booked in.</p>
          <p className="mt-2 text-ink/80">A counsellor will call you soon to set up a time.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <h2 className="font-display text-xl font-bold tracking-tight">{title}</h2>
          <div className="hidden" aria-hidden="true">
            <input name="company" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["name", "Full name", "text", "name"],
                ["email", "Email", "email", "email"],
                ["phone", "Phone or WhatsApp", "tel", "tel"],
              ] as const
            ).map(([name, label, type, auto]) => (
              <div key={name}>
                <label htmlFor={id(name)} className="sr-only">
                  {label}
                </label>
                <input
                  id={id(name)}
                  name={name}
                  type={type}
                  autoComplete={auto}
                  placeholder={label}
                  className={input}
                  aria-invalid={!!errors[name]}
                  aria-describedby={errors[name] ? id(`${name}-err`) : undefined}
                />
                {errors[name] && (
                  <p id={id(`${name}-err`)} className="mt-1 text-sm font-bold text-[#c2185b]">
                    {errors[name]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <label htmlFor={id("destination")} className="sr-only">
                Where do you want to study?
              </label>
              <select id={id("destination")} name="destination" defaultValue={defaultCountry} className={input}>
                <option value="">Where do you want to study?</option>
                {countries.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          {errors.form && (
            <p role="alert" className="mt-3 text-sm font-bold text-[#c2185b]">
              {errors.form}
            </p>
          )}
          <button type="submit" className="btn btn-sun mt-5 w-full" disabled={status === "sending"}>
            {status === "sending" ? "Booking…" : "Book free counselling"}
          </button>
          <p className="mt-3 text-center text-xs text-ink/60">Free and no obligation. We only use your details to contact you.</p>
        </form>
      )}
    </div>
  );
}
