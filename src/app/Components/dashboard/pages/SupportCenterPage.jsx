"use client"

import { useState, useEffect } from "react"
import { MessageSquare, FileText, Phone, Send, ExternalLink } from "lucide-react"

export default function SupportCenterPage() {
  const [mounted, setMounted] = useState(false)
  
  // Use useEffect to handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
    name: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLiveChatOpen, setIsLiveChatOpen] = useState(false)

  // Mock FAQ data
  const faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by going to the Order History section in your account dashboard. Click on the specific order and you'll find the tracking information there.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Some exceptions apply for certain product categories.",
    },
    {
      question: "How do I change my shipping address?",
      answer:
        "You can update your shipping address in the Shipping & Payment section of your account. For orders that have already been placed, please contact customer support immediately.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the shipping options during checkout.",
    },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm({
      ...contactForm,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setContactForm({
        subject: "",
        message: "",
        email: "",
        name: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Help Center Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white transition-colors duration-300">Support Center</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all dark:bg-gray-800 dark:text-white">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText size={24} />
              </div>
              <h3 className="font-medium mb-2">Help Articles</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">Browse our knowledge base for answers to common questions</p>
              <a href="#" className="text-primary hover:underline inline-flex items-center">
                View Help Center
                <ExternalLink size={14} className="ml-1" />
              </a>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all dark:bg-gray-800 dark:text-white">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare size={24} />
              </div>
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">Chat with our support team for immediate assistance</p>
              <button
                onClick={() => setIsLiveChatOpen(true)}
                className="text-primary hover:underline inline-flex items-center"
              >
                Start Chat
                <MessageSquare size={14} className="ml-1" />
              </button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center hover:border-primary hover:shadow-md transition-all dark:bg-gray-800 dark:text-white">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone size={24} />
              </div>
              <h3 className="font-medium mb-2">Call Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 transition-colors duration-300">Speak directly with our customer service team</p>
              <a href="tel:+18001234567" className="text-primary hover:underline inline-flex items-center">
                1-800-123-4567
                <Phone size={14} className="ml-1" />
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white transition-colors duration-300">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-900 dark:text-white">
                    <span className="font-medium">{faq.question}</span>
                    <span className="transition-transform group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-4 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 transition-colors duration-300">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white transition-colors duration-300">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
            Can't find what you're looking for? Send us a message and we'll get back to you as soon as possible.
          </p>

          {isSubmitted ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg p-4 mb-6 transition-colors duration-300">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <div>
                  <h3 className="font-medium">Message Sent!</h3>
                  <p className="text-sm">Thank you for contacting us. We'll respond to your inquiry shortly.</p>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Live Chat Modal */}
      {isLiveChatOpen && mounted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full h-[500px] flex flex-col animate-fade-in transition-colors duration-300">
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h3 className="font-medium">Live Chat Support</h3>
              </div>
              <button
                onClick={() => setIsLiveChatOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <div className="flex flex-col space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-2 flex-shrink-0">
                    <span className="text-sm font-semibold">CS</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm max-w-[80%] text-gray-900 dark:text-white transition-colors duration-300">
                    <p className="text-sm">Hello! Welcome to our support chat. How can I help you today?</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block transition-colors duration-300">10:30 AM</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                />
                <button className="px-4 py-2 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}