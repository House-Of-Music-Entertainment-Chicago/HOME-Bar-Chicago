import React from "react";
import AboutHeroSection from "@/components/pages/about/AboutHeroSection";
import OurStorySection from "@/components/pages/about/OurStorySection";
import WhatMakesDifferentSection from "@/components/pages/about/WhatMakesDifferentSection";
import HomeExperienceSection from "@/components/pages/about/HomeExperienceSection";
import PlacesToPlaySection from "@/components/pages/about/PlacesToPlaySection";
import StatsSection from "@/components/pages/about/StatsSection";
import GallerySection from "@/components/pages/about/GalleryPreviewSection";
import CTASection from "@/components/pages/home/CTASection";

function About() {
  return (
    <>
      <AboutHeroSection />
      <OurStorySection />
      <WhatMakesDifferentSection />
      <HomeExperienceSection />
      <PlacesToPlaySection />
      <StatsSection />
      <GallerySection />
      <CTASection />
    </>
  );
}

export default About;
