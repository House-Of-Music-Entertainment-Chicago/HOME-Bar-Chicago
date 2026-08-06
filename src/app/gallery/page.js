import React from "react";
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import GalleryGridSection from "@/components/pages/gallery/GalleryGridSection";
import CTASection from "@/components/pages/home/CTASection";
import { GALLERY_IMAGES } from "@/data/gallery-images";

export const metadata = {
  title: "Gallery",
  description:
    "Take a look inside HOME Sports Bar — the floor, the golf sims and billiards, the food and drinks, and the live nights.",
  alternates: { canonical: "/gallery" },
};

function Gallery() {
  return (
    <>
      <GalleryHeroSection photoCount={GALLERY_IMAGES.length} />
      <GalleryGridSection />
      <CTASection />
    </>
  );
}

export default Gallery;
