// app/opengraph-image.jsx
//
// Auto-detected by Next.js and served at /opengraph-image — injected
// into every page's OG/Twitter meta tags automatically unless a page
// defines its own opengraph-image.jsx in its own route segment.
//
// Generated in code rather than a static asset, since there's no
// final brand photography yet — this can be swapped for a real
// photo-based design later without touching any metadata wiring.
//
// NOTE: uses the system default sans-serif, not the site's actual
// Bebas Neue/Montserrat fonts — ImageResponse doesn't have access to
// next/font automatically; loading the real brand font requires
// fetching the .ttf/.otf file's bytes explicitly and passing them
// via the `fonts` option. Happy to wire that in for exact brand
// match if you want it — flagging as a known simplification for now.

import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/data/site-confiig";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        padding: "80px",
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: 900,
          letterSpacing: "0.02em",
          color: "#ffffff",
          textTransform: "uppercase",
        }}
      >
        HOME
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#7f922a",
          textTransform: "uppercase",
        }}
      >
        Sports Bar · Play · Entertainment
      </div>
      <div
        style={{
          marginTop: 32,
          fontSize: 22,
          color: "#a3a3a3",
          maxWidth: 800,
          textAlign: "center",
        }}
      >
        {SITE_CONFIG.description}
      </div>
    </div>,
    { ...size },
  );
}
