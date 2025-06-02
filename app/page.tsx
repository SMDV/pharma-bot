"use client"

import { useState, useEffect } from "react"
import { ExternalChatbot } from "@/components/external-chatbot"
import { HowToUseGuide } from "@/components/how-to-use-guide"
import { DrugDatabase } from "@/components/drug-database"
import { WelcomeModal } from "@/components/welcome-modal"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { getCookie } from "cookies-next" // Import getCookie

export default function Home() {
  const [activeTab, setActiveTab] = useState("chatbot")
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(false)

  useEffect(() => {
    const token = getCookie("pharmabot_access_token")
    if (token) {
      setIsAuthenticated(true)
      // Only show welcome modal if user is authenticated and hasn't seen it before
      const hasSeenWelcome = localStorage.getItem("pharmabot-welcome-seen")
      if (!hasSeenWelcome) {
        setShowWelcomeModal(true)
      }
    } else {
      router.push("/login") // Redirect to login if not authenticated
    }
  }, [router])

  const handleWelcomeComplete = (showGuide: boolean) => {
    setShowWelcomeModal(false)
    if (showGuide) {
      setActiveTab("guide")
    } else {
      setActiveTab("chatbot")
    }
  }

  if (!isAuthenticated) {
    return null // Or a loading spinner while redirecting
  }

  return (
    <div className="flex flex-col min-h-screen">
      {showWelcomeModal && <WelcomeModal onGetStarted={handleWelcomeComplete} />}

      <header className="border-b bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container flex items-center h-20 px-4 mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Image
                src="/images/pharmabot-logo.png"
                alt="PharmaBot Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PharmaBot Assistant</h1>
              <p className="text-sm text-gray-600">Advanced Drug Information & Metabolism Analysis</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-600 mt-0.5 mr-3 flex-shrink-0"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="m12 17 .01 0" />
              </svg>
              <div>
                <p className="text-yellow-800 text-sm font-medium mb-1">Medical Disclaimer</p>
                <p className="text-yellow-700 text-sm">
                  This chatbot provides drug information and metabolite data for{" "}
                  <strong>drug repurposing research</strong> and educational purposes only. It is designed to support
                  researchers in identifying potential new therapeutic applications for existing drugs. This is{" "}
                  <strong>not a substitute</strong> for professional medical advice, clinical trials, or regulatory
                  approval processes.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex w-full border-b mb-6">
              <button
                onClick={() => setActiveTab("chatbot")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "chatbot"
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                </svg>
                Drug Chatbot
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "guide"
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                How to Use
              </button>
              <button
                onClick={() => setActiveTab("database")}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === "database"
                    ? "border-emerald-500 text-emerald-600 bg-emerald-50"
                    : "border-transparent text-gray-600 hover:text-gray-800"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                </svg>
                Drug Database
              </button>
            </div>

            {/* All tab content is always mounted, just hidden when not active */}
            <div className={activeTab === "chatbot" ? "block" : "hidden"}>
              <ExternalChatbot />
            </div>

            <div className={activeTab === "guide" ? "block" : "hidden"}>
              <HowToUseGuide />
            </div>

            <div className={activeTab === "database" ? "block" : "hidden"}>
              <DrugDatabase />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} PharmaBot Assistant. For educational and research purposes only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
