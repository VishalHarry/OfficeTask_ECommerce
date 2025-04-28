"use client"

import { useState, useEffect, Suspense } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Store,
  ShoppingCart,
  Settings,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  Search,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Sales Analysis", href: "/admin/sales", icon: BarChart3 },

    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  return (
    <div >
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
          <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-muted">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
              EDUKAN
            </span>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Admin</span>
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-md hover:bg-muted relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-72 bg-background border-r border-border p-4 transition-transform duration-200 ease-in-out",
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                  EDUKAN
                </span>
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Admin</span>
              </div>
              <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-muted">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                      isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold text-primary">JS</span>
                  </div>
                  <div>
                    <div className="font-medium">Vishal Tomar</div>
                    <div className="text-xs text-muted-foreground">Store Admin</div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside
            className={cn(
              "hidden lg:block border-r border-border bg-background transition-all duration-300 ease-in-out",
              isSidebarOpen ? "w-64" : "w-20",
            )}
          >
            <div className="h-full flex flex-col">
              <div
                className={cn(
                  "flex items-center h-16 px-4 border-b border-border",
                  isSidebarOpen ? "justify-between" : "justify-center",
                )}
              >
                {isSidebarOpen ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-600 text-transparent bg-clip-text">
                        EDUKAN
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Admin</span>
                    </div>
                    <button onClick={toggleSidebar} className="p-1.5 rounded-md hover:bg-muted">
                      <ChevronDown className="h-4 w-4 transform rotate-90" />
                    </button>
                  </>
                ) : (
                  <button onClick={toggleSidebar} className="p-1.5 rounded-md hover:bg-muted">
                    <ChevronDown className="h-4 w-4 transform -rotate-90" />
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-2">
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors",
                          isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                          !isSidebarOpen && "justify-center px-2",
                        )}
                      >
                        <Icon size={20} />
                        {isSidebarOpen && <span>{item.name}</span>}
                      </Link>
                    )
                  })}
                </nav>
              </div>

              <div className={cn("p-4 border-t border-border", !isSidebarOpen && "flex justify-center")}>
                {isSidebarOpen ? (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-semibold text-primary">JS</span>
                      </div>
                      <div>
                        <div className="font-medium">Vishal Tomar</div>
                        <div className="text-xs text-muted-foreground">Store Admin</div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm flex items-center justify-between",
                        
                      )}
                    >
                     
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold text-primary">JS</span>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Top Header */}
            <header className="h-16 border-b border-border bg-background flex items-center justify-between px-4 lg:px-6">
              <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-muted lg:hidden">
                  <Menu size={20} />
                </button>
                <div className="relative hidden sm:block">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="pl-8 h-9 w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-md hover:bg-muted relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-md hover:bg-muted"
                  >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                  </button>
                )}
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-semibold text-xs text-primary">VT</span>
                  </div>
                  <span className="font-medium text-sm">Vishal Tomar</span>
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto p-4 lg:p-6">
              <Suspense>{children}</Suspense>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
