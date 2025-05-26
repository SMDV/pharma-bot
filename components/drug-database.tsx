"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, Pill, Beaker } from "lucide-react"
import drugsData from "@/data/drugs.json"

export function DrugDatabase() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Process the drug data
  const processedDrugs = useMemo(() => {
    const drugs = drugsData.map((item) => item["n.name"])

    // Separate parent drugs from metabolites
    const parentDrugs = drugs.filter(
      (drug) => !drug.includes("-") || ["acetylsalicylic acid", "valproic acid", "salicylic acid"].includes(drug),
    )

    const metabolites = drugs.filter(
      (drug) => drug.includes("-") && !["acetylsalicylic acid", "valproic acid", "salicylic acid"].includes(drug),
    )

    return { parentDrugs, metabolites, allDrugs: drugs }
  }, [])

  // Filter drugs based on search term and category
  const filteredDrugs = useMemo(() => {
    let drugsToFilter = []

    if (selectedCategory === "parent") {
      drugsToFilter = processedDrugs.parentDrugs
    } else if (selectedCategory === "metabolites") {
      drugsToFilter = processedDrugs.metabolites
    } else {
      drugsToFilter = processedDrugs.allDrugs
    }

    if (!searchTerm) return drugsToFilter

    return drugsToFilter.filter((drug) => drug.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [searchTerm, selectedCategory, processedDrugs])

  // Get drug categories for statistics
  const drugCategories = useMemo(() => {
    const categories = {
      Antidepressants: [
        "amitriptyline",
        "citalopram",
        "duloxetine",
        "imipramine",
        "doxepin",
        "clomipramine",
        "desvenlafaxine",
        "milnacipran",
      ],
      "Pain Medications": ["tramadol", "ibuprofen", "acetylsalicylic acid", "diclofenac", "nabumetone", "indomethacin"],
      Anticonvulsants: ["carbamazepine", "phenytoin", "valproic acid", "zonisamide", "clobazam"],
      Cardiovascular: ["warfarin", "verapamil", "diltiazem", "quinidine", "simvastatin", "rosuvastatin"],
      Psychiatric: ["clozapine", "aripiprazole", "haloperidol", "midazolam", "diazepam"],
      Hormones: ["estradiol", "progesterone"],
      Cannabis: ["dronabinol", "cannabidiol"],
      Other: [],
    }

    // Count drugs in each category
    const categoryCounts = {}
    Object.keys(categories).forEach((cat) => {
      categoryCounts[cat] = categories[cat].filter((drug) => processedDrugs.parentDrugs.includes(drug)).length
    })

    // Count uncategorized drugs
    const categorizedDrugs = Object.values(categories).flat()
    categoryCounts["Other"] = processedDrugs.parentDrugs.filter((drug) => !categorizedDrugs.includes(drug)).length

    return categoryCounts
  }, [processedDrugs])

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Drug Database</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our comprehensive database of {processedDrugs.allDrugs.length} drugs and metabolites. Search for
          specific compounds or browse by category.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{processedDrugs.parentDrugs.length}</p>
                <p className="text-sm text-gray-600">Parent Drugs</p>
              </div>
              <Pill className="h-8 w-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">{processedDrugs.metabolites.length}</p>
                <p className="text-sm text-gray-600">Metabolites</p>
              </div>
              <Beaker className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-purple-600">{processedDrugs.allDrugs.length}</p>
                <p className="text-sm text-gray-600">Total Compounds</p>
              </div>
              <Search className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Database
          </CardTitle>
          <CardDescription>Search for specific drugs or metabolites in our database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search for drugs or metabolites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "parent" ? "default" : "outline"}
                onClick={() => setSelectedCategory("parent")}
                size="sm"
              >
                Parent Drugs
              </Button>
              <Button
                variant={selectedCategory === "metabolites" ? "default" : "outline"}
                onClick={() => setSelectedCategory("metabolites")}
                size="sm"
              >
                Metabolites
              </Button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredDrugs.length} of {processedDrugs.allDrugs.length} compounds
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
            <div className="grid gap-2">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="text-sm font-medium">{drug}</span>
                    <Badge
                      variant={processedDrugs.parentDrugs.includes(drug) ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {processedDrugs.parentDrugs.includes(drug) ? "Parent Drug" : "Metabolite"}
                    </Badge>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No compounds found matching your search.</p>
                  <p className="text-sm">Try adjusting your search terms or filters.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Drug Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Drug Categories
          </CardTitle>
          <CardDescription>Browse drugs by therapeutic category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(drugCategories).map(([category, count]) => (
              <div key={category} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{category}</h4>
                  <Badge variant="outline">{count}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {count} {count === 1 ? "drug" : "drugs"} available
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Database Usage Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-blue-800">Search by Generic Name</p>
                <p className="text-sm text-blue-700">
                  Use generic drug names for best results (e.g., "ibuprofen" not "Advil")
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-blue-800">Explore Metabolites</p>
                <p className="text-sm text-blue-700">
                  Many drugs have multiple metabolites - use the chatbot to learn about metabolism pathways
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-blue-800">Partial Matching</p>
                <p className="text-sm text-blue-700">
                  Search works with partial names - try "hydroxy" to find hydroxylated metabolites
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium text-blue-800">Ask the Chatbot</p>
                <p className="text-sm text-blue-700">
                  Found a compound? Ask the chatbot for detailed information about it
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
