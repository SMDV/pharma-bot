"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Script from "next/script" // Import Script for GSI library

// Declare google as a global variable for TypeScript
declare global {
  namespace google {
    namespace accounts {
      namespace oauth2 {
        interface CodeClient {
          requestCode(): void
        }
        interface CodeResponse {
          code?: string
          error?: string
          error_description?: string
          error_uri?: string
        }
        interface CodeClientConfig {
          client_id: string
          scope: string
          ux_mode: "popup" | "redirect"
          callback: (response: CodeResponse) => void
          // Add other optional parameters if needed, e.g., prompt, select_account
        }
        function initCodeClient(config: CodeClientConfig): CodeClient
      }
    }
  }
}

export default function LoginPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const codeClientRef = useRef<google.accounts.oauth2.CodeClient | null>(null)
  const [isGsiClientReady, setIsGsiClientReady] = useState(false) // New state to track GSI client readiness

  // Highlight: Direct boolean to control debug button visibility
  // Set to 'true' for development/debugging.
  // IMPORTANT: Change to 'false' before deploying to production!
  const showDebugButton = true // Set to 'false' for production deployment

  useEffect(() => {
    const authError = searchParams.get("error")
    if (authError) {
      setError(`Authentication failed: ${authError}. Please try again.`)
    }
  }, [searchParams])

  // Callback function to handle the authorization code response from Google
  const handleCodeResponse = useCallback(
    async (response: google.accounts.oauth2.CodeResponse) => {
      setLoading(true)
      setError(null)

      if (response.error) {
        console.error("Error obtaining code from Google GSI:", response)
        setError(`Google login failed: ${response.error_description || response.error}. Please try again.`)
        setLoading(false)
        return
      }

      const authorizationCode = response.code
      console.log("✔️ Authorization code received from Google GSI:", authorizationCode ? "YES" : "NO")

      if (!authorizationCode) {
        setError("Authentication failed: No authorization code received.")
        setLoading(false)
        return
      }

      try {
        // Send the authorization code to your backend via your API route handler
        const apiResponse = await fetch("/api/auth/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ authorization_code: authorizationCode }),
        })

        console.log("Response from /api/auth/callback:", apiResponse.ok ? "OK" : "NOT OK", apiResponse.status)

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json()
          console.error("Backend authentication failed:", errorData)
          setError(
            `Authentication failed: ${errorData.errors?.[0]?.message || "authentication_failed"}. Please try again.`,
          )
        } else {
          // Authentication successful, set localStorage flag and redirect to home page
          console.log("Authentication successful, setting localStorage flag and attempting to redirect to /")
          localStorage.setItem("pharmabot_logged_in", "true") // Set the flag
          router.push("/")
        }
      } catch (e) {
        console.error("Error during authentication callback:", e)
        setError("Authentication failed: server error. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [router],
  )

  // Initialize the GSI code client once the script is loaded
  const initializeGsiClient = useCallback(() => {
    console.log("GSI script loaded. Attempting to initialize client...")
    if (typeof window !== "undefined" && window.google) {
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined. Cannot initialize GSI client.")
        setError("Configuration error: Google Client ID is missing.")
        return
      }
      try {
        codeClientRef.current = window.google.accounts.oauth2.initCodeClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
          scope: "openid email profile",
          ux_mode: "popup",
          callback: handleCodeResponse,
        })
        console.log("Google GSI code client initialized successfully.")
        setIsGsiClientReady(true) // Set state to true when client is ready
      } catch (e) {
        console.error("Error initializing Google GSI client:", e)
        setError("Failed to initialize Google Sign-In. Please check console for details.")
      }
    } else {
      console.log("window.google not available yet.")
    }
  }, [handleCodeResponse])

  // Handle debug bypass login
  const handleDebugBypassLogin = () => {
    console.log("Debug bypass login: Setting localStorage flag and redirecting.")
    localStorage.setItem("pharmabot_logged_in", "true")
    router.push("/")
  }

  // Function to handle Google login
  const handleGoogleLogin = () => {
    if (codeClientRef.current) {
      codeClientRef.current.requestCode()
    }
  }

  return (
    <>
      {/* Load the Google GSI library */}
      <Script
        src="https://accounts.google.com/gsi/client"
        async
        defer
        onLoad={initializeGsiClient} // Initialize client once script is loaded
      />

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
              disabled={loading || !isGsiClientReady} // Use new state for button readiness
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign in with Google
            </Button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <p className="text-sm text-gray-500 text-center">
              No registration needed. Your Google account is used for one-way verification.
            </p>
            {/* Highlight: Conditionally render the Debug Bypass Login Button */}
            {showDebugButton && (
              <Button
                onClick={handleDebugBypassLogin}
                variant="secondary"
                className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
              >
                Debug Bypass Login (Dev Only)
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  )
}
