"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import Container from "@/components/utils/Container";
import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import businessInformation from "@/data/business-info";

import { motion } from "framer-motion";
import { groupVariants, itemVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

/**
 * Renders a legal document from structured section data.
 *
 * A body entry is either a plain string (paragraph), `{ type: "list" }`
 * (bulleted list), or `{ type: "contact" }` (the venue's real contact
 * details, pulled from business-info so they can never drift out of sync
 * with the footer).
 *
 * Measure is capped around 70ch: legal prose is long, and full-container
 * line lengths are the main reason these pages go unread.
 */
function ContactBlock() {
  return (
    <ul className="my-4 flex flex-col gap-3 border-l-2 border-accent/60 pl-4">
      <li className="flex items-start gap-2">
        <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
        <Text className="text-foreground-muted">
          {businessInformation.address}
        </Text>
      </li>
      <li className="flex items-start gap-2">
        <Phone className="mt-1 h-4 w-4 shrink-0 text-accent" />
        <a
          href={`tel:${businessInformation.telephone}`}
          className="transition-colors hover:text-foreground"
        >
          <Text className="text-foreground-muted">
            {businessInformation.phone}
          </Text>
        </a>
      </li>
      <li className="flex items-start gap-2">
        <Mail className="mt-1 h-4 w-4 shrink-0 text-accent" />
        <a
          href={`mailto:${businessInformation.email}`}
          className="transition-colors hover:text-foreground"
        >
          <Text className="text-foreground-muted">
            {businessInformation.email}
          </Text>
        </a>
      </li>
    </ul>
  );
}

function BodyPart({ part }) {
  if (typeof part === "string") {
    return <Text className="mb-4 text-foreground-muted">{part}</Text>;
  }
  if (part.type === "contact") return <ContactBlock />;
  if (part.type === "list") {
    return (
      <ul className="mb-4 flex list-disc flex-col gap-2 pl-5 marker:text-accent">
        {part.items.map((item) => (
          <li key={item}>
            <Text className="text-foreground-muted">{item}</Text>
          </li>
        ))}
      </ul>
    );
  }
  return null;
}

export default function LegalDocument({ sections }) {
  const v = useSafeVariants();

  return (
    // Pulled up under the hero's chevron to fill the clipped corners.
    <section className="shield-notch-join relative bg-background">
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col gap-10 lg:flex-row lg:max-w-none lg:items-start lg:gap-12">
          {/* Contents — sticky on desktop so the reader keeps their place
              in a long document. */}
          <nav
            aria-label="Contents"
            className="lg:sticky lg:top-24 lg:w-64 lg:shrink-0"
          >
            <Title className="mb-3 uppercase text-accent">Contents</Title>
            <ol className="flex flex-col gap-2 border-l border-surface-border pl-4">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-xs text-foreground-muted transition-colors hover:text-accent md:text-sm"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={v(groupVariants)}
            className="max-w-[70ch] flex-1"
          >
            {sections.map((section) => (
              <motion.section
                key={section.id}
                id={section.id}
                variants={v(itemVariants)}
                // scroll-mt keeps the anchor target clear of the sticky
                // navbar when jumping from the contents list.
                className="mb-10 scroll-mt-28"
              >
                <Title className="mb-3 uppercase text-foreground">
                  {section.heading}
                </Title>
                {section.body.map((part, i) => (
                  <BodyPart key={i} part={part} />
                ))}
              </motion.section>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
