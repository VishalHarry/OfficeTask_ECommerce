"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Heart, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function BlogArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState(null)
  const [isLiked, setIsLiked] = useState(false)

  // In a real app, you would fetch this from an API
  // For now, we'll use the same data structure as the blog list
  useEffect(() => {
    // Simulating API call with sample data
    const articleData = {
      id: parseInt(params.id),
      title: "Understanding Your Menstrual Cycle: A Complete Guide",
      excerpt: "Learn about the different phases of your menstrual cycle and how to take care of yourself during each phase.",
      content: `
        Understanding your menstrual cycle is crucial for overall health and well-being. Let's dive deep into each phase and what it means for your body.

        The Menstrual Phase (Days 1-5):
        This is when your period begins. During this time, your body sheds the uterine lining built up in the previous cycle. Common symptoms include:
        • Cramping
        • Fatigue
        • Mood changes
        
        The Follicular Phase (Days 1-13):
        This phase overlaps with your period but continues after bleeding stops. Your body prepares to release an egg by:
        • Increasing estrogen levels
        • Building up the uterine lining
        • Developing follicles in the ovaries

        The Ovulatory Phase (Day 14):
        This is when your body releases an egg. You might experience:
        • Increased energy levels
        • Higher body temperature
        • Changes in cervical mucus

        The Luteal Phase (Days 15-28):
        After ovulation, your body prepares for potential pregnancy. If no pregnancy occurs, hormone levels drop and the cycle begins again.

        Tips for Managing Your Cycle:
        1. Track your symptoms
        2. Stay hydrated
        3. Exercise regularly
        4. Get adequate rest
        5. Maintain a balanced diet
      `,
      image: "https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg?s=2048x2048&w=is&k=20&c=ZJ9N53u1UraENRUEPx8GG7qBbeFhdafz5aPxnn3qO3s=",
      date: "March 15, 2024",
      readTime: "5 min read",
      category: "Health & Wellness",
      likes: 156,
      author: {
        name: "Dr. Sarah Johnson",
        role: "Women's Health Expert",
        image: "/images/author-avatar.jpg"
      }
    }

    setArticle(articleData)
  }, [params.id])

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    )
  }

  return (
    <article className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/blogsSection"
          className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium mb-8 group"
        >
          <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Back to Articles
        </Link>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="bg-pink-100 text-pink-700 text-sm px-4 py-1.5 rounded-full font-medium">
              {article.category}
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center text-pink-500 text-sm hover:text-pink-600 transition-colors"
            >
              <Heart
                size={16}
                className={`mr-1 transition-colors ${isLiked ? "fill-pink-500" : ""}`}
              />
              {article.likes + (isLiked ? 1 : 0)}
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-pink-950 mb-6">
            {article.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm text-pink-600/70">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {article.date}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {article.readTime}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-[400px] md:h-[600px] max-w-5xl mx-auto mb-12 rounded-3xl overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Author Info */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-4 border-b border-pink-100 pb-6">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={article.author.image}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-pink-950">{article.author.name}</h3>
              <p className="text-sm text-pink-600/70">{article.author.role}</p>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-3xl mx-auto prose prose-pink">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-pink-800/90 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        {/* Share and Navigation */}
        <div className="max-w-3xl mx-auto mt-12 pt-6 border-t border-pink-100">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <Heart className={isLiked ? "fill-pink-600" : ""} size={20} />
              {isLiked ? "Liked" : "Like"} this article
            </button>
            <Link
              href="/blogsSection"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}