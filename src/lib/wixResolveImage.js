import { media } from "@wix/sdk";

export function resolveImage(rawImage) {
  if (!rawImage) return null;
  try {
    return media.getImageUrl(rawImage).url;
  } catch (error) {
    console.error("Failed to resolve Wix image URL:", rawImage, error);
    return null;
  }
}
