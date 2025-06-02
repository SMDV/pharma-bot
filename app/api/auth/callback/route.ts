import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  // Changed from GET to POST
  const { authorization_code: code } = await request.json() // Extract code from JSON body
  console.log("Received authorization code from Google (via postMessage):", code)

  if (!code) {
    return NextResponse.json({ errors: [{ message: "missing_authorization_code" }] }, { status: 400 })
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
      // Return a JSON response for the client-side to handle
      return NextResponse.json(
        { errors: [{ message: errorData.errors?.[0]?.message || "authentication_failed" }] },
        { status: response.status },
      )
    }

    const data = await response.json()
    const accessToken = data.data.access_token
    console.log("Access token received from backend:", accessToken ? "YES" : "NO")

    // Set the access token as an HTTP-only cookie
    cookies().set("pharmabot_access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Use secure in production
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })
    console.log("Cookie 'pharmabot_access_token' set successfully.")

    // Return a success response
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error during authentication callback:", e)
    return NextResponse.json({ errors: [{ message: "server_error" }] }, { status: 500 })
  }
}
