import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Which pages each Wix automation refreshes. An automation sends
// { secret, target } in its webhook payload: "events" from the event
// collections, "gallery" from GalleryAlbums.
// Each entry is [path, type?]. A route pattern like /gallery/[slug] needs
// type "page" and refreshes every album page at once.
const TARGETS = {
  events: [["/events"]],
  gallery: [["/gallery"], ["/gallery/[slug]", "page"], ["/about"]],
};
const ALL_PATHS = Object.values(TARGETS).flat();

export async function POST(request) {
  try {
    const body = await request.json();
    const target = body.data?.target;

    // Log the target only. The body carries the shared secret, and
    // logging it would put it in plain text in the hosting logs.
    console.log("=== REVALIDATE WEBHOOK ===", { target: target ?? "(none)" });

    const secret = body.data?.secret;

    if (secret !== process.env.REVALIDATE_SECRET) {
      console.log("❌ Invalid secret");

      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // No or unknown target refreshes everything. The existing events
    // automation predates targets and sends none, and an extra refresh is
    // cheap, whereas a missed one leaves stale content on the site.
    const paths = TARGETS[target] ?? ALL_PATHS;
    paths.forEach(([path, type]) => revalidatePath(path, type));
    const revalidated = paths.map(([path]) => path);

    console.log("✅ revalidated", revalidated);

    return NextResponse.json({
      success: true,
      revalidated,
    });
  } catch (error) {
    console.error("❌ Revalidation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Revalidation failed",
      },
      { status: 500 },
    );
  }
}
