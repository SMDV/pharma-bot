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
  // selectedCategory can now be "all", "parent", "metabolites", or a specific category name like "Antidepressants"
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

  // Get drug categories with their respective drugs
  const drugCategories = useMemo(() => {
    const categoriesMap: Record<string, string[]> = {
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
      Other: [], // This will be dynamically populated
    }

    const allParentDrugsSet = new Set(processedDrugs.parentDrugs)
    const categorizedParentDrugsSet = new Set<string>()

    // Filter existing categories to only include parent drugs present in our data
    // and track which parent drugs have been categorized
    for (const categoryName in categoriesMap) {
      if (categoryName !== "Other") {
        categoriesMap[categoryName] = categoriesMap[categoryName].filter((drug) => {
          if (allParentDrugsSet.has(drug)) {
            categorizedParentDrugsSet.add(drug)
            return true
          }
          return false
        })
      }
    }

    // Populate the "Other" category with any parent drugs not explicitly listed in other categories
    categoriesMap["Other"] = processedDrugs.parentDrugs.filter((drug) => !categorizedParentDrugsSet.has(drug))

    return categoriesMap
  }, [processedDrugs])

  // Filter drugs based on search term and selected category
  const filteredDrugs = useMemo(() => {
    let drugsToFilter: string[] = []

    // Determine the base list of drugs based on the selected primary filter (All, Parent, Metabolites)
    if (selectedCategory === "all") {
      drugsToFilter = processedDrugs.allDrugs
    } else if (selectedCategory === "parent") {
      drugsToFilter = processedDrugs.parentDrugs
    } else if (selectedCategory === "metabolites") {
      drugsToFilter = processedDrugs.metabolites
    } else if (drugCategories[selectedCategory]) {
      // If a specific category card was clicked, use its list of drugs
      drugsToFilter = drugCategories[selectedCategory]
    } else {
      // Default to all drugs if no specific filter is active (e.g., initial load)
      drugsToFilter = processedDrugs.allDrugs
    }

    // Apply search term filter
    if (searchTerm) {
      return drugsToFilter.filter((drug) => drug.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return drugsToFilter
  }, [searchTerm, selectedCategory, processedDrugs, drugCategories])

  // Determine if a specific category card is selected (not "all", "parent", or "metabolites")
  const isCategoryFilterActive = useMemo(() => {
    return !["all", "parent", "metabolites"].includes(selectedCategory)
  }, [selectedCategory])

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
                onClick={() => {
                  setSelectedCategory("all")
                  setSearchTerm("")
                }}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "parent" ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory("parent")
                  setSearchTerm("")
                }}
                size="sm"
              >
                Parent Drugs
              </Button>
              <Button
                variant={selectedCategory === "metabolites" ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory("metabolites")
                  setSearchTerm("")
                }}
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
          <div
            className={`max-h-96 overflow-y-auto border rounded-lg p-4 ${isCategoryFilterActive ? "bg-emerald-50 border-emerald-500" : ""}`}
          >
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
          {/* Added user-friendly hint */}
          <CardDescription className="text-sm text-gray-600">
            Click a category below to filter the drug list.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(drugCategories).map(([categoryName, drugsInCat]) => (
              <Card
                key={categoryName}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedCategory === categoryName ? "bg-emerald-50 border-emerald-500" : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedCategory(categoryName) // Set the specific category name
                  setSearchTerm("") // Clear search term when a category is clicked
                }}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{categoryName}</h4>
                  <Badge variant="outline">{drugsInCat.length}</Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {drugsInCat.length} {drugsInCat.length === 1 ? "drug" : "drugs"} available
                </p>
              </Card>
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
