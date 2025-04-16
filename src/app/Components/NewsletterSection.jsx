"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, ArrowRight } from "lucide-react"
import {toast} from "sonner"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
//   const { toast } = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail("")

    //   toast({
    //     title: "Success!",
    //     description: "You've been subscribed to our newsletter. Check your email for the discount code.",
    //   })
    toast.success("Success")
    }, 1500)
  }

  return (
    <section className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-xl p-8 md:p-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated – Subscribe to our newsletter</h2>
            <p className="text-muted-foreground mb-6">
              Join our newsletter to receive updates on new products, special offers, and exclusive discounts.
            </p>
          </div>

          <div className="md:w-1/2 w-full">
            <form onSubmit={handleSubmit} className="bg-background rounded-lg p-6 shadow-lg border border-border">
              <h3 className="font-semibold text-lg mb-4">Get ₹50 off your first order</h3>
              <div className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-grow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <Button type="submit" className="w-full group" disabled={isSubmitting}>
                  {isSubmitting ? "Subscribing..." : "Subscribe & Get Discount"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
