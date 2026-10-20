import React from "react";
import GalleryHeroSection from "@/components/pages/gallery/GalleryHeroSection";
import GalleryGridSection from "@/components/pages/gallery/GalleryGridSection";
import CTASection from "@/components/pages/home/CTASection";
import { getGalleryAlbums } from "@/lib/getGalleryAlbums";

export const revalidate = false; // refreshed by the Wix webhook, not a timer

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
