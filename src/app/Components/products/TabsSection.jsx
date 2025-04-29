"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/useMediaQuery"


export default function TabsSection({ product }) {
  const [activeAccordion, setActiveAccordion] = useState("description")
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  if (isMobile) {
    return (
      <div className="border rounded-lg divide-y">
        {/* Description Accordion */}
        <AccordionItem
          title="Description"
          isActive={activeAccordion === "description"}
          onClick={() => toggleAccordion("description")}
        >
          <div className="prose prose-sm max-w-none">
            <p>{product.description}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
            </p>
          </div>
        </AccordionItem>

        {/* Specifications Accordion */}
        <AccordionItem
          title="Specifications"
          isActive={activeAccordion === "specifications"}
          onClick={() => toggleAccordion("specifications")}
        >
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(product.specifications || {}).map(([key, value]) => (
              <div key={key} className="grid grid-cols-2 py-2 border-b last:border-0">
                <div className="font-medium text-muted-foreground">{key}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>
        </AccordionItem>

        {/* Reviews Accordion */}
        <AccordionItem
          title={`Reviews (${product.reviews?.length || 0})`}
          isActive={activeAccordion === "reviews"}
          onClick={() => toggleAccordion("reviews")}
        >
          <ReviewsContent product={product} />
        </AccordionItem>

        {/* FAQs Accordion */}
        <AccordionItem title="FAQs" isActive={activeAccordion === "faqs"} onClick={() => toggleAccordion("faqs")}>
          <FAQsContent />
        </AccordionItem>

        {/* Shipping & Returns Accordion */}
        <AccordionItem
          title="Shipping & Returns"
          isActive={activeAccordion === "shipping"}
          onClick={() => toggleAccordion("shipping")}
        >
          <ShippingContent />
        </AccordionItem>
      </div>
    )
  }

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid grid-cols-5 w-full bg-pink-50 dark:bg-pink-900/20">
        <TabsTrigger value="description" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Description</TabsTrigger>
        <TabsTrigger value="specifications" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Specifications</TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Reviews ({product.reviews?.length || 0})</TabsTrigger>
        <TabsTrigger value="faqs" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">FAQs</TabsTrigger>
        <TabsTrigger value="shipping" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">Shipping & Returns</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose prose-sm max-w-none">
          <p>{product.description}</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications || {}).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2 py-2 border-b">
              <div className="font-medium text-muted-foreground">{key}</div>
              <div>{value}</div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <ReviewsContent product={product} />
      </TabsContent>

      <TabsContent value="faqs" className="mt-6">
        <FAQsContent />
      </TabsContent>

      <TabsContent value="shipping" className="mt-6">
        <ShippingContent />
      </TabsContent>
    </Tabs>
  )
}

function AccordionItem({ title, isActive, onClick, children }) {
  return (
    <div>
      <button
        className="flex items-center justify-between w-full p-4 text-left font-medium"
        onClick={onClick}
        aria-expanded={isActive}
      >
        {title}
        {isActive ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div className={cn("px-4 pb-4", isActive ? "block" : "hidden")}>{children}</div>
    </div>
  )
}

function ReviewsContent({ product }) {
  // Calculate average rating
  const reviews = product.reviews || []
  const avgRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  // Count ratings by star
  const ratingCounts = Array(5)
    .fill(0)
    .map((_, i) => reviews.filter((review) => review.rating === i + 1).length)

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
          <div className="text-4xl font-bold">{avgRating.toFixed(1)}</div>
          <div className="flex mt-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={cn(
                    "transition-colors",
                    i < Math.floor(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                  )}
                />
              ))}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Based on {reviews.length} reviews</div>
        </div>

        <div className="flex-1">
          {/* Rating Bars */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <div className="w-12 text-sm">{star} stars</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${reviews.length ? (ratingCounts[star - 1] / reviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="w-8 text-sm text-right">{ratingCounts[star - 1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Reviews</h3>

        {reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {review.user.charAt(0)}
                    </div>
                    <span className="font-medium">{review.user}</span>
                  </div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={cn(
                            "transition-colors",
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                          )}
                        />
                      ))}
                  </div>
                </div>
                <p className="mt-2 text-sm">{review.comment}</p>
                <div className="mt-2 text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FAQsContent() {
  const [openFaq, setOpenFaq] = useState(null)

  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping may take 7-14 business days depending on the destination.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Some restrictions apply for certain product categories.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Please check the shipping calculator at checkout for specific rates.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
    },
    {
      question: "Are there any warranties on products?",
      answer:
        "Most products come with a manufacturer&apos;s warranty. The warranty period varies by product and brand. Extended warranty options are available for select items at checkout.",
    },
  ]

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg overflow-hidden">
          <button
            className="flex items-center justify-between w-full p-4 text-left font-medium"
            onClick={() => setOpenFaq(openFaq === index ? null : index)}
          >
            {faq.question}
            {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          <div className={cn("px-4 pb-4", openFaq === index ? "block" : "hidden")}>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function ShippingContent() {
  return (
    <div className="space-y-6">
      {/* Shipping Information */}
      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium">Order Processing</h4>
              <p className="text-sm text-muted-foreground">
                Orders are typically processed within 24 hours of being placed, excluding weekends and holidays.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium">Shipping Methods</h4>
              <p className="text-sm text-muted-foreground">
                Standard Shipping (3-5 business days): ₹49 for orders under ₹499, FREE for orders above ₹499
                <br />
                Express Shipping (1-2 business days): ₹99 for all orders
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium">Delivery</h4>
              <p className="text-sm text-muted-foreground">
                You will receive a tracking number once your order ships. All deliveries require a signature upon
                receipt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Return Policy */}
      <div>
        <h3 className="text-lg font-medium mb-4">Return Policy</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium">7-Day Returns</h4>
              <p className="text-sm text-muted-foreground">
                You have 7 days from the date of delivery to initiate a return for most items.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium">Return Conditions</h4>
              <p className="text-sm text-muted-foreground">
                Products must be unused, unworn, unwashed, and in their original packaging with all tags attached.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium">Return Process</h4>
              <p className="text-sm text-muted-foreground">
                Initiate a return through your account dashboard. Once approved, you&apos;ll receive a return shipping label.
                Refunds are processed within 5-7 business days after we receive the returned item.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
