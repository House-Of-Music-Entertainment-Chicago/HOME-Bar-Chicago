import React from "react";
import AboutHeroSection from "@/components/pages/about/AboutHeroSection";
import OurStorySection from "@/components/pages/about/OurStorySection";
import WhatMakesDifferentSection from "@/components/pages/about/WhatMakesDifferentSection";
import HomeExperienceSection from "@/components/pages/about/HomeExperienceSection";
import PlacesToPlaySection from "@/components/pages/about/PlacesToPlaySection";
import StatsSection from "@/components/pages/about/StatsSection";
import GallerySection from "@/components/pages/about/GalleryPreviewSection";
import CTASection from "@/components/pages/home/CTASection";
import { getGalleryAlbums } from "@/lib/getGalleryAlbums";

// Same as /gallery: instant refresh from the Wix webhook, with an hourly
// safety net in case a webhook is missed (see src/app/gallery/page.js).
export const revalidate = 3600;

export const metadata = {
  title: "About",
  description:
    "Learn more about HOME Sports Bar — a premier sports bar and entertainment venue in the northwest suburbs of Chicago.",
  alternates: { canonical: "/about" },
};

async function About() {
  // Same albums as /gallery, so the preview strip shows whatever the client
  // has published in the Wix dashboard.
  const albums = await getGalleryAlbums();
  const galleryItems = albums.flatMap((album) => album.items);

  return (
    <>
      <AboutHeroSection />
      <OurStorySection />
      <WhatMakesDifferentSection />
      <HomeExperienceSection />
      <PlacesToPlaySection />
      <StatsSection />
      <GallerySection items={galleryItems} />
      <CTASection />
    </>
  );
}

export default About;
