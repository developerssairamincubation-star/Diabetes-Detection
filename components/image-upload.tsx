"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { analyzeImage } from "@/lib/api";

// Define form schema with validation
const formSchema = z.object({
  image: z.instanceof(File, { message: "Image is required" })
    .refine(file => file.type.startsWith("image/"), {
      message: "File must be an image",
    })
    .refine(file => file.size <= 10 * 1024 * 1024, {
      message: "Image must be less than 10MB",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface ImageUploadProps {
  onAnalysisComplete: (result: any) => void;
}

export function ImageUpload({ onAnalysisComplete }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Set the file in the form
      form.setValue("image", file, { shouldValidate: true });
      
      // Create preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Clean up the preview URL when component unmounts
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [form]);

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1,
  });

  // Clear selected image
  const clearImage = () => {
    form.resetField("image");
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const result = await analyzeImage(data.image);
      onAnalysisComplete(result);
      toast.success("Image analysis complete!");
    } catch (error) {
      console.error("Analysis failed:", error);
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col items-center space-y-4">
                  {/* Dropzone */}
                  {!preview && (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-12 w-full cursor-pointer transition-colors
                        ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/50"}`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center space-y-2 text-center">
                        <Upload className="h-10 w-10 text-gray-400" />
                        <h3 className="font-semibold text-lg">Drag & drop your retinal image</h3>
                        <p className="text-sm text-gray-500">
                          or click to browse (max 10MB)
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Image preview */}
                  {preview && (
                    <Card className="w-full max-w-md overflow-hidden">
                      <CardContent className="p-0 relative">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={preview}
                            alt="Image preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full"
                          onClick={clearImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center">
          <Button 
            type="submit" 
            disabled={!preview || isLoading}
            className="w-full max-w-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Image...
              </>
            ) : (
              "Analyze Image"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
