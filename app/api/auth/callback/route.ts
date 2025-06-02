import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) {
    // Redirect back to login page with error
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url))
  }

  if (!code) {
    // Handle missing code
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url))
  }

  try {
    // Exchange authorization code for access token with your backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_PHARMABOT_BASE_URL}/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ authorization_code: code }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Backend authentication failed:", errorData)
      return NextResponse.redirect(
        new URL(`/login?error=${errorData.errors?.[0]?.message || "authentication_failed"}`, request.url),
      )
    }

    const data = await response.json()
    const accessToken = data.data.access_token

    // Set the access token as an HTTP-only cookie
    cookies().set("pharmabot_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Redirect to the main application page
    return NextResponse.redirect(new URL("/", request.url))
  } catch (e) {
    console.error("Error during authentication callback:", e)
    return NextResponse.redirect(new URL("/login?error=server_error", request.url))
  }
}
