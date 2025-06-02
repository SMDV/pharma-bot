"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [popup, setPopup] = useState<Window | null>(null)

  useEffect(() => {
    const authError = searchParams.get("error")
    if (authError) {
      setError(`Authentication failed: ${authError}. Please try again.`)
    }
  }, [searchParams])

  // Temporarily disable handleMessage for oob debugging
  // const handleMessage = async (event: MessageEvent) => {
  //   console.log("Received message event:", event);
  //   if (event.origin === "https://accounts.google.com" && event.data && event.data.code) {
  //     if (popup) {
  //       popup.close();
  //       setPopup(null);
  //     }
  //     setLoading(true);
  //     setError(null);

  //     const authorizationCode = event.data.code;

  //     try {
  //       const response = await fetch("/api/auth/callback", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ authorization_code: authorizationCode }),
  //       });

  //       console.log("Response from /api/auth/callback:", response.ok ? "OK" : "NOT OK", response.status);

  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         console.error("Backend authentication failed:", errorData);
  //         setError(`Authentication failed: ${errorData.errors?.[0]?.message || "authentication_failed"}. Please try again.`);
  //       } else {
  //         console.log("Authentication successful, attempting to redirect to /");
  //         router.push("/");
  //       }
  //     } catch (e) {
  //       console.error("Error during authentication callback:", e);
  //       setError("Authentication failed: server error. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else if (event.origin === "https://accounts.google.com" && event.data && event.data.error) {
  //     if (popup) {
  //       popup.close();
  //       setPopup(null);
  //     }
  //     setLoading(false);
  //     setError(`Google login failed: ${event.data.error}. Please try again.`);
  //   }
  // };

  useEffect(() => {
    // No message listener needed for oob flow
    // window.addEventListener("message", handleMessage);
    return () => {
      // window.removeEventListener("message", handleMessage);
      if (popup) {
        popup.close() // Ensure pop-up is closed on component unmount
      }
    }
  }, [popup, router])

  const handleGoogleLogin = () => {
    setLoading(true)
    setError(null)

    console.log("Current window.location.origin:", window.location.origin)

    // TEMPORARY CHANGE FOR DEBUGGING: Use urn:ietf:wg:oauth:2.0:oob
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=email profile&access_type=offline`

    console.log("Google Auth URL being opened (OOB for debugging):", googleAuthUrl)

    const newPopup = window.open(googleAuthUrl, "googleLoginPopup", "width=500,height=600,resizable=yes,scrollbars=yes")
    setPopup(newPopup)

    if (!newPopup || newPopup.closed || typeof newPopup.closed === "undefined") {
      setLoading(false)
      setError("Pop-up blocked by browser. Please allow pop-ups for this site.")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-900 to-emerald-900 px-4">
      <Card className="relative z-20 w-full max-w-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 bg-white rounded-lg shadow-sm w-16 h-16 flex items-center justify-center mb-4">
            <Image
              src="/images/pharmabot-logo.png"
              alt="PharmaBot Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold">Sign In to PharmaBot Assistant</CardTitle>
          <CardDescription>Access advanced drug repurposing research tools.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in with Google
          </Button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <p className="text-sm text-gray-500 text-center">
            No registration needed. Your Google account is used for one-way verification.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
