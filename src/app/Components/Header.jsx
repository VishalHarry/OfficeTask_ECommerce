"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Search, ShoppingCart, Sun, Moon, Menu, X, Heart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef(null)

  // Add the toggleTheme function
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  // Mock suggestions with categories
  const suggestions = [
    { text: "Summer dress", category: "Fashion" },
    { text: "Casual shoes", category: "Footwear" },
    { text: "Wireless headphones", category: "Electronics" },
    { text: "Smart watch", category: "Accessories" },
    { text: "Laptop bag", category: "Bags" },
  ]

  // Fix for hydration mismatch with theme - needs to be in a separate useEffect
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setShowSuggestions(e.target.value.length > 0)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text)
    setShowSuggestions(false)
  }

  // Updated navLinkClass with theme-specific styling
  const navLinkClass = "relative text-sm font-medium text-pink-700 hover:text-pink-900 dark:text-pink-300 dark:hover:text-pink-100 transition-colors group";
  const navLinkSpanClass = "absolute inset-x-0 bottom-0 h-0.5 bg-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md"
          : "bg-white dark:bg-gray-900"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with updated gradient */}
          <Link href="/" className="font-bold text-xl transition-transform hover:translate-y-[-2px] flex items-center">
            <span className="bg-gradient-to-r from-pink-500 to-pink-700 text-transparent bg-clip-text">EDUKAN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className={navLinkClass}>
              Home
              <span className={navLinkSpanClass}></span>
            </Link>
            <Link href="/product" className={navLinkClass}>
              Shop
              <span className={navLinkSpanClass}></span>
            </Link>

            <Link href="/about" className={navLinkClass}>
              About
              <span className={navLinkSpanClass}></span>
            </Link>
            <Link href="/contact" className={navLinkClass}>
              Contact
              <span className={navLinkSpanClass}></span>
            </Link>
          </nav>

          {/* Search Bar with updated styling */}
          <div className="hidden md:flex relative w-1/3" ref={searchRef}>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-pink-200 dark:border-pink-800 focus-visible:ring-pink-300/30 dark:focus-visible:ring-pink-700/30"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 dark:text-pink-300 h-4 w-4" />
            </div>

            {/* Search Suggestions with updated colors */}
            {showSuggestions && (
              <div className="absolute top-full mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-pink-100 dark:border-pink-900 z-10 animate-in fade-in-50 slide-in-from-top-5">
                <div className="p-2 text-xs text-pink-500 dark:text-pink-300">Suggested searches</div>
                <ul className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-pink-50 dark:hover:bg-pink-900/20 cursor-pointer flex justify-between items-center"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span>{suggestion.text}</span>
                      <Badge variant="outline" className="text-xs bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-300 border-pink-200 dark:border-pink-800">
                        {suggestion.category}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side Icons with updated colors */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile menu button - Moved to be aligned with other icons */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {/* Theme Toggle - Simplified to direct button for reliability */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleTheme}
              >
                {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}

            {/* Wishlist - Hidden on mobile */}
            <Link
              href="/dashboard"
              className="h-10 w-10 rounded-full relative hidden md:flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/dashboard" // or your target page
              className="h-10 w-10 rounded-full relative hidden md:flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Account - Hidden on mobile */}
            <Link
              href="/dashboard"
              variant="ghost"
              size="icon"
              className="hidden md:flex items-center justify-center rounded-full"
            >
              <User size={20} />
            </Link>


            {/* Login/Signup */}
            <Link
              href="/login"
              className="rounded-full hidden md:flex bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-4 py-2 text-sm items-center justify-center"
            >
              Login / Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu with updated styling */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border animate-in slide-in-from-top-5">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border-primary/20"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>

              {/* Mobile Navigation - Individual links instead of map */}
              <nav className="flex flex-col space-y-1">
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/product"
                  className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>

                <Link
                  href="/about"
                  className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                  <Heart size={16} className="mr-2" />
                  Wishlist
                </Button>
                <Link
                  href="/admin"
                  className="flex items-center flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                  <User size={16} className="mr-2" />
                  Account
                </Link>

              </div>

              {/* Login/Signup Button */}
              <Link
                href="/login" // or your desired route
                className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white text-center py-2 px-4 block"
              >
                Login / Signup
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}