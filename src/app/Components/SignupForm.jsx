"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, UserPlus, Eye, EyeOff, RefreshCw, AlertCircle, Check } from "lucide-react"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ""
  })
  
  // Check password strength whenever password changes
  useEffect(() => {
    checkPasswordStrength(formData.password)
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const checkPasswordStrength = (password) => {
    // Simple password strength algorithm
    let score = 0
    let message = ""

    if (password.length === 0) {
      message = ""
    } else if (password.length < 6) {
      score = 1
      message = "Weak: Too short"
    } else {
      // Add a point for length >= 8
      if (password.length >= 8) score += 1
      
      // Add a point for having lowercase letters
      if (/[a-z]/.test(password)) score += 1
      
      // Add a point for having uppercase letters
      if (/[A-Z]/.test(password)) score += 1
      
      // Add a point for having numbers
      if (/[0-9]/.test(password)) score += 1
      
      // Add a point for having special characters
      if (/[^A-Za-z0-9]/.test(password)) score += 1

      // Set message based on score
      if (score <= 2) {
        message = "Weak"
      } else if (score <= 3) {
        message = "Medium"
      } else if (score <= 4) {
        message = "Strong"
      } else {
        message = "Very Strong"
      }
    }

    setPasswordStrength({ score, message })
  }

  const generateStrongPassword = () => {
    // Define character sets
    const lowerCase = "abcdefghijklmnopqrstuvwxyz"
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_-+=<>?"
    
    // Ensure at least one from each category
    let password = ""
    password += lowerCase[Math.floor(Math.random() * lowerCase.length)]
    password += upperCase[Math.floor(Math.random() * upperCase.length)]
    password += numbers[Math.floor(Math.random() * numbers.length)]
    password += symbols[Math.floor(Math.random() * symbols.length)]
    
    // Add additional random characters to reach 12 character length
    const allChars = lowerCase + upperCase + numbers + symbols
    for (let i = 0; i < 8; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)]
    }
    
    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('')
    
    // Update form data with new password
    setFormData(prev => ({
      ...prev,
      password,
      confirmPassword: password
    }))
    
    // Show the generated password
    setShowPassword(true)
    setShowConfirmPassword(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      // Using browser alert since toast is not defined in the original code
      alert("Passwords don't match. Please make sure your passwords match.")
      return
    }

    setIsSubmitting(true)

    // Simulate account creation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Using browser alert since toast is not defined in the original code
    alert("Account created! Welcome to EDUKAN. Your account has been created successfully.")

    setIsSubmitting(false)
  }

  // Function to get color based on password strength
  const getStrengthColor = (score) => {
    if (score === 0) return "bg-gray-200"
    if (score <= 2) return "bg-red-500"
    if (score <= 3) return "bg-yellow-500"
    if (score <= 4) return "bg-green-500"
    return "bg-green-600"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Full name
        </label>
        <Input
          id="name"
          name="name"
          autoComplete="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="transition-all focus-visible:ring-primary/30"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={generateStrongPassword} 
            className="h-6 text-xs flex items-center gap-1 text-primary"
          >
            <RefreshCw className="h-3 w-3" />
            Generate Strong Password
          </Button>
        </div>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="transition-all focus-visible:ring-primary/30 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <div className="text-xs font-medium flex items-center gap-1">
                {passwordStrength.score > 3 ? (
                  <Check className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                )}
                {passwordStrength.message}
              </div>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getStrengthColor(passwordStrength.score)} transition-all duration-300`} 
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="transition-all focus-visible:ring-primary/30 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create account
            </>
          )}
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link href="/login" className="font-medium text-primary hover:text-primary/90 transition-colors">
          Sign in
        </Link>
      </div>
    </form>
  )
}