"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">RetinAI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("products")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Products
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </button>
          <Button onClick={() => scrollToSection("products")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Try Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("products")}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              About
            </button>
            <Button
              onClick={() => scrollToSection("products")}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Try Now
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
