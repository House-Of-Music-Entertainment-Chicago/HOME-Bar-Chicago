import React from "react";
import LegalHeroSection from "@/components/pages/legal/LegalHeroSection";
import LegalDocument from "@/components/pages/legal/LegalDocument";
import { TERMS_SECTIONS, LAST_UPDATED } from "@/data/legal-terms";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of the HOME Sports Bar website, reservations, enquiries, and visits to our venue in Arlington Heights, Illinois.",
  alternates: { canonical: "/terms" },
  // A legal page carries no marketing value in search and shouldn't
  // compete with the pages that do — indexed so it's findable and
  // verifiable, but kept out of the crawl budget's way.
  robots: { index: true, follow: true },
};

function TermsAndConditions() {
  return (
    <>
      <LegalHeroSection title="Terms & Conditions" lastUpdated={LAST_UPDATED} />
      <LegalDocument sections={TERMS_SECTIONS} />
    </>
  );
}

export default TermsAndConditions;
