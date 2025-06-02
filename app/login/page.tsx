"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const authError = searchParams.get("error")
    if (authError) {
      setError(`Authentication failed: ${authError}. Please try again.`)
    }
  }, [searchParams])

  const handleGoogleLogin = () => {
    setLoading(true)
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/api/auth/callback")}&response_type=code&scope=email profile&access_type=offline`
    window.location.href = googleAuthUrl
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
