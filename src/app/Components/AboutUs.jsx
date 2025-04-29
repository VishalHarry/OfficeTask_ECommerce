"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutUs() {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-pink-100/50 px-4 py-2 rounded-full">
              <span className="text-pink-700 text-sm font-medium">Empowering Every Woman</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-950">
              Our Story
            </h2>
            
            <div className="text-lg text-pink-700/80 space-y-4">
              <p>
                At [Your Brand], we believe that every woman deserves a comfortable and worry-free period experience. Our journey began with a simple mission: to create feminine care products that prioritize both your health and the environment.
              </p>
              <p>
                We understand that comfort during your period isn&apos;t just about the products – it&apos;s about feeling confident, supported, and empowered. That&apos;s why we&apos;ve developed our range using the finest organic cotton and innovative technology that ensures maximum protection while being gentle on your skin.
              </p>
              <p>
                Our commitment goes beyond just creating quality products. We&apos;re dedicated to breaking taboos around menstruation and fostering an open, supportive community where every woman feels heard and understood.
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-pink-200/20 rounded-2xl transform -rotate-6" />
            <Image
              src="https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg?s=2048x2048&w=is&k=20&c=ZJ9N53u1UraENRUEPx8GG7qBbeFhdafz5aPxnn3qO3s="
              alt="Our Team and Products"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}