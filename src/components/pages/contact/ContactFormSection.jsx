"use client";

import { useState, useTransition } from "react";
import Subheading from "@/components/utils/SubHeadingText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import RibbonButton from "@/components/utils/Ribbonbutton";
import { handleWixFormSubmit } from "@/app/actions/wixForm";

import { motion } from "framer-motion";
import {
  groupVariants,
  headerVariants,
  buttonVariants,
} from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const inputClass =
  "w-full border border-white/15 bg-background px-4 py-3 text-sm text-white placeholder:text-foreground-muted focus:border-accent focus:outline-none";

export default function ContactFormSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const v = useSafeVariants();

  const [status, setStatus] = useState("idle"); // idle | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("idle");
    setStatusMessage("");

    const formData = new FormData();
    formData.set("formType", "contact-us");
    formData.set("firstName", form.firstName);
    formData.set("lastName", form.lastName);
    formData.set("email", form.email);
    formData.set("phone", form.phone);
    formData.set("message", form.message);

    startTransition(async () => {
      const result = await handleWixFormSubmit(formData);

      if (!result.success) {
        setStatus("error");
        setStatusMessage(result.message);
        return;
      }

      setStatus("success");
      setStatusMessage(result.message);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    });
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
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
                disabled={isPending}
                className={inputClass}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
                disabled={isPending}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isPending}
                className={inputClass}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                disabled={isPending}
                className={inputClass}
              />
            </div>

            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              disabled={isPending}
              className={`${inputClass} resize-none`}
            />

            <motion.div variants={v(buttonVariants)} className="mx-auto">
              <RibbonButton type="submit" disabled={isPending}>
                {isPending ? "Sending..." : "Send Message"}
              </RibbonButton>
            </motion.div>

            {status === "success" && (
              <p className="text-center text-sm text-olive">{statusMessage}</p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-500">
                {statusMessage}
              </p>
            )}
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
