import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Layout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      maxAge: 0, // Set maxAge to 0 to expire immediately
      expires: new Date(0), // Optional, equivalent to maxAge: 0
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
