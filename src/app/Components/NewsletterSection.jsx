"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight, Gift } from "lucide-react"
import { toast } from "sonner"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")
      toast.success("Welcome to our newsletter! Check your email for your special discount code.", {
        description: "You&apos;ve successfully subscribed to our newsletter."
      })
    }, 1500)
  }

  return (
    <section className="bg-gradient-to-r from-pink-50 via-pink-100/50 to-pink-50 rounded-xl p-8 md:p-12 my-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-center md:text-left space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-600 mb-4 transform hover:rotate-12 transition-transform duration-300">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-950">
              Join Our Community of Care
            </h2>
            <p className="text-lg text-pink-700/80">
              Subscribe to receive exclusive offers, self-care tips, and updates on our latest products designed for your comfort.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-pink-600">
              <Gift className="h-5 w-5" />
              <span className="font-medium">Get ₹100 off your first order!</span>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-pink-950">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email for exclusive offers"
                    className="h-12 border-pink-200 focus:border-pink-400 focus:ring-pink-400/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Subscribing..."
                  ) : (
                    <>
                      Subscribe Now
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                <p className="text-xs text-pink-600/80 text-center mt-4">
                  By subscribing, you agree to our Terms of Service and Privacy Policy.
                  <br />Your privacy is our priority - we&apos;ll never share your information.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
