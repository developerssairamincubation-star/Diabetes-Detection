# RetinAI Healthcare - Diabetic Retinopathy Detection

A Next.js application that allows users to upload retinal images for diabetic retinopathy detection using a FastAPI backend with an ONNX model.

## Features

- Retinal image upload with drag-and-drop functionality
- Real-time image analysis using a FastAPI backend
- Detailed classification results with visualization
- Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Charts**: Recharts
- **Backend**: FastAPI, ONNX Runtime
- **Image Processing**: PIL, NumPy

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- Python 3.8+ (for FastAPI backend)
- ONNX model for diabetic retinopathy detection

### Frontend Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory (if separate)
2. Install Python dependencies:
   ```
   pip install fastapi uvicorn onnxruntime pillow numpy
   ```
3. Place your ONNX model file as `model.onnx` in the backend directory
4. Start the FastAPI server:
   ```
   python main.py
   ```

## Deployment

### Frontend Deployment

The Next.js application can be deployed to platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

### Backend Deployment

The FastAPI backend requires a server with Python support. Consider using:
- Cloud platforms (AWS, GCP, Azure)
- Container services (Docker, Kubernetes)
- Specialized ML hosting services

Remember to configure CORS settings in the FastAPI server to allow requests from your deployed frontend domain.

## Usage

1. Navigate to the application in your browser
2. Click on "Analyze Retinal Image" in the hero section
3. Upload a retinal image by dragging and dropping or clicking to browse
4. Wait for the analysis to complete
5. View the detailed classification results

## License

[MIT License](LICENSE)
