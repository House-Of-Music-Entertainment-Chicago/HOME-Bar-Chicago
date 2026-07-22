import React from "react";
import ContactHero from "@/components/pages/contact/ContactHeroSection";
import ContactInfoStrip from "@/components/pages/contact/ContactInfoStrip";
import ContactFormSection from "@/components/pages/contact/ContactFormSection";
import ContactFAQSection from "@/components/pages/contact/ContactFAQSection";
import LocationSection from "@/components/pages/reservations/LocationSection";
import CTASection from "@/components/pages/home/CTASection";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with HOME Sports Bar — find our address, phone number, hours, and send us a message.",
  alternates: { canonical: "/contact" },
};

function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfoStrip />
      <ContactFormSection />
      <LocationSection />
      <ContactFAQSection />
      <CTASection />
    </>
  );
}

export default Contact;
