"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, ImageIcon, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { analyzeImage } from "@/lib/api"
import { toast } from "sonner"

type RetinopathyGrade = "No DR" | "Mild" | "Moderate" | "Severe" | "Proliferative DR"

type AnalysisResult = {
  grades: Record<RetinopathyGrade, number>
  highestGrade: RetinopathyGrade
}

const gradeDescriptions: Record<RetinopathyGrade, string> = {
  "No DR": "No signs of diabetic retinopathy detected.",
  Mild: "Presence of microaneurysms only, indicating early stage of diabetic retinopathy.",
  Moderate: "More than just microaneurysms but less than severe, may include some hemorrhages and hard exudates.",
  Severe: "Substantial hemorrhages, definite venous beading, or prominent intraretinal microvascular abnormalities.",
  "Proliferative DR":
    "Advanced stage with growth of new blood vessels and potential for severe vision loss if untreated.",
}

export default function Products() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("image/")) {
        handleFileSelect(droppedFile)
      }
    }
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile)
    setResult(null)

    // Create preview URL
    const url = URL.createObjectURL(selectedFile)
    setPreviewUrl(url)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleImageAnalysis = async () => {
    if (!file) return

    setIsAnalyzing(true)

    try {
      // Use the real API call instead of mock data
      const apiResult = await analyzeImage(file)
      
      // Transform the API result to match our component's expected format
      const mappedResult: AnalysisResult = {
        grades: {
          "No DR": apiResult.detailed_classification["No DR"],
          Mild: apiResult.detailed_classification["Mild"] ,
          Moderate: apiResult.detailed_classification["Moderate"],
          Severe: apiResult.detailed_classification["Severe"] ,
          "Proliferative DR": apiResult.detailed_classification["Proliferative DR"],
        },
        highestGrade: apiResult.highest_probability_class as RetinopathyGrade,
      }

      setResult(mappedResult)
      toast.success("Image analysis complete!")
    } catch (error) {
      console.error("Analysis failed:", error)
      toast.error("Failed to analyze image. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const resetUpload = () => {
    setFile(null)
    setPreviewUrl(null)
    setResult(null)
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Retinal Analysis Tool</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a retinal scan image to receive an instant analysis for signs of diabetic retinopathy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed border-gray-300 bg-gray-50 shadow-none">
            <CardContent className="p-6">
              {!file ? (
                <div
                  className={`flex flex-col items-center justify-center py-12 px-4 transition-colors ${
                    isDragging ? "bg-blue-50" : ""
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="mb-6 p-4 bg-blue-100 rounded-full">
                    <Upload className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Drag and drop your retinal scan</h3>
                  <p className="text-gray-500 mb-6 text-center">
                    Upload a clear image of the retina for the most accurate analysis
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => document.getElementById("file-upload")?.click()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Select Image
                    </Button>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileInputChange}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Image Preview */}
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    {previewUrl && (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Retinal scan preview"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Selected file:</p>
                      <p className="font-medium text-gray-900">{file.name}</p>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={resetUpload} disabled={isAnalyzing}>
                        Change Image
                      </Button>
                      <Button onClick={handleImageAnalysis} disabled={isAnalyzing} className="bg-blue-600 hover:bg-blue-700">
                        {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                      </Button>
                    </div>
                  </div>

                  {/* Loading Animation */}
                  {isAnalyzing && (
                    <div className="py-8 flex flex-col items-center">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-600">Analyzing retinal image...</p>
                    </div>
                  )}

                  {/* Results Panel */}
                  {result && (
                    <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Analysis Results</h3>

                      <div className="space-y-6">
                        {(Object.keys(result.grades) as RetinopathyGrade[]).map((grade) => (
                          <div key={grade} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span
                                className={`font-medium ${grade === result.highestGrade ? "text-blue-700" : "text-gray-700"}`}
                              >
                                {grade}
                                {grade === result.highestGrade && (
                                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    Highest Probability
                                  </span>
                                )}
                              </span>
                              <span className="text-gray-500">{Math.round(result.grades[grade])}%</span>
                            </div>
                            <Progress
                              value={result.grades[grade]}
                              className={`h-2 ${grade === result.highestGrade ? "bg-blue-100" : "bg-gray-100"}`}
                            />
                          </div>
                        ))}

                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex gap-2 items-start">
                            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-gray-900">Interpretation: {result.highestGrade}</h4>
                              <p className="text-gray-600 mt-1">{gradeDescriptions[result.highestGrade]}</p>
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-4">
                          <p>
                            This analysis is for informational purposes only and should not replace professional medical
                            advice. Please consult with a healthcare provider for proper diagnosis and treatment.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
