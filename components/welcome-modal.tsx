"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

interface WelcomeModalProps {
  onGetStarted: (showGuide: boolean) => void
}

export function WelcomeModal({ onGetStarted }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem("pharmabot-welcome-seen")
    if (!hasSeenWelcome) {
      setIsOpen(true)
    }
  }, [])

  const handleGetStarted = (showGuide: boolean) => {
    if (dontShowAgain) {
      localStorage.setItem("pharmabot-welcome-seen", "true")
    }
    setIsOpen(false)
    onGetStarted(showGuide)
  }

  const features = [
    {
      icon: "🔬",
      title: "Drug Mechanism Analysis",
      description: "Explore molecular targets and pathways for repurposing opportunities",
    },
    {
      icon: "🧬",
      title: "Metabolite Research",
      description: "Investigate active metabolites and their potential therapeutic effects",
    },
    {
      icon: "📊",
      title: "Comprehensive Database",
      description: "Access 400+ drugs and metabolites across multiple therapeutic categories",
    },
    {
      icon: "🎯",
      title: "Target Identification",
      description: "Discover new therapeutic applications for existing medications",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto p-4 bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg">
            <Image
              src="/images/pharmabot-logo.png"
              alt="PharmaBot Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent text-center">
            Welcome to PharmaBot Assistant
          </DialogTitle>
          <DialogDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your AI-powered companion for drug repurposing research. Discover new therapeutic applications for existing
            medications through advanced drug information analysis.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Key Features */}
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Research Focus */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
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
                className="text-blue-600"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              Perfect for Drug Repurposing Research
            </h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  Researchers
                </Badge>
                <p className="text-sm text-blue-700">Pharmaceutical scientists exploring new drug applications</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  Academics
                </Badge>
                <p className="text-sm text-blue-700">Students and faculty studying drug mechanisms and metabolism</p>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  Biotech
                </Badge>
                <p className="text-sm text-blue-700">Companies investigating repurposing opportunities</p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
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
                <p className="text-yellow-800 text-sm font-medium mb-1">Research Tool Notice</p>
                <p className="text-yellow-700 text-sm">
                  This tool provides drug information for research purposes only. Always validate findings through
                  experimental studies and consult regulatory guidelines for clinical applications.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={() => handleGetStarted(true)}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12"
            >
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
                className="mr-2"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Show Me How to Use (Recommended for first-time users)
            </Button>
            <Button
              onClick={() => handleGetStarted(false)}
              variant="outline"
              className="flex-1 h-12 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
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
                className="mr-2"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              Go Directly to Drug Chatbot
            </Button>
          </div>

          {/* Don't show again option */}
          <div className="flex items-center space-x-2 pt-2 border-t">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
            />
            <label htmlFor="dont-show-again" className="text-sm text-gray-600 cursor-pointer">
              Don't show this welcome message again
            </label>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
