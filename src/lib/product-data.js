// 👇 Step 1: Predefined image list per category
const categoryImages = {
  clothing: [
    "https://imgs.search.brave.com/PnSCmT9CW0fPMCPkUgarjoGhFctrZQxcja8moJUkApk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/amxpbmRlYmVyZ3Vz/YS5jb20vY2RuL3No/b3AvZmlsZXMvR01T/VDExNDQ5X08xNDBf/Yy5qcGc_dj0xNzIw/Nzk2OTc2JndpZHRo/PTE0Njc"
  ],
  electronics: [
    "https://imgs.search.brave.com/Mwkqy-YewhMiqC-xk70wUfpChD_XmZkn9bUXCjsnxdg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aWtlYS5jb20vdXMv/ZW4vaW1hZ2VzL3By/b2R1Y3RzL3ZhcHBl/YnktcG9ydGFibGUt/Ymx1ZXRvb3RoLXNw/ZWFrZXItd2F0ZXJw/cm9vZi1ibGFja19f/MTE2OTY1MV9wZTg5/MjUxN19zNS5qcGc_/Zj14eHM"
  ],
  furniture: [
   
  ],
  books: [
    
  ],
  beauty: [
    
  ],
};

// 👇 Step 2: Product generator with predefined images
export function generateProducts(count = 20) {
  const categories = Object.keys(categoryImages);
  const tags = ["new", "bestseller", "clearance", "limited", "sale"];

  return Array(count)
    .fill(0)
    .map((_, index) => {
      const id = index + 1;
      const category = categories[Math.floor(Math.random() * categories.length)];
      const price = Math.floor(Math.random() * 9900) + 100;
      const hasDiscount = Math.random() > 0.5;
      const originalPrice = hasDiscount ? Math.floor(price * (1 + Math.random() * 0.5)) : null;
      const rating = (Math.random() * 4 + 1).toFixed(1);
      const ratingCount = Math.floor(Math.random() * 500) + 1;
      const inStock = Math.random() > 0.2;

      const productTags = [];
      const tagCount = Math.floor(Math.random() * 3);
      for (let i = 0; i < tagCount; i++) {
        const randomTag = tags[Math.floor(Math.random() * tags.length)];
        if (!productTags.includes(randomTag)) {
          productTags.push(randomTag);
        }
      }

      // 👇 Get random image from the selected category
      const images = categoryImages[category];
      const image = images[Math.floor(Math.random() * images.length)];

      return {
        id,
        name: getProductName(category, id),
        description: getProductDescription(category),
        category,
        price,
        originalPrice,
        image,
        rating: Number.parseFloat(rating),
        ratingCount,
        inStock,
        tags: productTags,
        popularity: Math.floor(Math.random() * 100),
        createdAt: getRandomDate(new Date(2023, 0, 1), new Date()),
      };
    });
}

// 👇 Helper for name
function getProductName(category, id) {
  const adjectives = ["Premium", "Deluxe", "Essential", "Classic", "Modern", "Elegant", "Professional", "Luxury"];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  const categoryNames = {
    clothing: ["T-Shirt", "Jeans", "Dress", "Jacket", "Sweater", "Hoodie", "Shirt", "Skirt"],
    electronics: ["Smartphone", "Headphones", "Laptop", "Tablet", "Camera", "Speaker", "Smartwatch", "TV"],
    furniture: ["Chair", "Table", "Sofa", "Bed", "Desk", "Bookshelf", "Cabinet", "Dresser"],
    books: ["Novel", "Cookbook", "Biography", "Self-Help Book", "History Book", "Science Book", "Fiction", "Non-Fiction"],
    beauty: ["Moisturizer", "Serum", "Cleanser", "Shampoo", "Conditioner", "Perfume", "Makeup Kit", "Face Mask"],
  };

  const items = categoryNames[category] || ["Product"];
  const randomItem = items[Math.floor(Math.random() * items.length)];

  return `${randomAdjective} ${randomItem} ${id}`;
}

// 👇 Helper for description
function getProductDescription(category) {
  const descriptions = {
    clothing: "High-quality fabric with comfortable fit. Perfect for everyday wear or special occasions.",
    electronics: "Cutting-edge technology with premium build quality. Latest innovations included.",
    furniture: "Sturdy construction with elegant design. Built for comfort and durability.",
    books: "Engaging content by acclaimed authors. Perfect for curious minds and book lovers.",
    beauty: "Formulated with premium ingredients. Suitable for all skin types and daily use.",
  };

  return descriptions[category] || "High-quality product with premium craftsmanship.";
}

// 👇 Random date helper
function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
