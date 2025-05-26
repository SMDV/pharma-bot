import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function HowToUseGuide() {
  const drugCategories = [
    {
      category: "Antidepressants",
      examples: ["amitriptyline", "citalopram", "duloxetine", "imipramine", "doxepin"],
      description: "Studied for neurological disorders, pain management, and inflammatory conditions",
    },
    {
      category: "Pain Medications",
      examples: ["tramadol", "ibuprofen", "acetylsalicylic acid", "diclofenac", "nabumetone"],
      description: "Research applications in cancer prevention, cardiovascular protection, and neuroprotection",
    },
    {
      category: "Anticonvulsants",
      examples: ["carbamazepine", "phenytoin", "valproic acid", "zonisamide", "clobazam"],
      description: "Investigated for mood disorders, neuropathic pain, and cancer therapy",
    },
    {
      category: "Cardiovascular",
      examples: ["warfarin", "verapamil", "diltiazem", "quinidine", "simvastatin"],
      description: "Explored for anti-inflammatory effects, neuroprotection, and cancer prevention",
    },
    {
      category: "Psychiatric",
      examples: ["clozapine", "aripiprazole", "haloperidol", "midazolam", "diazepam"],
      description: "Research into neurological disorders, addiction treatment, and cognitive enhancement",
    },
    {
      category: "Other Medications",
      examples: ["metformin", "fluconazole", "cyclosporine", "buprenorphine", "cannabidiol"],
      description: "Diverse repurposing opportunities across multiple therapeutic areas",
    },
  ]

  const queryExamples = [
    {
      type: "Basic Drug Information",
      examples: ["What is tramadol used for?", "Tell me about ibuprofen mechanisms", "How does warfarin work?"],
    },
    {
      type: "Metabolism & Pathways",
      examples: [
        "What are the metabolites of carbamazepine?",
        "How is duloxetine metabolized?",
        "What pathways does metformin affect?",
      ],
    },
    {
      type: "Drug Repurposing Research",
      examples: [
        "What are potential new uses for aspirin?",
        "Can antidepressants be used for pain management?",
        "What anti-inflammatory properties does simvastatin have?",
      ],
    },
    {
      type: "Mechanism Analysis",
      examples: [
        "What receptors does aripiprazole target?",
        "How does valproic acid affect gene expression?",
        "What are the off-target effects of ibuprofen?",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How to Use PharmaBot for Drug Repurposing</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn how to effectively interact with our drug information chatbot to support your drug repurposing research
          and identify potential new therapeutic applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                className="text-emerald-600"
              >
                <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l5 4V7l-5 4Z" />
                <path d="M22 9 12 2 2 9" />
              </svg>
              Getting Started
            </CardTitle>
            <CardDescription>Basic steps to interact with the chatbot for research purposes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Navigate to the Drug Chatbot tab</p>
                  <p className="text-sm text-gray-600">
                    Access the interactive interface to start your research queries
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Ask research-focused questions</p>
                  <p className="text-sm text-gray-600">
                    Inquire about drug mechanisms, metabolites, and potential new applications
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Analyze for repurposing opportunities</p>
                  <p className="text-sm text-gray-600">
                    Use the information to identify potential new therapeutic applications
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
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
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              </svg>
              Research Best Practices
            </CardTitle>
            <CardDescription>Tips for effective drug repurposing research</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-medium text-blue-800 mb-1">Focus on Mechanisms</p>
                <p className="text-sm text-blue-700">Ask about molecular targets and pathways for new applications</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="font-medium text-green-800 mb-1">Explore Metabolites</p>
                <p className="text-sm text-green-700">
                  Investigate active metabolites that might have different therapeutic effects
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="font-medium text-purple-800 mb-1">Cross-Reference Categories</p>
                <p className="text-sm text-purple-700">
                  Look for drugs from one category that might work in another therapeutic area
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
              className="text-orange-600"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
              <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
            </svg>
            Drug Categories for Repurposing Research
          </CardTitle>
          <CardDescription>
            Explore these drug categories and their potential for repurposing applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {drugCategories.map((category, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">{category.category}</h4>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-1">
                  {category.examples.map((drug, drugIndex) => (
                    <Badge key={drugIndex} variant="secondary" className="text-xs">
                      {drug}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
              className="text-indigo-600"
            >
              <path d="M7 8h10" />
              <path d="M7 12h4l1 8 4-8h4" />
              <path d="M7 16h10" />
            </svg>
            Example Research Questions
          </CardTitle>
          <CardDescription>Sample queries to help you get started with repurposing research</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {queryExamples.map((category, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  {category.type}
                </h4>
                <div className="space-y-2">
                  {category.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="p-3 bg-gray-50 rounded-lg border-l-2 border-indigo-200">
                      <p className="text-sm text-gray-700 italic">"{example}"</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
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
            Drug Repurposing Research Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Research Applications:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Target identification and validation</li>
                <li>• Mechanism of action analysis</li>
                <li>• Metabolite activity profiling</li>
                <li>• Cross-indication potential assessment</li>
                <li>• Literature and patent research support</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-800">Research Considerations:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Validate findings with experimental data</li>
                <li>• Consider pharmacokinetic differences</li>
                <li>• Assess safety profiles for new indications</li>
                <li>• Review regulatory approval pathways</li>
                <li>• Evaluate intellectual property implications</li>
              </ul>
            </div>
          </div>
          <Separator className="bg-blue-200" />
          <div className="text-center">
            <p className="text-sm text-blue-800 font-medium">
              🔬 This tool supports research discovery - always validate findings through proper experimental and
              clinical studies.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
