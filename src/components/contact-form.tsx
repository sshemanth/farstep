"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { countries, courses } from "@/lib/courses";
import { services } from "@/lib/content";
import { site } from "@/lib/site";

type Errors = Partial<Record<"name" | "email" | "message" | "form", string>>;

const field =
  "w-full rounded-2xl bg-white px-5 py-3.5 ring-2 ring-ink placeholder:text-ink/45 focus:outline-none focus-visible:ring-4 focus-visible:ring-cobalt aria-[invalid=true]:ring-flamingo";
const label = "mb-2 block font-bold";

export function ContactForm() {
  const params = useSearchParams();
  const course = courses.find((c) => c.id === params.get("course"));
  const serviceId = services.some((s) => s.id === params.get("service")) ? params.get("service")! : "";
  const initialMessage = course ? `I’d like to know more about ${course.title} at ${course.university}.` : "";

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [sentName, setSentName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.name?.trim()) next.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(data.email ?? "")) next.email = "Enter an email address like name@example.com.";
    if (!data.message?.trim()) next.message = "Tell us a little about your plans.";
    setErrors(next);
    const firstError = Object.keys(next)[0];
    if (firstError) {
      (form.elements.namedItem(firstError) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentName(data.name.trim().split(" ")[0]);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setErrors({ form: `Your message didn’t send. Try again, or email us at ${site.email}.` });
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[1.75rem] bg-mint p-10">
        <h2 className="text-display">Thanks, {sentName}.</h2>
        <p className="mt-4 max-w-md text-lede">
          Your request is in. A counsellor will email you soon to set up your free session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {/* Honeypot: hidden from people, catches simple spam bots */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this empty
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={field}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
          />
          {errors.name && (
            <p id="name-err" className="mt-2 text-sm font-bold text-[#c2185b]">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={field}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
          />
          {errors.email && (
            <p id="email-err" className="mt-2 text-sm font-bold text-[#c2185b]">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={label}>
            Phone or WhatsApp <span className="font-normal text-ink/60">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="destination" className={label}>
            Where do you want to study?
          </label>
          <select
            id="destination"
            name="destination"
            className={field}
            defaultValue={course?.country ?? ""}
          >
            <option value="">Not sure yet</option>
            {countries.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className={label}>
            What do you need help with?
          </label>
          <select id="service" name="service" className={field} defaultValue={serviceId || (course ? "applications" : "")}>
            <option value="">A bit of everything</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start" className={label}>
            When do you want to start?
          </label>
          <select id="start" name="start" className={field} defaultValue="">
            <option value="">Not sure yet</option>
            <option>Within 6 months</option>
            <option>In 6 to 12 months</option>
            <option>In more than a year</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>
          Tell us about your plans
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={initialMessage}
          placeholder="What you’d like to study, your current qualification, any questions."
          className={field}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
        />
        {errors.message && (
          <p id="message-err" className="mt-2 text-sm font-bold text-[#c2185b]">
            {errors.message}
          </p>
        )}
      </div>

      {errors.form && (
        <p role="alert" className="rounded-2xl bg-flamingo/20 px-5 py-4 font-bold">
          {errors.form}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" className="btn btn-sun" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Book my free session"}
        </button>
        <p className="text-sm text-ink/70">We only use your details to reply to you.</p>
      </div>
    </form>
  );
}
