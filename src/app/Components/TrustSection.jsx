"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://imgs.search.brave.com/IWDG_BAcwyiEU7wWC9IyPXv5dlxTUjuacphRIOTDAow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9waG90/b3N6b25lLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvZ2lybC1k/cC1waG90bzEyLmpw/Zw",
    review: "These pads are incredibly soft and comfortable. I love how they're eco-friendly too! Best decision I've made for my monthly care.",
    rating: 5,
    role: "Verified Buyer"
  },
  {
    id: 2,
    name: "Emily Chen",
    avatar: "https://imgs.search.brave.com/mANU7E6Nl5kkEMd5aPHKRaujW7xVWsIMlPuh220gXNc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9wb3J0cmFpdC1n/aXJsLXdpbnRlci1j/b2F0LXN0YW5kaW5n/LWFtaWRzdC1mb3Jl/c3RfMTA0ODk0NC04/NTI3NDQ3LmpwZz9z/ZW10PWFpc19oeWJy/aWQmdz03NDA",
    review: "Finally found pads that don't cause irritation! The overnight protection is amazing, and I feel confident throughout my cycle.",
    rating: 5,
    role: "Regular Customer"
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://imgs.search.brave.com/7ozfl20ClEBsauRzrmMSFJd6nZ60RudPivfaz2gjYM4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/b2Rlcm4tY2l0eS1w/YXBlci1wcmV0dHkt/d2Fsa2luZy1jYXN1/YWxfMTMwMy0zMjUy/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA",
    review: "The breathable design makes such a difference. These are the most comfortable pads I've ever used. Highly recommend!",
    rating: 4,
    role: "Verified Buyer"
  }
]

export default function TestimonialsSection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          testimonials.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 200)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.disconnect()
      }
    }
  }, [])

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={cn(
          "h-4 w-4",
          index < rating 
            ? "fill-pink-400 text-pink-400" 
            : "fill-gray-200 text-gray-200"
        )}
      />
    ))
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-pink-950 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-pink-700/80 max-w-2xl mx-auto">
            Real experiences from real customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleItems.includes(index)

            return (
              <div
                key={testimonial.id}
                className={cn(
                  "bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300",
                  "transform opacity-0 translate-y-8",
                  isVisible && "opacity-100 translate-y-0"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-pink-950">{testimonial.name}</h3>
                    <p className="text-sm text-pink-600">{testimonial.role}</p>
                  </div>
                </div>

                <p className="italic text-gray-600 mb-4 line-clamp-3">
                  "{testimonial.review}"
                </p>

                <div className="flex gap-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
