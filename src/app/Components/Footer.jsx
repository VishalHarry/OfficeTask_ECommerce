import Link from "next/link"
import { Facebook, Instagram, Mountain, Twitter, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-muted mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Mountain className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                SHOPIFY
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Discover the latest trends and high-quality products for your lifestyle. Shop with confidence.
            </p>

            <div className="flex space-x-3 mt-6">
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {["New Arrivals", "Best Sellers", "Trending", "Clothing", "Accessories", "Footwear"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Contact", "FAQ", "Privacy Policy", "Terms & Conditions", "Shipping Information"].map(
                (item) => (
                  <li key={item}>
                    <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Download Our App</h3>
            <p className="text-muted-foreground mb-4">Shop on the go with our mobile app</p>
            <div className="flex space-x-2 mb-6">
              <Link href="#" className="bg-black text-white px-4 py-2 rounded-lg text-xs flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5,2H8.5C6.5,2,5,3.5,5,5.5v13C5,20.5,6.5,22,8.5,22h9c2,0,3.5-1.5,3.5-3.5v-13C21,3.5,19.5,2,17.5,2z M13,20.5h-2v-1h2V20.5z M18,17.5H8V5h10V17.5z" />
                </svg>
                App Store
              </Link>
              <Link href="#" className="bg-black text-white px-4 py-2 rounded-lg text-xs flex items-center">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5,20.5c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h-3V20.5z M7.5,20.5c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h-3V20.5z M11.5,20.5c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h-3V20.5z M15.5,20.5c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h-3V20.5z M19.5,20.5c0,0.6,0.4,1,1,1h1c0.6,0,1-0.4,1-1v-1h-3V20.5z M21.5,3.5c0-0.6-0.4-1-1-1h-17c-0.6,0-1,0.4-1,1v14h19V3.5z M12,15.5c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,15.5,12,15.5z M12,5.5c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S14.2,5.5,12,5.5z" />
                </svg>
                Google Play
              </Link>
            </div>

            <h3 className="font-semibold text-lg mb-2">Customer Support</h3>
            <p className="text-muted-foreground mb-2">Need help? Contact our support team</p>
            <Link href="mailto:support@shopify.com" className="text-primary hover:underline">
              support@shopify.com
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SHOPIFY. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
