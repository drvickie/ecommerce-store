import { Product } from "@/types"

type RawProduct = {
  id: number
  name: string
  price: number
  quantity: number
  category: string
  image: string
}

type ProductsResponse = {
  status: string
  data: RawProduct[]
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://api.oluwasetemi.dev/products")

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const json: ProductsResponse = await res.json()

  // 🔑 NORMALIZATION STEP
  return json.data.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.quantity, // ← FIX
    category: product.category,
    image: product.image,
  }))
}
