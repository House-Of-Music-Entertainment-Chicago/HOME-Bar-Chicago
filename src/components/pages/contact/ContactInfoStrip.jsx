"use client";

import Title from "@/components/utils/TitleText";
import Text from "@/components/utils/BodyText";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import Container from "@/components/utils/Container";

import { motion } from "framer-motion";
import { groupVariants, itemVariants } from "@/data/animation-variants";
import { useSafeVariants } from "@/components/hooks/useSafeVariants";

import businessInformation from "@/data/business-info";
import SOCIAL_LINKS from "@/data/social-links";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: businessInformation.address,
    href: businessInformation.googleMapAddressLocation,
  },
  {
    icon: Phone,
    label: "Phone",
    value: businessInformation.phone,
    href: `tel:${businessInformation.telephone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: businessInformation.email,
    href: `mailto:${businessInformation.email}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Thu: 11AM – 12AM\nFri – Sun: 11AM – 12AM",
    href: null,
  },
];

export default function ContactInfoStrip() {
  const v = useSafeVariants();

  return (
    <section className="bg-background">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={v(groupVariants)}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <motion.div variants={v(itemVariants)} key={label}>
                {href ? (
                  <a
                    href={href}
                    className="w-full h-full px-4 py-6 flex flex-col items-center gap-2 border border-olive/40 bg-background-alt/50 text-center hover:bg-olive/20 transition-all duration-200 transform hover:scale-[1.03]"
                  >
                    <Icon className="h-12 w-12 text-accent" />
                    <Title className="uppercase text-lime">{label}</Title>
                    <Text className="whitespace-pre-line text-foreground-muted">
                      {value}
                    </Text>
                  </a>
                ) : (
                  <div className="w-full h-full px-4 py-6 flex flex-col items-center gap-2 border border-olive/40 bg-background-alt/50 text-center">
                    <Icon className="h-12 w-12 text-accent" />
                    <Title className="uppercase text-lime">{label}</Title>
                    <Text className="whitespace-pre-line text-foreground-muted">
                      {value}
                    </Text>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={v(itemVariants)}
            className="mt-6 flex items-center justify-center gap-5"
          >
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-foreground-muted transition-colors hover:text-lime"
              >
                <Icon className="h-12 w-12" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
