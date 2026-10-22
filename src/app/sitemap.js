// app/sitemap.js
// Served automatically at /sitemap.xml: the static pages below, plus one
// entry per published gallery album (from Wix), so album pages get found
// by search engines.
import { SITE_CONFIG } from "@/content/site-confiig";
import { getGalleryAlbums } from "@/lib/getGalleryAlbums";

// Picks up new albums within the hour, like the gallery itself.
export const revalidate = 3600;

const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" },
  { path: "/events", priority: 0.9, changeFrequency: "daily" },
  { path: "/reservations", priority: 0.8, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.6, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap() {
  const lastModified = new Date();
  const pages = ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // Unlike the gallery pages, the sitemap swallows a Wix outage: the
  // static pages are still worth publishing without the album list.
  let albums = [];
  try {
    albums = await getGalleryAlbums();
  } catch (error) {
    console.error("sitemap: could not load gallery albums", error);
  }

  return [
    ...pages,
    ...albums.map((album) => ({
      url: `${SITE_CONFIG.url}/gallery/${album.slug}`,
      lastModified: album.createdDate ? new Date(album.createdDate) : lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    })),
  ];
}
