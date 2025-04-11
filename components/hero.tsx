"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products")
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative">
      {/* White header area */}
      <div className="h-20 bg-white w-full"></div>
      
      <div className="relative h-screen max-h-[800px] w-full">
        {/* Background Image with Overlay - positioned lower */}
        <div className="absolute inset-0 z-0 translate-y-[5%]">
          <Image
            src="/images/retina-background.png"
            alt="Retinal scan background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-blue-900/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-shadow-lg">
              Non-invasive Diabetes Detection Through Retinal Analysis
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white text-shadow">
              Our advanced AI technology examines fundus images to detect early signs of diabetic retinopathy, providing
              a non-invasive alternative to traditional diagnostic methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/analyze">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300"
                >
                  Analyze Retinal Image
                </Button>
              </Link>
              <Button
                onClick={scrollToProducts}
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
