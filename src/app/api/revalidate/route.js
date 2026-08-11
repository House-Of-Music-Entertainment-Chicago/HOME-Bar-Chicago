import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const path = body.path || "/events";

    revalidatePath(path);

    console.log(`Revalidated: ${path}`);

    return NextResponse.json({
      success: true,
      revalidated: path,
    });
  } catch (error) {
    console.error("Revalidation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Revalidation failed",
      },
      { status: 500 },
    );
  }
}
