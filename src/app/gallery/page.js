import React from "react";
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import GalleryGridSection from "@/components/pages/gallery/GalleryGridSection";
import CTASection from "@/components/pages/home/CTASection";
import { getGalleryAlbums } from "@/lib/getGalleryAlbums";

// The Wix webhook (/api/revalidate, target "gallery") refreshes this page
// the moment the client edits an album. The hourly timer is only a safety
// net: Next keeps the Wix response in its data cache, which survives
// rebuilds and redeploys, so without a timer one missed webhook would
// leave the gallery stale indefinitely. Must stay a literal number.
export const revalidate = 3600;

export const metadata = {
  title: "Gallery",
  description:
    "Take a look inside HOME Sports Bar — the floor, the golf sims and billiards, the food and drinks, and the live nights.",
  alternates: { canonical: "/gallery" },
};

export default async function Gallery() {
  const albums = await getGalleryAlbums();
  const photoCount = albums
    .flatMap((album) => album.items)
    .filter((item) => item.type !== "video").length;

  return (
    <>
      <GalleryHeroSection photoCount={photoCount} />
      <GalleryGridSection albums={albums} />
      <CTASection />
    </>
  );
}
