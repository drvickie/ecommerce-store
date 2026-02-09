import { Product } from "@/types"

/**
 * Raw product type returned by API
 */
type RawProduct = {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  image?: string
}

/**
 * API response structure
 */
type ProductsResponse = {
  status: string
  data: RawProduct[]
}

/**
 * Fetch products from API and normalize for frontend
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://api.oluwasetemi.dev/products", {
    cache: "no-store", // ensures fresh data in production
  })

  if (!res.ok) {
    throw new Error(
      `Failed to fetch products: ${res.status} ${res.statusText}`
    )
  }

  const json: ProductsResponse = await res.json()

  // 🔑 NORMALIZATION STEP (single source of truth)
  return json.data.map(product => ({
    id: product.id,
    name: product.name || "Unnamed Product",
    price: typeof product.price === "number" ? product.price : 0,
    stock: typeof product.quantity === "number" ? product.quantity : 0,
    category: product.category || "Uncategorized",
    image: product.image || "/placeholder.jpeg",
  }))
}
