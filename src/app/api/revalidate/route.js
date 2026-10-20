import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// Which pages each Wix automation refreshes. An automation sends
// { secret, target } in its webhook payload: "events" from the event
// collections, "gallery" from GalleryAlbums.
const TARGETS = {
  events: ["/events"],
  gallery: ["/gallery", "/about"],
};
const ALL_PATHS = [...new Set(Object.values(TARGETS).flat())];

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
    paths.forEach((path) => revalidatePath(path));

    console.log("✅ revalidated", paths);

    return NextResponse.json({
      success: true,
      revalidated: paths,
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
