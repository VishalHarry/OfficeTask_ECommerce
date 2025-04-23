// This is a mock data generator for the product listing page
// In a real application, this would be replaced with API calls

export function generateProducts(count = 20) {
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books", "Beauty", "Sports"]
  const subcategories = {
    Electronics: ["Smartphones", "Laptops", "Audio", "Cameras", "Accessories"],
    Clothing: ["Men", "Women", "Kids", "Footwear", "Accessories"],
    "Home & Kitchen": ["Furniture", "Cookware", "Decor", "Bedding", "Storage"],
    Books: ["Fiction", "Non-fiction", "Academic", "Children", "Comics"],
    Beauty: ["Skincare", "Makeup", "Haircare", "Fragrance", "Tools"],
    Sports: ["Fitness", "Outdoor", "Team Sports", "Cycling", "Swimming"],
  }

  const tags = ["new", "bestseller", "sale", "limited", "exclusive"]

  const products = []

  for (let i = 1; i <= count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const subcategory = subcategories[category][Math.floor(Math.random() * subcategories[category].length)]

    const price = Math.floor(Math.random() * 9900) + 100 // Price between 100 and 10000
    const hasDiscount = Math.random() > 0.5
    const originalPrice = hasDiscount ? price + Math.floor(price * (Math.random() * 0.5 + 0.1)) : null

    const randomTags = []
    if (Math.random() > 0.7) randomTags.push(tags[Math.floor(Math.random() * tags.length)])
    if (Math.random() > 0.8 && randomTags.length === 0) randomTags.push(tags[Math.floor(Math.random() * tags.length)])

    const daysAgo = Math.floor(Math.random() * 100)
    const date = new Date()
    date.setDate(date.getDate() - daysAgo)

    products.push({
      id: `prod-${i}`,
      name: `${category} ${subcategory} Product ${i}`,
      description: `This is a high-quality ${subcategory.toLowerCase()} product in the ${category.toLowerCase()} category.`,
      price,
      originalPrice,
      category,
      subcategory,
      rating: Math.random() * 3 + 2, // Rating between 2 and 5
      ratingCount: Math.floor(Math.random() * 500) + 5,
      inStock: Math.random() > 0.2,
      popularity: Math.floor(Math.random() * 100),
      tags: randomTags,
      image: `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(subcategory)}`,
      createdAt: date.toISOString(),
      images: [
        `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(subcategory + " 1")}`,
        `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(subcategory + " 2")}`,
        `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(subcategory + " 3")}`,
        `/placeholder.svg?height=600&width=600&text=${encodeURIComponent(subcategory + " 4")}`,
      ],
      colors: ["Red", "Blue", "Black", "White"].slice(0, Math.floor(Math.random() * 4) + 1),
      sizes: ["S", "M", "L", "XL"].slice(0, Math.floor(Math.random() * 4) + 1),
      specifications: {
        Material: ["Cotton", "Polyester", "Leather", "Metal", "Plastic"][Math.floor(Math.random() * 5)],
        Weight: `${(Math.random() * 5).toFixed(2)} kg`,
        Dimensions: `${Math.floor(Math.random() * 50) + 10}cm x ${Math.floor(Math.random() * 50) + 10}cm x ${Math.floor(Math.random() * 20) + 5}cm`,
        Warranty: `${Math.floor(Math.random() * 24) + 6} months`,
      },
      reviews: Array(Math.floor(Math.random() * 10) + 2)
        .fill()
        .map((_, i) => ({
          id: `review-${i}`,
          user: `User${Math.floor(Math.random() * 1000)}`,
          rating: Math.floor(Math.random() * 5) + 1,
          comment: `This is review ${i + 1} for this product. ${Math.random() > 0.5 ? "I really liked it!" : "It was okay, but could be better."}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        })),
    })
  }

  return products
}

export function getProductById(id) {
  // In a real app, this would fetch from an API
  // For demo purposes, we'll generate a single product
  const products = generateProducts(50)
  const product = products.find((p) => p.id === id) || products[0]

  // Ensure the first product has the requested ID
  product.id = id

  return Promise.resolve(product)
}

export function getRelatedProducts(category) {
  // In a real app, this would fetch related products from an API
  // For demo purposes, we'll generate some products
  const products = generateProducts(8)

  // Set the category for all products
  products.forEach((product) => {
    product.category = category
  })

  return Promise.resolve(products)
}
