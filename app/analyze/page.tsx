"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/image-upload";
import { ResultsDisplay } from "@/components/results-display";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AnalyzePage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    // Scroll to results
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  };

  const resetAnalysis = () => {
    setAnalysisResult(null);
  };

  return (
    <div className="container max-w-5xl py-12 space-y-12">
      <div className="space-y-4">
        <Link href="/">
          <Button variant="ghost" className="pl-0 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Retinal Image Analysis</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload a retinal image to detect signs of diabetic retinopathy. 
            Our AI model will analyze the image and provide a detailed classification.
          </p>
        </div>
      </div>

      {!analysisResult ? (
        <div className="max-w-xl mx-auto">
          <ImageUpload onAnalysisComplete={handleAnalysisComplete} />
        </div>
      ) : (
        <div className="space-y-6" id="results">
          <ResultsDisplay result={analysisResult} />
          
          <div className="flex justify-center pt-4">
            <Button onClick={resetAnalysis}>
              Analyze Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
