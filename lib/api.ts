import { Product } from "@/types"

type RawProduct = {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  image?: string
}

type ProductsResponse = {
  status: string
  data: RawProduct[]
}

/**
 * Fetch products from API and normalize
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://api.oluwasetemi.dev/products")
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)

  const json: ProductsResponse = await res.json()

  return json.data.map(p => ({
    id: p.id,
    name: p.name || "Untitled Product",
    price: typeof p.price === "number" ? p.price : 0,
    stock: typeof p.quantity === "number" ? p.quantity : 0,
    category: p.category || "Uncategorized",
    image: p.image || "/placeholder.jpeg",
  }))
}
