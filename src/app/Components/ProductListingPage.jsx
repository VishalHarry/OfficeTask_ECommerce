"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal } from "lucide-react"
import FilterSidebar from "./FilterSidebar"
import SortBar from "./SortBar"
import MobileFilterDrawer from "./MobileFilterDrawer"
import ProductGrid from "./ProductGrid"

// Internal product data
const internalProducts = [
  {
    id: "prod-1",
    name: "Ultra Thin Regular Pads",
    description: "Ultra-soft cotton cover with 8-hour protection",
    price: 199,
    originalPrice: 249,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.5,
    ratingCount: 128,
    inStock: true,
    popularity: 95,
    tags: ["bestseller"],
    image: "https://imgs.search.brave.com/3EVdgA4kQ7Oda7rs2te3WwM_yArTSJHvtfSMr0nJivs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9vNWhueW4x/eDBld28vN0JNM3B4/ZkFGem83Wm1mZWpm/SGVpNS8xYmQwMDlk/NjI1MzE4YzE2ZDhh/OTNlYzNmYjg5NGZi/Yy84MDgxMjI1OF9B/TFdfVUxUXzEyXzIy/X1N6XzFfUmVnX1Mx/X1VOXzEuMnhfUEkw/MS5wbmc",
    createdAt: "2024-01-15T00:00:00.000Z",
    specifications: {
      Material: "Cotton",
      Weight: "0.2 kg",
      Dimensions: "24cm x 8cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-2",
    name: "Organic Cotton Overnight Pads",
    description: "Organic comfort for heavy flow nights",
    price: 249,
    originalPrice: 299,
    category: "Feminine Care",
    subcategory: "Organic Pads",
    rating: 4.7,
    ratingCount: 95,
    inStock: true,
    popularity: 90,
    tags: ["new"],
    image: "https://imgs.search.brave.com/qi_e7bPxbRvpjVKy5oJGoZ2JAvtCXJNQhKHsW5GnvjY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aGVo/b25leXBvdC5jby9j/ZG4vc2hvcC9maWxl/cy9IX092ZXJuaWdo/dF9Gcm9udC5qcGc_/dj0xNzE4MDU1NzYx/JndpZHRoPTcwMA",
    createdAt: "2024-01-20T00:00:00.000Z",
    specifications: {
      Material: "Organic Cotton",
      Weight: "0.25 kg",
      Dimensions: "26cm x 8cm x 1.5cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-2",
    name: "Overnight Extra Coverage",
    description: "Extra-long with wings for peaceful sleep",
    price: 249,
    originalPrice: 299,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.8,
    ratingCount: 95,
    inStock: true,
    popularity: 90,
    tags: ["new"],
    image: "https://imgs.search.brave.com/jO6QYNHVKu2wr-pY61Z6rxiWR3hSrCbdL5kTbAQLRB8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG9pc2UuY29tLy0v/bWVkaWEvZmVhdHVy/ZS9wb2lzZS9uYS91/cy9wcm9kdWN0L3Bk/cC9wcm9kdWN0L2Rl/c2t0b3AvZnJlc2gt/cHJvdGVjdGlvbi1p/bWFnZXMvZnNhLWhz/YS1pbWFnZXMvOGQt/bG9uZy0tcGRwX2Zz/YS5qcGc_cmV2PWI5/N2U4ODgwOWQwNTRh/NDVhOWM1OTc0MzQ0/NjBiNjhj",
    createdAt: "2024-01-20T00:00:00.000Z",
    specifications: {
      Material: "Cotton",
      Weight: "0.25 kg",
      Dimensions: "28cm x 9cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-3",
    name: "Biodegradable Sanitary Pads",
    description: "Eco-friendly and gentle on skin",
    price: 189,
    originalPrice: 229,
    category: "Feminine Care",
    subcategory: "Eco Pads",
    rating: 4.3,
    ratingCount: 110,
    inStock: true,
    popularity: 85,
    tags: ["eco-friendly"],
    image: "https://imgs.search.brave.com/Nih4pma2DNQVr8lnxMa3h6lTBePzAwOzeIRmimA11hg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFRMGczWFJ3ekwu/anBn",
    createdAt: "2024-02-01T00:00:00.000Z",
    specifications: {
      Material: "Plant-Based",
      Weight: "0.18 kg",
      Dimensions: "23cm x 7cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-4",
    name: "Extra Long Night Pads",
    description: "Maximum coverage for overnight security",
    price: 279,
    originalPrice: 329,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.6,
    ratingCount: 87,
    inStock: true,
    popularity: 88,
    tags: ["bestseller"],
    image: "https://imgs.search.brave.com/48HCwLtNgTbsHgJ9bqb_Nvd3mcDxRTe52BXwYzgKj-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vTmF0/dXJlbGxhLUV4dHJh/LUxvbmctTmlnaHQt/RmVtaW5pbmUtVG93/ZWxzLTY0LXBjc183/ZjUxZDg4NS05ZWU5/LTQ2YTEtODZjNC1h/MzU1ZmQwYmI2NjUu/M2Q5YTI0MTA5Yjdj/MDU0ODQwZTc3YjI4/MDg1N2UzNDcuanBl/Zz9vZG5IZWlnaHQ9/NjQwJm9kbldpZHRo/PTY0MCZvZG5CZz1G/RkZGRkY",
    createdAt: "2024-02-10T00:00:00.000Z",
    specifications: {
      Material: "Cotton Blend",
      Weight: "0.28 kg",
      Dimensions: "29cm x 9cm x 1.5cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-5",
    name: "Ultra Soft Pantyliners",
    description: "Daily comfort with breathable design",
    price: 129,
    originalPrice: 159,
    category: "Feminine Care",
    subcategory: "Pantyliners",
    rating: 4.2,
    ratingCount: 65,
    inStock: true,
    popularity: 70,
    tags: [],
    image: "https://imgs.search.brave.com/3wPmNxMmVSeNtDMD3lI0XtWBLJibEEG_IyjtMD47hVw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NDF4Uy0ta0IwUEwu/anBn",
    createdAt: "2024-02-20T00:00:00.000Z",
    specifications: {
      Material: "Soft Cotton",
      Weight: "0.1 kg",
      Dimensions: "18cm x 6cm x 0.5cm",
      Warranty: "6 months"
    }
  },
  {
    id: "prod-6",
    name: "Herbal Sanitary Pads",
    description: "Infused with natural herbs for added protection",
    price: 299,
    originalPrice: 349,
    category: "Feminine Care",
    subcategory: "Herbal Pads",
    rating: 4.5,
    ratingCount: 80,
    inStock: true,
    popularity: 92,
    tags: ["herbal"],
    image: "https://imgs.search.brave.com/RJ5YxuzKOaYC4aofmYJ24OtENBcFBWtacdeCFz0yejY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90YXJn/ZXQuc2NlbmU3LmNv/bS9pcy9pbWFnZS9U/YXJnZXQvR1VFU1Rf/N2FmMjFmMzgtOWVj/Mi00Y2Q5LTkxMzct/ZmI1YzIyYmRhYzkz/P3dpZD04MDAmaGVp/PTgwMCZxbHQ9ODAm/Zm10PXBqcGVn",
    createdAt: "2024-03-01T00:00:00.000Z",
    specifications: {
      Material: "Herbal Infused Cotton",
      Weight: "0.22 kg",
      Dimensions: "25cm x 8cm x 1.2cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-7",
    name: "Maxi Thick Pads",
    description: "Thicker pads for heavy flow days",
    price: 219,
    originalPrice: 269,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.4,
    ratingCount: 72,
    inStock: true,
    popularity: 80,
    tags: ["heavy-flow"],
    image: "https://imgs.search.brave.com/WJRXIjRKc3NYi3QHjSwvVRlduke2y6gls53ul6c0Cnw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzF2VmxHOTNRTEwu/anBn",
    createdAt: "2024-03-05T00:00:00.000Z",
    specifications: {
      Material: "Cotton",
      Weight: "0.3 kg",
      Dimensions: "28cm x 9cm x 1.8cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-8",
    name: "Reusable Cloth Pads",
    description: "Sustainable and washable alternative",
    price: 499,
    originalPrice: 599,
    category: "Feminine Care",
    subcategory: "Reusable Pads",
    rating: 4.6,
    ratingCount: 55,
    inStock: true,
    popularity: 78,
    tags: ["eco-friendly"],
    image: "https://imgs.search.brave.com/ptHx-51pRG2aRKlpzUsMZjKyQeJ1Go_FYp9YwiB7xdw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFzc0VMLWVtVUwu/anBn",
    createdAt: "2024-03-10T00:00:00.000Z",
    specifications: {
      Material: "Organic Cotton",
      Weight: "0.15 kg",
      Dimensions: "25cm x 7cm x 1.2cm",
      Warranty: "18 months"
    }
  },
  {
    id: "prod-9",
    name: "Teen Comfort Pads",
    description: "Designed specially for teenagers",
    price: 189,
    originalPrice: 229,
    category: "Feminine Care",
    subcategory: "Teen Pads",
    rating: 4.5,
    ratingCount: 47,
    inStock: true,
    popularity: 83,
    tags: ["teen"],
    image: "https://imgs.search.brave.com/UIIq-mQ_3gcywepoDkLkaPr4RvQKayqNq_z3wR_0mxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjExMDk5eFpKRUwu/anBn",
    createdAt: "2024-03-15T00:00:00.000Z",
    specifications: {
      Material: "Soft Cotton",
      Weight: "0.18 kg",
      Dimensions: "22cm x 7cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-10",
    name: "Overnight XL Pads",
    description: "Extra coverage for peaceful sleep",
    price: 289,
    originalPrice: 349,
    category: "Feminine Care",
    subcategory: "Overnight Pads",
    rating: 4.7,
    ratingCount: 99,
    inStock: true,
    popularity: 93,
    tags: ["bestseller"],
    image: "https://imgs.search.brave.com/8b8oMyMKovZsBghyIiBr3Eho4YyFgSvoHJGV6179M7c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFuTFkxMTNEaUwu/anBn",
    createdAt: "2024-03-20T00:00:00.000Z",
    specifications: {
      Material: "Cotton Blend",
      Weight: "0.26 kg",
      Dimensions: "30cm x 10cm x 1.8cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-11",
    name: "Slim Fit Day Pads",
    description: "Discreet comfort for active days",
    price: 199,
    originalPrice: 249,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.3,
    ratingCount: 68,
    inStock: true,
    popularity: 79,
    tags: ["slim-fit"],
    image: "https://imgs.search.brave.com/foYPAvb8jFCgSoHmEl4kXoiHOUe-NWviKGMNy0TC7dE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vV2hp/c3Blci1NYXhpLUZp/dC1SZWd1bGFyLTE1/LVBhZHNfZTlhNjEz/NjMtNmRiYy00MDY0/LTlkNDItMWU2YWZh/NTRmYjBmLmFkNTQ0/YTBjZjc5MGU4YTAz/ODBhODc2ZTU1OTk4/ZWU5LmpwZWc_b2Ru/SGVpZ2h0PTY0MCZv/ZG5XaWR0aD02NDAm/b2RuQmc9RkZGRkZG",
    createdAt: "2024-03-25T00:00:00.000Z",
    specifications: {
      Material: "Soft Cotton",
      Weight: "0.2 kg",
      Dimensions: "24cm x 7.5cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-12",
    name: "Organic Cotton Pantyliners",
    description: "Natural freshness for everyday use",
    price: 149,
    originalPrice: 189,
    category: "Feminine Care",
    subcategory: "Pantyliners",
    rating: 4.4,
    ratingCount: 52,
    inStock: true,
    popularity: 76,
    tags: ["organic"],
    image: "https://imgs.search.brave.com/CsFCm2nevPwHjSZkPKrha-AEvwCqfT5eq2BdWwYGjHA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Z2V0cmFlbC5jb20v/Y2RuL3Nob3AvZmls/ZXMvUkVVU0FCTEVf/UEFOVFlfTElORVJT/X1JFTE4tQlItVjEw/LTA1X0RUQ181X0NP/VU5UX0JST1dOX0JP/WF9GUk9OVC53ZWJw/P3Y9MTY5NzU2NjY3/NiZ3aWR0aD0yMDQ4",
    createdAt: "2024-04-01T00:00:00.000Z",
    specifications: {
      Material: "Organic Cotton",
      Weight: "0.12 kg",
      Dimensions: "19cm x 6cm x 0.5cm",
      Warranty: "6 months"
    }
  },
  {
    id: "prod-13",
    name: "Period Starter Kit",
    description: "All essentials for first-timers",
    price: 499,
    originalPrice: 599,
    category: "Feminine Care",
    subcategory: "Starter Kits",
    rating: 4.6,
    ratingCount: 45,
    inStock: true,
    popularity: 88,
    tags: ["starter-kit"],
    image: "https://imgs.search.brave.com/ySRi87vbo5f4LdpZbTkKGArlsTBxCpGqgpLnU8FFiNo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2hlZWt5cGFudHMu/Y29tL3VzZXIvcHJv/ZHVjdHMvcmV1c2Fi/bGUtc2FuaXRhcnkt/cGFkLWtpdC1idW5k/bGUtYmFtYm9vLWNo/YXJjb2FsLmpwZw",
    createdAt: "2024-04-05T00:00:00.000Z",
    specifications: {
      Material: "Cotton, Organic Cotton",
      Weight: "0.5 kg",
      Dimensions: "30cm x 20cm x 5cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-14",
    name: "Herbal Overnight Pads",
    description: "Soothing herbs for restful nights",
    price: 289,
    originalPrice: 349,
    category: "Feminine Care",
    subcategory: "Herbal Pads",
    rating: 4.5,
    ratingCount: 66,
    inStock: true,
    popularity: 82,
    tags: ["herbal", "overnight"],
    image: "https://imgs.search.brave.com/rShkZZf5TAhn0eyrvCpKt8Ojr7sBs3tWjIdBFZ8Z02E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFLUE02VW92Z0wu/anBn",
    createdAt: "2024-04-10T00:00:00.000Z",
    specifications: {
      Material: "Herbal Cotton",
      Weight: "0.26 kg",
      Dimensions: "29cm x 9cm x 1.5cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-15",
    name: "Reusable Starter Pack",
    description: "Washable cloth pads set",
    price: 799,
    originalPrice: 999,
    category: "Feminine Care",
    subcategory: "Reusable Pads",
    rating: 4.7,
    ratingCount: 39,
    inStock: true,
    popularity: 81,
    tags: ["eco-friendly", "starter-pack"],
    image: "https://imgs.search.brave.com/a38GA9blpY0QFDOrDtvuqSInrSzt7kp2dTv6sYukssI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/Lzk2MzkwNjYvci9p/bC81NGE4M2EvMzI4/NDc4NjAzNC9pbF82/MDB4NjAwLjMyODQ3/ODYwMzRfZXE3YS5q/cGc",
    createdAt: "2024-04-15T00:00:00.000Z",
    specifications: {
      Material: "Organic Cotton",
      Weight: "0.6 kg",
      Dimensions: "30cm x 25cm x 5cm",
      Warranty: "18 months"
    }
  },
  {
    id: "prod-16",
    name: "Super Absorbent Night Pads",
    description: "Ultimate leak-proof technology",
    price: 329,
    originalPrice: 379,
    category: "Feminine Care",
    subcategory: "Sanitary Pads",
    rating: 4.6,
    ratingCount: 58,
    inStock: true,
    popularity: 85,
    tags: ["super-absorbent"],
    image: "https://imgs.search.brave.com/usprYjR9hay1dVywpU8Pkm5ABplQ4edB82-9cVJBYLQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFJeXpiNkhWd0wu/anBn",
    createdAt: "2024-04-20T00:00:00.000Z",
    specifications: {
      Material: "Advanced Cotton Blend",
      Weight: "0.27 kg",
      Dimensions: "31cm x 9.5cm x 1.7cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-17",
    name: "Daily Comfort Liners",
    description: "Thin and breathable for everyday protection",
    price: 139,
    originalPrice: 169,
    category: "Feminine Care",
    subcategory: "Pantyliners",
    rating: 4.2,
    ratingCount: 40,
    inStock: true,
    popularity: 73,
    tags: ["daily-use"],
    image: "https://imgs.search.brave.com/WX5sGacF7xqUPPKTF-cxLAYRHei4GoCvMbEpggwdBsg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vQWx3/YXlzLVJhZGlhbnQt/RGFpbHktTGluZXJz/LUxpZ2h0LUFic29y/YmVuY3ktTG9uZy1M/ZW5ndGgtNDZDVF80/NmJmMTBiNC1mYzk2/LTQ4MmMtOWQzMy0y/NjNmMjE4NDMyNjYu/YTYwZGM4MWQxZWJl/ZWZkMGJhOWE2ZGE1/YWM0ZmY5YzMuanBl/Zz9vZG5IZWlnaHQ9/NjQwJm9kbldpZHRo/PTY0MCZvZG5CZz1G/RkZGRkY",
    createdAt: "2024-04-22T00:00:00.000Z",
    specifications: {
      Material: "Breathable Cotton",
      Weight: "0.1 kg",
      Dimensions: "17cm x 6cm x 0.4cm",
      Warranty: "6 months"
    }
  },
  {
    id: "prod-18",
    name: "Teen Starter Bundle",
    description: "Designed for teens starting their journey",
    price: 599,
    originalPrice: 699,
    category: "Feminine Care",
    subcategory: "Starter Kits",
    rating: 4.5,
    ratingCount: 35,
    inStock: true,
    popularity: 84,
    tags: ["teen", "starter-bundle"],
    image: "https://imgs.search.brave.com/Vn8m0i5BVQfehRSikA9wYCPOrF255iBcaDVPWGN5j9I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaG9w/LmJvZHlmb3JtLmNv/LnVrL2Nkbi9zaG9w/L2ZpbGVzLzA2X0JG/X1dBVV9CVU5ETEVf/VEVFTl9YM180Mjhi/YjM0MS1lMGY0LTQ3/MDUtOGEwOS1jZWE4/ZTEwZmNhMDEuanBn/P3Y9MTc0MTAwNDE0/NCZ3aWR0aD0xMDgw",
    createdAt: "2024-04-25T00:00:00.000Z",
    specifications: {
      Material: "Soft Cotton",
      Weight: "0.45 kg",
      Dimensions: "28cm x 18cm x 4cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-19",
    name: "Eco-Friendly Day Pads",
    description: "Zero plastic, 100% biodegradable",
    price: 209,
    originalPrice: 259,
    category: "Feminine Care",
    subcategory: "Eco Pads",
    rating: 4.4,
    ratingCount: 60,
    inStock: true,
    popularity: 80,
    tags: ["eco-friendly"],
    image: "https://imgs.search.brave.com/B9BfLu7H1sEF15jQk6bPQIA8IpFmMwM09fe7IE6iAgg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW1zZWNhcmUuY29t/L3N0b3JhZ2UvODY4/N0I2MTFBOEY1NTY3/RTREQzhEQkYxQjkz/OTEzNjU1OTRBMDM3/MzBEQUU3QUI0MUYw/QTUxRjE0MDAwMEY0/QS9mMjg4ODdiMzVi/OTA0YjRhOGRmYTBj/ODNhMTQyN2JlNy80/MTItNjAwLTAtanBn/LkpwZWcvbWVkaWEv/M2Q5ODFkYTM3MzIz/NGJjMGE5MTMxODUz/MDQ4NWIwY2UvODc0/MTY1MTUwNzMuanBl/Zw",
    createdAt: "2024-04-27T00:00:00.000Z",
    specifications: {
      Material: "Biodegradable Plant Fiber",
      Weight: "0.2 kg",
      Dimensions: "24cm x 7cm x 1cm",
      Warranty: "12 months"
    }
  },
  {
    id: "prod-20",
    name: "Sensitive Skin Sanitary Pads",
    description: "Hypoallergenic protection for delicate skin",
    price: 229,
    originalPrice: 279,
    category: "Feminine Care",
    subcategory: "Sensitive Pads",
    rating: 4.6,
    ratingCount: 50,
    inStock: true,
    popularity: 82,
    tags: ["sensitive-skin"],
    image: "https://imgs.search.brave.com/UIIq-mQ_3gcywepoDkLkaPr4RvQKayqNq_z3wR_0mxA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjExMDk5eFpKRUwu/anBn",
    createdAt: "2024-04-28T00:00:00.000Z",
    specifications: {
      Material: "Hypoallergenic Cotton",
      Weight: "0.22 kg",
      Dimensions: "25cm x 8cm x 1.2cm",
      Warranty: "12 months"
    }
  }
];

export default function ProductListingPage() {
  // Add all required state declarations at the top
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    types: [],
    absorption: [],
    sizes: [],
    materials: [],
    onSale: false
  })
  const [sortOption, setSortOption] = useState("popularity")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])

  // Add initial data loading effect
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setFilteredProducts(internalProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Add sort change handler
  const handleSortChange = (option) => {
    setSortOption(option)
    let sortedProducts = [...filteredProducts]
    
    switch (option) {
      case "price-low-high":
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high-low":
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case "new-arrivals":
        sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case "popularity":
      default:
        sortedProducts.sort((a, b) => b.popularity - a.popularity)
        break
    }
    
    setFilteredProducts(sortedProducts)
  }

  // Remove the duplicate filteredProducts constant and use useEffect to update the state
  useEffect(() => {
    const filtered = internalProducts.filter(product => {
      // Price Range Filter
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      // Type Filter
      const matchesType = filters.types.length === 0 || 
        filters.types.some(type => product.subcategory.includes(type))

      // Absorption Filter
      const matchesAbsorption = filters.absorption.length === 0 ||
        filters.absorption.some(level => product.description.toLowerCase().includes(level.toLowerCase()))

      // Size Filter
      const matchesSize = filters.sizes.length === 0 ||
        filters.sizes.some(size => product.description.toLowerCase().includes(size.toLowerCase()))

      // Material Filter
      const matchesMaterial = filters.materials.length === 0 ||
        filters.materials.some(material => 
          product.description.toLowerCase().includes(material.toLowerCase()) ||
          (product.specifications && product.specifications.Material && 
           product.specifications.Material.toLowerCase().includes(material.toLowerCase()))
        )

      // Sale Filter
      const matchesSale = !filters.onSale || (product.originalPrice && product.price < product.originalPrice)

      return matchesPrice && matchesType && matchesAbsorption && matchesSize && matchesMaterial && matchesSale
    })

    setFilteredProducts(filtered)
  }, [filters]) // Add filters as dependency

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }))
  }

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      types: [],
      absorption: [],
      sizes: [],
      materials: [],
      onSale: false
    });
  };

  const handleWishlistToggle = (productId) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(productId)) {
        return prevWishlist.filter(id => id !== productId)
      } else {
        return [...prevWishlist, productId]
      }
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pt-4 pb-2 border-b border-pink-100">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-pink-950">Our Products</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
              <FilterSidebar filters={filters} onFilterChange={handleFilterChange} onReset={resetFilters} />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
            <Button
              onClick={() => setIsMobileFilterOpen(true)}
              className="w-full flex items-center justify-center gap-2 bg-pink-50 text-pink-600 hover:bg-pink-100 border-pink-200"
              variant="outline"
            >
              <SlidersHorizontal size={18} />
              Filter Products
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <SortBar totalResults={filteredProducts.length} sortOption={sortOption} onSortChange={handleSortChange} />

            <ProductGrid 
              products={filteredProducts} 
              isLoading={isLoading} 
              wishlist={wishlist} 
              onWishlistToggle={handleWishlistToggle}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={resetFilters}
      />
    </div>
  )
}