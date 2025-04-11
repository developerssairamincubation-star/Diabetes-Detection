import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Clock, Activity } from "lucide-react"

export default function Services() {
  const services = [
    {
      title: "Early Detection",
      description:
        "Our AI technology identifies signs of diabetic retinopathy before symptoms appear, enabling proactive treatment and better outcomes.",
      icon: <Eye className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Non-invasive",
      description:
        "Replace uncomfortable blood tests with a simple, painless retinal scan that provides accurate diagnostic information.",
      icon: <Activity className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Instant Results",
      description:
        "Receive comprehensive analysis within seconds, allowing for immediate consultation and treatment planning.",
      icon: <Clock className="h-12 w-12 text-blue-600" />,
    },
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            RetinAI provides cutting-edge diagnostic solutions that transform how diabetes is detected and monitored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center pt-8">
                {service.icon}
                <CardTitle className="mt-4 text-xl font-bold text-gray-800">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
