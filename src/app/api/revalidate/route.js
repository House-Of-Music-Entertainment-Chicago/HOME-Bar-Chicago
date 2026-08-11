// import { revalidatePath } from "next/cache";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const body = await request.json();

//     if (body.secret !== process.env.REVALIDATE_SECRET) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 },
//       );
//     }

//     const path = body.path || "/events";

//     revalidatePath(path);

//     console.log(`Revalidated: ${path}`);

//     return NextResponse.json({
//       success: true,
//       revalidated: path,
//     });
//   } catch (error) {
//     console.error("Revalidation error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Revalidation failed",
//       },
//       { status: 500 },
//     );
//   }
// }
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type");

    const body = await request.json();

    console.log("=== REVALIDATE WEBHOOK ===");
    console.log("Content-Type:", contentType);
    console.log("Body:", body);
    console.log("Secret received:", !!body.secret);
    console.log(
      "Secret matches:",
      body.secret === process.env.REVALIDATE_SECRET,
    );

    if (body.secret !== process.env.REVALIDATE_SECRET) {
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
    console.error("❌ WEBHOOK ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid request",
      },
      { status: 400 },
    );
  }
}
