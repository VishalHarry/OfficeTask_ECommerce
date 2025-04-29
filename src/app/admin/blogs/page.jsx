"use client"

import { useState } from "react"
import { Edit, Trash2, Plus, X, Upload } from "lucide-react"
import Image from "next/image"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([
    {
      id: 2,
      title: "Sustainable Period Products: Making the Switch",
      excerpt: "Discover eco-friendly alternatives to traditional period products and their impact on the environment.",
      image: "https://media.istockphoto.com/id/1521121093/photo/young-indian-woman-holding-sanitary-pad-in-hand-standing-with-other-traditional-women.jpg",
      date: "March 10, 2024",
      readTime: "4 min read",
      category: "Sustainability",
      status: "published"
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingBlog, setEditingBlog] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    image: "",
    readTime: "",
    category: "Sustainability",
    status: "draft"
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingBlog) {
      // Update existing blog
      setBlogs(blogs.map(blog => 
        blog.id === editingBlog.id 
          ? { ...formData, id: blog.id, date: blog.date }
          : blog
      ))
    } else {
      // Add new blog
      const currentDate = new Date()
      const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
      
      setBlogs([...blogs, {
        ...formData,
        id: blogs.length + 1,
        date: formattedDate
      }])
    }
    handleCloseForm()
  }

  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingBlog(null)
    setSelectedImage(null)
    setImagePreview("")
    setFormData({
      title: "",
      excerpt: "",
      image: "",
      readTime: "",
      category: "Sustainability",
      status: "draft"
    })
  }

  const handleDelete = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-pink-950 dark:text-pink-50">Blog Management</h1>
        <button 
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-pink-950 dark:text-pink-50">
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h2>
                <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Sustainability">Sustainability</option>
                    <option value="Health & Wellness">Health & Wellness</option>
                    <option value="Education">Education</option>
                    <option value="Social Impact">Social Impact</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Blog Image</label>
                  <div className="mt-1 flex flex-col items-center space-y-2">
                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-gray-700 text-pink-600 dark:text-pink-400 rounded-lg shadow-lg tracking-wide border border-pink-400 dark:border-pink-600 cursor-pointer hover:bg-pink-50 dark:hover:bg-pink-900/20">
                      <Upload className="w-8 h-8" />
                      <span className="mt-2 text-base">Select Image</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={!editingBlog}
                      />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null)
                            setImagePreview("")
                            setFormData(prev => ({ ...prev, image: "" }))
                          }}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    placeholder="e.g. 4 min read"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 rounded-md"
                  >
                    {editingBlog ? 'Update Post' : 'Create Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Blog List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-pink-100 dark:border-pink-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Read Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-pink-600 dark:text-pink-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100 dark:divide-pink-800">
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{blog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{blog.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{blog.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{blog.readTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      blog.status === 'published' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}