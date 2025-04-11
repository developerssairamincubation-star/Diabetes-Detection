import Hero from "@/components/hero"
import Services from "@/components/services"
import Products from "@/components/products"
import About from "@/components/about"
import Footer from "@/components/footer"
import Header from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Products />
      <About />
      <Footer />
    </main>
  )
}
