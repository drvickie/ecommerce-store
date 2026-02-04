import { Product } from "@/types"

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("https://api.oluwasetemi.dev/products")
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}
