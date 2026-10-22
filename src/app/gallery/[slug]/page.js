import { notFound } from "next/navigation";
import AlbumHeroSection from "@/components/pages/gallery/AlbumHeroSection";
import AlbumGridSection from "@/components/pages/gallery/AlbumGridSection";
import CTASection from "@/components/pages/home/CTASection";
import { getGalleryAlbums, getGalleryAlbum } from "@/lib/getGalleryAlbums";
import { toAlbumSummary, formatAlbumCount } from "@/lib/galleryAlbums";
import { wixImageLoader } from "@/lib/wixImage";

// Same refresh model as /gallery: the Wix webhook revalidates every album
// page (/gallery/[slug]) on change, with an hourly safety net.
export const revalidate = 3600;

// Albums that exist at build time are prerendered. One the client adds
// later is rendered on its first visit and cached from then on
// (dynamicParams defaults to true).
export async function generateStaticParams() {
  const albums = await getGalleryAlbums();
  return albums.map((album) => ({ slug: album.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const found = await getGalleryAlbum(slug);
  if (!found) return {};
  const { album } = found;
  const description = `${formatAlbumCount(album)} from ${album.title} at HOME Sports Bar in Arlington Heights.`;
  const image = album.cover && {
    url: wixImageLoader({ src: album.cover.src, width: 1200 }),
    alt: album.cover.alt,
  };
  return {
    title: `${album.title} | Gallery`,
    description,
    alternates: { canonical: `/gallery/${album.slug}` },
    openGraph: { title: `${album.title} | HOME Sports Bar`, description, images: image ? [image] : undefined },
  };
}

export default async function AlbumPage({ params }) {
  const { slug } = await params;
  const found = await getGalleryAlbum(slug);
  if (!found) notFound();
  const { album, next } = found;

  return (
    <>
      <AlbumHeroSection title={album.title} countLabel={formatAlbumCount(album)} cover={album.cover} />
      <AlbumGridSection
        album={{ title: album.title, items: album.items }}
        next={next && next.slug !== album.slug ? toAlbumSummary(next) : null}
      />
      <CTASection />
    </>
  );
}
