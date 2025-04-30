"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsEmailSent(true)
    toast.success("Reset link has been sent to your email!")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-24 w-24 mb-6 rounded-full bg-gradient-to-r from-primary to-pink-400 p-1">
            <div className="relative w-full h-full">
              <Image
                src="https://imgs.search.brave.com/NjICzQ4MDRp4utGI3eyM3lV9vNcQCP5Z4tDbDC1hY3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9zYW5pdGFyeS1w/YWQtd2l0aC1nZXJi/ZXJhLXBpbmstc3Vy/ZmFjZV8xODUxOTMt/MTIxNTAuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA"
                alt="Edukan Logo"
                width={1000}
                height={1000}
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tight text-pink-600">Forgot Password?</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground text-pink-400">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-background border border-border px-4 py-8 shadow-sm sm:rounded-lg sm:px-10">
          {isEmailSent ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mx-auto">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-pink-950">Check your email</h2>
              <p className="text-pink-600/70">
                We&apos;ve sent a password reset link to your email address. Please check your inbox.
              </p>
              <Link
                href="/login"
                className="text-pink-600 hover:text-pink-700 font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-pink-950">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="transition-all focus-visible:ring-pink-300/30 border-pink-200"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-pink-600 hover:text-pink-700 font-medium flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}