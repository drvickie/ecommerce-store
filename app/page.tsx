"use client"

import { useCart } from "@/context/CartContext"
import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"
import ProductCard from "@/components/ProductCard"

export default function HomePage() {
  const { addToCart } = useCart()

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (isLoading) return <p style={{ textAlign: "center" }}>Loading products...</p>
  if (isError) return <p style={{ textAlign: "center", color: "red" }}>Error: {(error as Error).message}</p>

  return (
    <main className="container">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </main>
  )
}
