"use client";

import { useState } from "react";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";

import { motion } from "framer-motion";
import {
  groupVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const REASONS = [
  "General Inquiry",
  "Reservations",
  "Private Events",
  "Feedback",
  "Careers",
  "Press / Media",
  "Other",
];

const inputClass =
  "w-full border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-foreground-muted focus:border-accent focus:outline-none";

export default function ContactFormSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    message: "",
  });

  const v = useSafeVariants();

  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      // TODO: point this at your contact inquiry route — same
      // direct-email routing pattern used for private events.
      const res = await fetch("/api/contact-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", reason: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="bg-background">
      <Container className="relative flex justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="max-w-2xl"
        >
          <motion.div variants={v(headerVariants)} className="mb-8 text-center">
            <Subheading>Send Us A Message</Subheading>
            <DividerFlourish className="mx-auto mt-2 w-20" />
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border border-olive/40 p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (optional)"
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
              <select
                name="reason"
                value={form.reason}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none`}
              >
                <option value="" disabled>
                  Reason for Contact
                </option>
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className={`${inputClass} resize-none`}
            />

            <motion.div variants={v(buttonVariants)} className="mx-auto">
              <RibbonButton
                type="submit"
                // disabled={status === "submitting"}
                disabled={true}
              >
                {/* {status === "submitting" ? "Sending..." : "Send Message"} */}
                Work In Progress
              </RibbonButton>
            </motion.div>

            {status === "success" && (
              <p className="text-center text-sm text-olive">
                Thanks — we'll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-500">
                Something went wrong. Please try again or call us directly.
              </p>
            )}
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
