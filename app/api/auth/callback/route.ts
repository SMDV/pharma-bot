import { NextResponse } from "next/server"
// No need to import cookies from next/headers if backend sets it directly

export async function POST(request: Request) {
  const { authorization_code: code } = await request.json()
  console.log("Received authorization code from Google (via postMessage):", code)

  if (!code) {
    return NextResponse.json({ errors: [{ message: "missing_authorization_code" }] }, { status: 400 })
  }

  try {
    // Exchange authorization code for access token with your backend
    // Your backend is responsible for setting the httpOnly cookie directly on the browser.
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

    // If the backend responded with OK, it means it successfully handled authentication
    // and set the httpOnly cookie directly.
    console.log("Backend authentication successful. Assuming backend set httpOnly cookie.")

    // Return a success response to the client-side login page
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error("Error during authentication callback:", e)
    return NextResponse.json({ errors: [{ message: "server_error" }] }, { status: 500 })
  }
}
