"use client";

import { useState, useTransition } from "react";
import { handleWixFormSubmit } from "@/app/actions/wixForm";

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
 * Submits via the handleWixFormSubmit server action with
 * formType: "newsletter" — Wix's own field mapping + Automation
 * handles Contact creation, labeling ("Subscriptions"), and Inbox
 * delivery on submission, so this component only needs to send
 * fullName, email, and checkbox consent.
 * ---------------------------------------------------------------
 */

export default function NewsletterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | success | error
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    const formData = new FormData();
    formData.set("formType", "newsletter");
    formData.set("fullName", fullName);
    formData.set("email", email);
    formData.set("checkbox", agreed);

    startTransition(async () => {
      const result = await handleWixFormSubmit(formData);

      if (!result.success) {
        setStatus("error");
        setMessage(result.message);
        return;
      }

      setStatus("success");
      setMessage(result.message);
      setFullName("");
      setEmail("");
      setAgreed(false);
    });
  }

  return (
    <div>
      <h3 className="mb-4 font-display text-sm uppercase tracking-wide text-accent">
        Stay in the Loop
      </h3>
      <p className="mb-3 text-sm text-foreground-muted">
        Get event updates, drink specials, and news straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 sm:flex-row xl:flex-col">
          <label htmlFor="newsletter-name" className="sr-only">
            Full name
          </label>
          <input
            id="newsletter-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Your name"
            disabled={isPending}
            className="w-full rounded-sm border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none disabled:opacity-60"
          />

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
            disabled={isPending}
            className="w-full rounded-sm border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted/60 focus:border-accent focus:outline-none disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={isPending}
            className="shrink-0 rounded-sm bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Subscribing..." : "Subscribe"}
          </button>
        </div>

        <label className="flex items-start gap-2 text-xs text-foreground-muted">
          <input
            type="checkbox"
            required
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            disabled={isPending}
            className="mt-0.5 shrink-0"
          />
          <span>
            I agree to receive marketing emails and accept the{" "}
            <a href="/terms" className="underline hover:text-accent">
              Terms &amp; Conditions
            </a>
            .
          </span>
        </label>
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
