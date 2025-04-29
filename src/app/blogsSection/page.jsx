"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, ArrowRight, Heart, BookOpen, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const allBlogs = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle: A Complete Guide",
    excerpt: "Learn about the different phases of your menstrual cycle and how to take care of yourself during each phase.",
    image: "https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg?s=2048x2048&w=is&k=20&c=ZJ9N53u1UraENRUEPx8GG7qBbeFhdafz5aPxnn3qO3s=",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Health & Wellness"
  },
  {
    id: 2,
    title: "Sustainable Period Products: Making the Switch",
    excerpt: "Discover eco-friendly alternatives to traditional period products and their impact on the environment.",
    image: "https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg?s=2048x2048&w=is&k=20&c=ZJ9N53u1UraENRUEPx8GG7qBbeFhdafz5aPxnn3qO3s=",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Sustainability"
  },
  {
    id: 3,
    title: "Breaking Taboos: Let's Talk About Periods",
    excerpt: "Join the conversation about menstrual health and breaking down societal stigmas around periods.",
    image: "https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg?s=2048x2048&w=is&k=20&c=ZJ9N53u1UraENRUEPx8GG7qBbeFhdafz5aPxnn3qO3s=",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Social Impact"
  }
]

export default function BlogsSection() {
  const [activeFilter, setActiveFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [isHoveredId, setIsHoveredId] = useState(null)
  const [email, setEmail] = useState("")

  const categories = ["All", "Health & Wellness", "Sustainability", "Social Impact", "Nutrition", "Technology"]

  useEffect(() => {
    let results = allBlogs

    if (activeFilter !== "All") {
      results = results.filter(blog => blog.category === activeFilter)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query)
      )
    }

    setFilteredBlogs(results)
  }, [activeFilter, searchQuery])

  const handleSubscribe = (e) => {
    e.preventDefault()
    alert(`Thank you for subscribing with ${email}!`)
    setEmail("")
  }

  const FeaturedBlog = ({ blog }) => (
    <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl overflow-hidden border border-pink-100 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="relative h-64 md:h-full">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20" />
          <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-1 rounded-full font-medium text-sm">
            Featured Post
          </div>
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-pink-100 text-pink-700 text-xs px-3 py-1 rounded-full font-medium">
              {blog.category}
            </span>
            <div className="flex items-center text-pink-500 text-sm">
              <Heart size={14} className="mr-1 fill-pink-500" />
              {blog.likes}
            </div>
          </div>

          <h3 className="font-serif text-2xl md:text-3xl font-bold text-pink-950 mb-3">
            {blog.title}
          </h3>

          <p className="text-pink-600/80 mb-6">
            {blog.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm text-pink-600/70 mb-6">
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {blog.date}
            </div>
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {blog.readTime}
            </div>
          </div>

          <Link
            href={`/blog/${blog.id}`}
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group"
          >
            Read Full Article
            <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-pink-950 mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-pink-600/70 max-w-2xl mx-auto">
            Stay informed with the latest articles on menstrual health, sustainability, and wellness.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === category
                    ? "bg-pink-600 text-white"
                    : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured and Regular Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredBlogs.map((blog, index) =>
            blog.featured && index === 0 ? (
              <FeaturedBlog key={blog.id} blog={blog} />
            ) : (
              <article
                key={blog.id}
                className="bg-white rounded-2xl overflow-hidden border border-pink-100 hover:shadow-lg hover:shadow-pink-100/50 transition-all duration-300 group"
                onMouseEnter={() => setIsHoveredId(blog.id)}
                onMouseLeave={() => setIsHoveredId(null)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-pink-600/90 text-white text-xs px-3 py-1.5 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4 text-sm text-pink-600/70">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {blog.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                    <div className="flex items-center text-pink-500">
                      <Heart
                        size={16}
                        className={`mr-1 transition-colors ${
                          isHoveredId === blog.id ? "fill-pink-500" : ""
                        }`}
                      />
                      {blog.likes}
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl text-pink-950 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-pink-600/70 mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <Link
                    href={`/blog/${blog.id}`}
                    className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium group/link"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </article>
            )
          )}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-pink-950 mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-pink-600/70 mb-6">
              Get the latest articles and insights about menstrual health delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-full border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-pink-600 text-white font-medium hover:bg-pink-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}