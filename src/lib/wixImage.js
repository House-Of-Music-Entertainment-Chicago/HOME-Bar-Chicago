/**
 * Image URLs on Wix's own CDN (static.wixstatic.com), resized and encoded
 * by Wix rather than by the Next.js image optimizer. Wix picks AVIF or
 * WebP per browser (`enc_auto`) and never upscales, so a gallery that
 * grows with every event costs the site's host nothing to optimize.
 *
 * Only plain media URLs ("https://static.wixstatic.com/media/<id>") are
 * transformed; anything else is returned untouched.
 */
const WIX_MEDIA = /^https:\/\/static\.wixstatic\.com\/media\/([^/?#]+)$/;

/**
 * next/image `loader` for Wix-hosted images. `fit` into a box that is the
 * requested width and much taller, so the width is what limits the size
 * and the image keeps its own proportions.
 */
export function wixImageLoader({ src, width, quality }) {
  const m = src.match(WIX_MEDIA);
  if (!m) return src;
  const id = m[1];
  return `${src}/v1/fit/w_${width},h_${width * 4},q_${quality || 75},enc_auto/${id}`;
}

/**
 * A ~0.7KB blurred thumbnail to sit behind a tile while the real image
 * loads, so the grid shows the photo's colours instead of empty boxes.
 */
export function wixBlurUrl(src, ratio = 1) {
  const m = src?.match(WIX_MEDIA);
  if (!m) return null;
  const w = 24;
  const h = Math.max(1, Math.round(w / ratio));
  return `${src}/v1/fill/w_${w},h_${h},al_c,q_20,blur_3,enc_auto/${m[1]}`;
}
