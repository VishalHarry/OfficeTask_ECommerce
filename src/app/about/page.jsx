
"use client"

import { Heart, Shield, Leaf, Users, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-950 mb-4">About Us</h1>
        <p className="text-lg text-pink-600/70 max-w-2xl mx-auto">
          Empowering women through comfort, care, and sustainable feminine hygiene solutions.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-8 border border-pink-100 dark:border-pink-800">
          <h2 className="text-2xl font-bold text-pink-950 dark:text-pink-100 mb-4">Our Mission</h2>
          <p className="text-pink-600/70 dark:text-pink-300/70">
            To provide high-quality, eco-friendly feminine care products that prioritize both personal comfort and
            environmental sustainability, ensuring every woman has access to safe and reliable menstrual care solutions.
          </p>
        </div>
        <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-8 border border-pink-100 dark:border-pink-800">
          <h2 className="text-2xl font-bold text-pink-950 dark:text-pink-100 mb-4">Our Vision</h2>
          <p className="text-pink-600/70 dark:text-pink-300/70">
            To revolutionize feminine care by creating innovative, sustainable products while breaking taboos and
            promoting menstrual health education worldwide.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-pink-950 dark:text-pink-100 text-center mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Heart,
              title: "Care & Comfort",
              description: "Prioritizing your comfort and well-being with premium quality products."
            },
            {
              icon: Shield,
              title: "Safety First",
              description: "Rigorous testing and quality control for your peace of mind."
            },
            {
              icon: Leaf,
              title: "Sustainability",
              description: "Eco-friendly products and packaging to protect our planet."
            },
            {
              icon: Globe,
              title: "Accessibility",
              description: "Making quality feminine care accessible to all."
            }
          ].map((value, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center">
                <value.icon className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-pink-950 dark:text-pink-100 mb-2">{value.title}</h3>
              <p className="text-pink-600/70 dark:text-pink-300/70">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-pink-950 dark:text-pink-100 text-center mb-12">Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              image: "https://imgs.search.brave.com/NY4pkhHb3WWCSbaCSPddGk-UQVcTbc9JKUCvPpzllVg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/dXNpbmVzcy1vd25l/ci13b3JraW5nLXRo/ZWlyLXN0cmF0ZWd5/XzIzLTIxNDkyNDEz/MTguanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA"
            },
            {
              name: "Dr. Emily Chen",
              role: "Product Development Head",
              image: "https://imgs.search.brave.com/Ncpm9NKsiST09aV1tpDr73N9AkgBF7h6R7uTYLm-clM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDc5/Mzc4Nzk4L3Bob3Rv/L3BvcnRyYWl0LW9m/LWZlbWFsZS1kb2N0/b3IuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVAtVzhLU0pC/WWhZajJSU3gxWmhm/ZjZGQ0d2dFJEQzNB/QXpveDhkZU1tZXc9"
            },
            {
              name: "Lisa Patel",
              role: "Sustainability Director",
              image: "https://imgs.search.brave.com/9X0EkCvobAXSpcJ1QCRwynYYVj7vbAj_0stvPy0cMqg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM1/NjM4NjI5Ny9waG90/by9wb3J0cmFpdC1v/Zi1hLW1pZC1hZHVs/dC13b21hbi1hdC13/b3JrLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1VeGxIdGIy/X1pxVmlPNmZvNWpi/ODJITndVRzVFLUdu/elJxdkRBYXdPVGI4/PQ"
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-pink-100 dark:bg-pink-900/20">
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  width={500} // You can adjust these
                  height={500}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-xl font-semibold text-pink-950 dark:text-pink-100 mb-1">{member.name}</h3>
              <p className="text-pink-600/70 dark:text-pink-300/70">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-12 border border-pink-100 dark:border-pink-800">
        <h2 className="text-3xl font-bold text-pink-950 dark:text-pink-100 mb-4">Get in Touch</h2>
        <p className="text-pink-600/70 dark:text-pink-300/70 mb-6">
          Have questions or feedback? We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
