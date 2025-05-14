"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"

export default function FeaturedProducts() {
  const [products] = useState([
    {
      id: 1,
      name: "Ultra-Soft Regular Pads",
      price: 199,
      originalPrice: 299,
      rating: 4.8,
      ratingCount: 128,
      image: "https://imgs.search.brave.com/sc72yBybH9YKbRckKaly6fmsGItHPwBNVXlAuiIsL08/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFjWno1WlErdEwu/anBn",
      tags: ["bestseller"],
      inStock: true
    },
    {
      id: 2,
      name: "Overnight Protection Pads",
      price: 249,
      originalPrice: 349,
      rating: 4.9,
      ratingCount: 95,
      image: "https://imgs.search.brave.com/jO6QYNHVKu2wr-pY61Z6rxiWR3hSrCbdL5kTbAQLRB8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG9pc2UuY29tLy0v/bWVkaWEvZmVhdHVy/ZS9wb2lzZS9uYS91/cy9wcm9kdWN0L3Bk/cC9wcm9kdWN0L2Rl/c2t0b3AvZnJlc2gt/cHJvdGVjdGlvbi1p/bWFnZXMvZnNhLWhz/YS1pbWFnZXMvOGQt/bG9uZy0tcGRwX2Zz/YS5qcGc_cmV2PWI5/N2U4ODgwOWQwNTRh/NDVhOWM1OTc0MzQ0/NjBiNjhj",
      tags: ["new"],
      inStock: true
    },
    {
      id: 3,
      name: "Organic Cotton Pads",
      price: 299,
      originalPrice: 399,
      rating: 4.7,
      ratingCount: 76,
      image: "https://imgs.search.brave.com/1OYyiehiv4cxmuLl_g_bYSTiavqu3Fv-zxKIOe8t1Ss/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vUmFl/bC1PcmdhbmljLUNv/dHRvbi1Db3Zlci1N/ZW5zdHJ1YWwtUmVn/dWxhci1QYWRzLVVu/c2NlbnRlZC1DaGxv/cmluZS1GcmVlLTE2/LUNvdW50X2I0ZmU4/NmMzLTE3NzctNGZh/OC1hZmI0LTA5YzU4/ZTk2YWQ1NS4xZjRi/Njc2ODY3MGQzNDlh/MDJhMTZmZTIxYTZi/ZDVlYy5qcGVnP29k/bkhlaWdodD01ODAm/b2RuV2lkdGg9NTgw/Jm9kbkJnPUZGRkZG/Rg",
      tags: ["sale"],
      inStock: true
    },
    {
      id: 4,
      name: "Extra Long Pads",
      price: 229,
      originalPrice: 329,
      rating: 4.6,
      ratingCount: 64,
      image: "https://imgs.search.brave.com/-dWPB0vc37UQt3PqFvoZsvbNckNdwxqehMpHyANJQ4A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjEwR240YWFpN0wu/anBn",
      tags: [],
      inStock: true
    }
  ])

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Feature Product</h2>
          <p className="text-muted-foreground mt-1">Handpicked for your comfort</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
