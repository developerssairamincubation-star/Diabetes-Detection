/**
 * API service for communicating with the FastAPI backend
 */

// Use environment variable with fallback for the Hugging Face deployed server
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://harishvijayasarangan-dr-server.hf.space";

export interface AnalysisResult {
  detailed_classification: {
    [key: string]: number;
  };
  highest_probability_class: string;
}

/**
 * Analyzes a retinal image using the FastAPI backend
 * @param file The image file to analyze
 * @returns Analysis result with detailed classification and highest probability class
 */
export async function analyzeImage(file: File): Promise<AnalysisResult> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
      // No need to set Content-Type header as browser will set it correctly with boundary for FormData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Server error: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
}

/**
 * Checks if the FastAPI server is healthy
 * @returns Health status information
 */
export async function checkServerHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: "unhealthy", message: "Could not connect to server" };
  }
}
