"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Subheading from "@/components/utils/SubHeadingText";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import DividerFlourish from "@/components/utils/DividerFlourish";
import Container from "@/components/utils/Container";
import PaperDivider from "@/components/utils/PaperDivider";

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

export default function ContactFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-background">
      <Container className="max-w-3xl">
        <div className="mb-8 text-center">
          <Subheading>Frequently Asked Questions</Subheading>
          <DividerFlourish className="mx-auto mt-2 w-20" />
        </div>

        <div className="flex flex-col divide-y divide-surface-border border-y border-surface-border">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                >
                  <Title>{faq.question}</Title>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <Text className="pb-4 text-foreground-muted">
                    {faq.answer}
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
