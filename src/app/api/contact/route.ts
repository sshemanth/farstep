// Handles the "Book a free session" form.
// To receive enquiries by email, set these environment variables (e.g. in Vercel → Settings → Environment Variables):
//   RESEND_API_KEY     – API key from https://resend.com
//   CONTACT_TO_EMAIL   – where enquiries should go
//   CONTACT_FROM_EMAIL – a sender on a domain you verified in Resend (e.g. "Website <hello@yourdomain.com>")
// Without them, enquiries are only logged on the server.

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in: pretend success, drop it.
  if (clean(body.company)) return Response.json({ ok: true });

  const enquiry = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 60),
    destination: clean(body.destination, 80),
    service: clean(body.service, 80),
    start: clean(body.start, 80),
    message: clean(body.message, 4000),
  };

  const errors: Record<string, string> = {};
  if (!enquiry.name) errors.name = "Name is required.";
  if (!/^\S+@\S+\.\S+$/.test(enquiry.email)) errors.email = "A valid email is required.";
  if (!enquiry.message) errors.message = "Message is required.";
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.log("New enquiry (email not configured):", enquiry);
    return Response.json({ ok: true });
  }

  const text = Object.entries(enquiry)
    .map(([k, v]) => `${k}: ${v || "-"}`)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: enquiry.email,
      subject: `New session request from ${enquiry.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json({ error: "Could not send." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
