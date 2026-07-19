"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/**
 * InstagramEmbed
 * ---------------------------------------------------------------
 * Embeds a single public Instagram post/Reel/video using
 * Instagram's own official embed markup + script — this is exactly
 * what you get from the "Embed" button on instagram.com, just
 * wrapped as a reusable component.
 *
 * No API key/access token needed for this method (that requirement
 * only applies to the *programmatic* oEmbed API — fetching many
 * posts server-side — not this client-side embed widget, which
 * has continued working for public posts without one).
 *
 * Usage:
 *   <InstagramEmbed url="https://www.instagram.com/p/DaMBPeExARY/" />
 *
 * Note: the embedded post is a LIVE iframe pointed at Instagram's
 * own CDN — it always shows their current caption/like count/etc.
 * at view time, but it also means if the post is ever deleted or
 * the account goes private, the embed will show a broken/blank
 * box rather than your fallback content. Worth a periodic manual
 * check if this post matters long-term.
 * ---------------------------------------------------------------
 */

export default function InstagramEmbed({ url, className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // If Instagram's script already loaded (e.g. navigating between
    // pages client-side in Next.js), it won't auto-process a newly
    // mounted blockquote on its own — this call re-scans the page
    // and renders any embeds it hasn't processed yet.
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <div ref={containerRef} className={className}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: "0 auto", maxWidth: "540px", width: "100%" }}
      />

      {/* Loads Instagram's embed script once per page. `strategy="lazyOnload"`
          keeps it from competing with your own page's load performance,
          since this is decorative/social-proof content, not critical. */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        }}
      />
    </div>
  );
}
