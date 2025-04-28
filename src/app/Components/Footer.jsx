"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Heart } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-pink-50 to-pink-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text mb-4">
              EDUKAN
            </h3>
            <p className="text-pink-700/80 mb-4">
              Providing comfortable and eco-friendly feminine care products for a better period experience.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-pink-950 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-pink-950 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-pink-700/80 hover:text-pink-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-pink-700/80 text-sm mb-4 md:mb-0">
              © 2024 EDUKAN. All rights reserved.
            </p>
            <div className="flex items-center text-pink-700/80 text-sm">
              <span>Made with</span>
              <Heart size={16} className="mx-1 text-pink-600 fill-pink-600" />
              <span>for a better period experience</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
