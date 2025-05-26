import { ExternalChatbot } from "@/components/external-chatbot"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center h-16 px-4 mx-auto">
          <h1 className="text-xl font-bold text-emerald-600 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-heart-pulse"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
            </svg>
            PharmaBot
          </h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
            <p className="text-yellow-700 text-sm">
              <strong>Disclaimer:</strong> This chatbot provides general drug information only and is not a substitute
              for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare
              provider for medical concerns and before making any changes to your medication.
            </p>
          </div>

          <ExternalChatbot />
        </div>
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Drug Information Chatbot. Not for emergency use.</p>
        </div>
      </footer>
    </div>
  )
}
