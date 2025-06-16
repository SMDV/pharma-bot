"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function ExternalChatbot() {
  const [isLoading, setIsLoading] = useState(true)
  const [key, setKey] = useState(0)

  const chatbotUrl = "https://drug-chatbot-945825841069.asia-southeast2.run.app/?__theme=light"

  const handleRefresh = () => {
    setIsLoading(true)
    setKey((prev) => prev + 1)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  const openInNewTab = () => {
    window.open(chatbotUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Card className="w-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">PharmaBot</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              <p className="text-sm text-gray-600">Loading drug information chatbot...</p>
            </div>
          </div>
        )}

        <iframe
          key={key}
          src={chatbotUrl}
          className="w-full h-[600px] border-0"
          onLoad={handleLoad}
          title="Drug Information Chatbot"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="p-3 bg-gray-50 text-xs text-gray-600 border-t">
        <p>This chatbot is hosted externally. If you experience any issues, try refreshing.</p>
      </div>
    </Card>
  )
}
