// Helper function to generate random products
export function generateProducts(count = 20) {
    const categories = ["clothing", "electronics", "furniture", "books", "beauty"]
    const tags = ["new", "bestseller", "clearance", "limited", "sale"]
  
    return Array(count)
      .fill(0)
      .map((_, index) => {
        const id = index + 1
        const category = categories[Math.floor(Math.random() * categories.length)]
        const price = Math.floor(Math.random() * 9900) + 100 // Between 100 and 10000
        const hasDiscount = Math.random() > 0.5
        const originalPrice = hasDiscount ? Math.floor(price * (1 + Math.random() * 0.5)) : null
        const rating = (Math.random() * 4 + 1).toFixed(1)
        const ratingCount = Math.floor(Math.random() * 500) + 1
        const inStock = Math.random() > 0.2
  
        // Randomly assign 0-2 tags
        const productTags = []
        const tagCount = Math.floor(Math.random() * 3)
        for (let i = 0; i < tagCount; i++) {
          const randomTag = tags[Math.floor(Math.random() * tags.length)]
          if (!productTags.includes(randomTag)) {
            productTags.push(randomTag)
          }
        }
  
        return {
          id,
          name: getProductName(category, id),
          description: getProductDescription(category),
          category,
          price,
          originalPrice,
          image: `/placeholder.svg?height=300&width=300&text=Product+${id}`,
          rating: Number.parseFloat(rating),
          ratingCount,
          inStock,
          tags: productTags,
          popularity: Math.floor(Math.random() * 100),
          createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
        }
      })
  }
  
  function getProductName(category, id) {
    const adjectives = ["Premium", "Deluxe", "Essential", "Classic", "Modern", "Elegant", "Professional", "Luxury"]
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  
    const categoryNames = {
      clothing: ["T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", "Hoodie", "Shirt", "Skirt"],
      electronics: ["Smartphone", "Headphones", "Laptop", "Tablet", "Camera", "Speaker", "Smartwatch", "TV"],
      furniture: ["Chair", "Table", "Sofa", "Bed", "Desk", "Bookshelf", "Cabinet", "Dresser"],
      books: [
        "Novel",
        "Cookbook",
        "Biography",
        "Self-Help Book",
        "History Book",
        "Science Book",
        "Fiction",
        "Non-Fiction",
      ],
      beauty: ["Moisturizer", "Serum", "Cleanser", "Shampoo", "Conditioner", "Perfume", "Makeup Kit", "Face Mask"],
    }
  
    const items = categoryNames[category] || ["Product"]
    const randomItem = items[Math.floor(Math.random() * items.length)]
  
    return `${randomAdjective} ${randomItem} ${id}`
  }
  
  function getProductDescription(category) {
    const descriptions = {
      clothing:
        "High-quality fabric with comfortable fit. Perfect for everyday wear or special occasions. Available in multiple sizes and colors.",
      electronics:
        "Cutting-edge technology with premium build quality. Features the latest innovations for an enhanced user experience.",
      furniture:
        "Sturdy construction with elegant design. Made from high-quality materials for long-lasting durability and comfort.",
      books:
        "Engaging content that will keep you hooked from start to finish. Written by acclaimed authors and packed with valuable insights.",
      beauty:
        "Formulated with premium ingredients for optimal results. Dermatologically tested and suitable for all skin types.",
    }
  
    return (
      descriptions[category] ||
      "High-quality product designed to meet your needs. Features premium materials and excellent craftsmanship."
    )
  }
  
  function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  }
  