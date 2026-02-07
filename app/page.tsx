"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"
import ProductCard from "@/components/ProductCard"
import { useCart } from "@/context/CartContext"
 

export default function HomePage() {
  const { cartItems } = useCart()
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (isLoading) return <div className="p-4">Loading products...</div>
  if (isError) return <div className="p-4">Failed to load products.</div>

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Household Gadgets</h1>
      <p className="mb-4 font-medium">
        Cart Items: {cartItems.length}
      </p>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
