// Mock data generator for products
export function generateProducts(count = 20) {
    const categories = ["Clothing", "Electronics", "Furniture", "Books", "Beauty"]
    const tags = ["new", "bestseller", "clearance", "limited", "sale"]
  
    return Array.from({ length: count }).map((_, index) => {
      const id = index + 1
      const category = categories[Math.floor(Math.random() * categories.length)]
      const price = Math.floor(Math.random() * 9900) + 100 // Between 100 and 10000
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 5 : 0 // 30% chance of discount
      const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : price
      const inStock = Math.random() > 0.2 // 80% chance of being in stock
      const rating = (Math.random() * 4 + 1).toFixed(1) // Between 1 and 5
      const reviewCount = Math.floor(Math.random() * 500) + 1 // Between 1 and 500
      const popularity = Math.floor(Math.random() * 100) // Between 0 and 100
  
      // Randomly assign 0-2 tags
      const productTags = []
      const tagCount = Math.floor(Math.random() * 3)
      for (let i = 0; i < tagCount; i++) {
        const randomTag = tags[Math.floor(Math.random() * tags.length)]
        if (!productTags.includes(randomTag)) {
          productTags.push(randomTag)
        }
      }
  
      // Generate a date within the last year
      const createdAt = new Date()
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 365))
  
      return {
        id,
        name: generateProductName(category),
        category,
        price,
        originalPrice,
        discount,
        inStock,
        rating: Number.parseFloat(rating),
        reviewCount,
        image: `/placeholder.svg?height=400&width=400&text=Product+${id}`,
        description: generateProductDescription(category),
        tags: productTags,
        popularity,
        createdAt: createdAt.toISOString(),
      }
    })
  }
  
  // Helper function to generate product names
  function generateProductName(category) {
    const adjectives = [
      "Premium",
      "Luxury",
      "Essential",
      "Classic",
      "Modern",
      "Elegant",
      "Stylish",
      "Durable",
      "Compact",
      "Versatile",
    ]
    const clothingItems = ["T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", "Hoodie", "Shirt", "Skirt", "Pants", "Coat"]
    const electronicsItems = [
      "Smartphone",
      "Laptop",
      "Headphones",
      "Tablet",
      "Smart Watch",
      "Camera",
      "Speaker",
      "Monitor",
      "Keyboard",
      "Mouse",
    ]
    const furnitureItems = [
      "Sofa",
      "Chair",
      "Table",
      "Bed",
      "Desk",
      "Bookshelf",
      "Cabinet",
      "Wardrobe",
      "Dresser",
      "Ottoman",
    ]
    const booksGenres = [
      "Novel",
      "Biography",
      "Cookbook",
      "Self-Help Book",
      "History Book",
      "Science Fiction",
      "Mystery",
      "Fantasy",
      "Poetry Collection",
      "Business Book",
    ]
    const beautyItems = [
      "Face Cream",
      "Shampoo",
      "Perfume",
      "Lipstick",
      "Face Mask",
      "Moisturizer",
      "Serum",
      "Foundation",
      "Eyeshadow Palette",
      "Hair Conditioner",
    ]
  
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  
    let items
    switch (category) {
      case "Clothing":
        items = clothingItems
        break
      case "Electronics":
        items = electronicsItems
        break
      case "Furniture":
        items = furnitureItems
        break
      case "Books":
        items = booksGenres
        break
      case "Beauty":
        items = beautyItems
        break
      default:
        items = [...clothingItems, ...electronicsItems, ...furnitureItems, ...booksGenres, ...beautyItems]
    }
  
    const item = items[Math.floor(Math.random() * items.length)]
    const brandNames = ["Acme", "Zenith", "Pinnacle", "Horizon", "Apex", "Elevate", "Summit", "Prime", "Elite", "Royal"]
    const brand = brandNames[Math.floor(Math.random() * brandNames.length)]
  
    return `${adjective} ${brand} ${item}`
  }
  
  // Helper function to generate product descriptions
  function generateProductDescription(category) {
    const descriptions = {
      Clothing:
        "High-quality fabric with a comfortable fit. Perfect for everyday wear or special occasions. Available in multiple colors and sizes.",
      Electronics:
        "Cutting-edge technology with sleek design. Features the latest innovations for an enhanced user experience. Comes with a 1-year warranty.",
      Furniture:
        "Crafted with premium materials for durability and style. Designed to complement any home decor. Easy assembly required.",
      Books:
        "Engaging read that will keep you captivated from beginning to end. Written by a bestselling author. Available in hardcover and paperback.",
      Beauty:
        "Formulated with natural ingredients for gentle yet effective results. Dermatologically tested and free from harmful chemicals. Suitable for all skin types.",
    }
  
    return (
      descriptions[category] ||
      "High-quality product designed to meet your needs. Made with premium materials for durability and performance."
    )
  }
  