
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "About Us | EDUKAN",
  description: "Learn more about our company, mission, and the team behind SHOPIFY.",
}

export default function AboutPage() {


  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">We&apos;re Redefining Online Shopping</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            At EDUKAN, we&apos;re passionate about delivering exceptional products and experiences that make everyday life
            better.
          </p>
          <Link
            href="/product"
            className="inline-flex items-center rounded-full bg-blue-500 text-white text-lg px-6 py-2 group transition-all"
          >
            Our Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                Founded in 2015, EDUKAN began with a simple mission: to create a better way to shop online. What
                started as a small team working out of a tiny office has grown into a thriving e-commerce platform
                serving customers worldwide.
              </p>
              <p className="text-muted-foreground mb-6">
                Our journey hasn&apos;t always been easy, but our commitment to quality, innovation, and customer
                satisfaction has never wavered. We&apos;ve learned, adapted, and evolved to become the company we are today.
              </p>
              <p className="text-muted-foreground">
                As we continue to grow, we remain dedicated to our core values and the customers who have supported us
                along the way. We&apos;re excited about the future and the opportunity to keep serving you better.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Our+Story"
                alt="Our story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We&apos;re guided by a set of principles that define who we are and how we operate. These values shape our
              decisions, influence our actions, and drive our commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 p-3 inline-flex rounded-full mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Customer First</h3>
              <p className="text-muted-foreground">
                We believe in putting our customers at the center of everything we do. Your satisfaction is our top
                priority, and we&apos;re committed to exceeding your expectations at every turn.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 p-3 inline-flex rounded-full mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality & Innovation</h3>
              <p className="text-muted-foreground">
                We&apos;re dedicated to offering high-quality products and continuously innovating to improve our offerings.
                We never settle for good enough when we can strive for excellence.
              </p>
            </div>

            <div className="bg-background p-8 rounded-lg border border-border shadow-sm">
              <div className="bg-primary/10 p-3 inline-flex rounded-full mb-6">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to sustainable practices throughout our business. From eco-friendly packaging to
                responsible sourcing, we strive to minimize our environmental impact and create a better future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              The passionate individuals behind EDUKAN are dedicated to creating the best shopping experience for you.
              Our diverse team brings together expertise from various fields.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Aanya Sharma",
                role: "Founder & CEO",
                image: "/placeholder.svg?height=400&width=400&text=AS",
              },
              {
                name: "Raj Patel",
                role: "Chief Product Officer",
                image: "/placeholder.svg?height=400&width=400&text=RP",
              },
              {
                name: "Priya Mehta",
                role: "Head of Design",
                image: "/placeholder.svg?height=400&width=400&text=PM",
              },
              {
                name: "Vikram Singh",
                role: "Tech Lead",
                image: "/placeholder.svg?height=400&width=400&text=VS",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We&apos;re always looking for talented individuals to join our team. If you&apos;re passionate about e-commerce and
            want to make a difference, we&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
               className="inline-flex items-center rounded-full bg-blue-500 text-white text-lg px-6 py-2 group transition-all">
              View Careers
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
               className="inline-flex items-center rounded-full bg-blue-500 text-white text-lg px-6 py-2 group transition-all"
              variant="outline" >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
