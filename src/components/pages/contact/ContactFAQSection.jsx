"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { groupVariants, headerVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

const FAQS = [
  {
    question: "Do you take walk-ins?",
    answer:
      "Absolutely — walk-ins are always welcome. For game nights and weekends, we recommend reserving a table ahead of time through our Reservations page.",
  },
  {
    question: "Is there a dress code?",
    answer:
      "Casual and game-day gear are always fine. We just ask that you skip anything offensive or overly revealing.",
  },
  {
    question: "Do you have parking?",
    answer: "Yes — free parking is available on-site for all guests.",
  },
  {
    question: "Can I book HOME for a private event?",
    answer:
      "Yes! We host birthdays, corporate events, and watch parties with custom food & drink packages. Head to our Reservations page and fill out the private event inquiry form.",
  },
  {
    question: "Do you show every game and PPV event?",
    answer:
      "We show all major sports, UFC pay-per-views, and championship fights on our big screens. Check our Events page for what's on this week.",
  },
  {
    question: "Are kids allowed?",
    answer:
      "Yes, HOME is family-friendly during the day and early evening. After a certain hour, the venue shifts to a 21+ crowd — ask our staff for current cutoff times.",
  },
];

export default function ContactFAQSection({ data = FAQS }) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(null);
  const v = useSafeVariants();
  return (
    <section className="relative bg-background">
      <Container className="relative flex justify-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
          className="max-w-3xl"
        >
          <motion.div variants={v(headerVariants)} className="mb-8 text-center">
            <Subheading>Frequently Asked Questions</Subheading>
            <DividerFlourish className="mx-auto mt-2 w-20" />
          </motion.div>

          <div className="flex flex-col divide-y divide-surface-border border-y border-surface-border">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div variants={v(headerVariants)} key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  >
                    <Title>{faq.question}</Title>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* {isOpen && (
                    <Text className="pb-4 text-foreground-muted">
                      {faq.answer}
                    </Text>
                  )} */}

                  {/* SEO FIX: AnimatePresence keeps text in HTML source while animating height */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          prefersReducedMotion
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          prefersReducedMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Text className="pb-4 text-foreground-muted">
                          {faq.answer}
                        </Text>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
