import { Product } from "@/types"

type ProductsResponse = {
  status: string
  data: Product[]
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://api.oluwasetemi.dev/products")

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const json: ProductsResponse = await res.json()
  return json.data
}
