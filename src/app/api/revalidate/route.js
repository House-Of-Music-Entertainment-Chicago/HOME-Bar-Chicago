import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    console.log("=== REVALIDATE WEBHOOK ===");
    console.log("Body:", body);

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

    revalidatePath("/events");

    console.log("✅ /events revalidated");

    return NextResponse.json({
      success: true,
      revalidated: "/events",
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
