"use client"
import {
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  Truck,
  Settings,
  Bell,
  Gift,
  HelpCircle,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react"

export default function DashboardSidebar({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen, navItems }) {
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white dark:bg-gray-800 z-50 transition-all duration-300 ease-in-out md:hidden border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-semibold text-primary">JS</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-white transition-colors duration-200">John Smith</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">john.smith@example.com</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActivePage(item.id)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg ${
                      activePage === item.id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } transition-colors duration-200`}
                    aria-current={activePage === item.id ? "page" : undefined}
                  >
                    <div className="flex items-center">
                      <Icon size={18} className="mr-3" />
                      <span>{item.label}</span>
                    </div>
                    {activePage === item.id && <ChevronRight size={16} />}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <LogOut size={18} className="mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-semibold text-primary">JS</span>
            </div>
            <div className="ml-3">
              <p className="font-medium text-gray-900 dark:text-white transition-colors duration-200">John Smith</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">john.smith@example.com</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActivePage(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg ${
                      activePage === item.id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    } transition-colors duration-200`}
                    aria-current={activePage === item.id ? "page" : undefined}
                  >
                    <div className="flex items-center">
                      <Icon size={18} className="mr-3" />
                      <span>{item.label}</span>
                    </div>
                    {activePage === item.id && <ChevronRight size={16} />}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <LogOut size={18} className="mr-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}