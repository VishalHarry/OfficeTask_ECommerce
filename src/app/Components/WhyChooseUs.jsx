"use client"

import { Shield, Leaf, Heart, Wind } from "lucide-react"
import { motion } from "framer-motion"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "100% Rash-Free Protection",
      description: "Gentle on your skin, tough on leaks",
      gradient: "from-pink-100 to-pink-200",
    },
    {
      icon: Leaf,
      title: "Plant-Based & Eco-Friendly",
      description: "Sustainable materials, better for the planet",
      gradient: "from-green-100 to-green-200",
    },
    {
      icon: Heart,
      title: "Dermatologist Approved",
      description: "Clinically tested for sensitive skin",
      gradient: "from-purple-100 to-purple-200",
    },
    {
      icon: Wind,
      title: "Ultra Absorbent & Breathable",
      description: "Maximum comfort, all day long",
      gradient: "from-blue-100 to-blue-200",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-pink-950 mb-4">
            Why Choose Us
          </h2>
          <p className="text-pink-700/80 max-w-2xl mx-auto">
            Experience the difference with our premium feminine care products
          </p>
        </div> */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`bg-gradient-to-br ${feature.gradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}