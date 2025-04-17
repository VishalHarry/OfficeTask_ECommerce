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

  // Define common link class for reuse
  const navLinkClass = "relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group";
  const navLinkSpanClass = "absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left";

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-background",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl transition-transform hover:translate-y-[-2px] flex items-center">
            <span className="bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">EDUKAN</span>
          </Link>

          {/* Desktop Navigation - Individual links instead of using map */}
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

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-1/3" ref={searchRef}>
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border-primary/20 focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full mt-1 w-full bg-background rounded-lg shadow-lg border border-border z-10 animate-in fade-in-50 slide-in-from-top-5">
                <div className="p-2 text-xs text-muted-foreground">Suggested searches</div>
                <ul className="py-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span>{suggestion.text}</span>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.category}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side Icons including mobile menu button */}
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
            <Button variant="ghost" size="icon" className="rounded-full relative hidden md:flex">
              <Heart size={20} />
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="rounded-full relative hidden md:flex">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Account - Hidden on mobile */}
            <Button variant="ghost" size="icon" className="rounded-full hidden md:flex">
              <User size={20} />
            </Button>

            {/* Login/Signup */}
            <Link
              href="/login"
              className="rounded-full hidden md:flex bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 px-4 py-2 text-sm items-center justify-center"
            >
              Login / Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                href="/home"
                className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="text-foreground/80 hover:text-foreground py-3 px-4 rounded-lg hover:bg-muted flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
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
              <Button variant="outline" size="sm" className="flex-1 rounded-lg">
                <User size={16} className="mr-2" />
                Account
              </Button>
            </div>

            {/* Login/Signup Button */}
            <Link 
            href="/"
            className="w-full rounded-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
              Login / Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}