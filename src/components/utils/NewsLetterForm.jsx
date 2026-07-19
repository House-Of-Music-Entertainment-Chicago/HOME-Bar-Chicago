"use client";

import { useState } from "react";

/**
 * NewsletterForm
 * ---------------------------------------------------------------
 * Email subscribe form for the footer. Kept as its own small
 * client component (rather than making the whole Footer a client
 * component) since it's the only interactive piece in there —
 * Next.js App Router works best when "use client" is pushed as
 * far down the tree as possible, so the rest of Footer can stay a
 * plain server component.
 *
 * IMPORTANT: this posts to /api/subscribe, which currently just
 * validates and logs the email — it does NOT actually add anyone
 * to a mailing list yet. You need to pick an email service
 * (Mailchimp, ConvertKit, Klaviyo, Beehiiv, etc.), get an API key
 * from them, and wire the actual "add subscriber" call into that
 * route — see the TODO in app/api/subscribe/route.js.
 * ---------------------------------------------------------------
 */

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in! Thanks for subscribing.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h3 className="mb-4 font-display text-sm uppercase tracking-wide text-accent">
        Stay in the Loop
      </h3>
      <p className="mb-3 text-sm text-foreground-muted">
        Get event updates, drink specials, and news straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          disabled={status === "loading"}
          className="w-full rounded-sm border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-sm bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "error" ? "text-red-400" : "text-olive"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  );
}
