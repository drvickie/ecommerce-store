"use client"

import { useCart } from "@/context/CartContext"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"
import ProductCard from "@/components/ProductCard"
import { Product } from "@/types"

export default function HomePage() {
  const { addToCart } = useCart()

  // ✅ Explicitly type the query
  const { data: products = [], isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading products...</p>

  if (isError) return (
    <p style={{ textAlign: "center", color: "red" }}>
      Error: {(error as Error).message}
    </p>
  )

  return (
    <main className="container">
      <h1 style={{ marginBottom: 24, textAlign: "center" }}>Our Products</h1>

      <div
        className="product-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 24,
        }}
      >
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </main>
  )
}
