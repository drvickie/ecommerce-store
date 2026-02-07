"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"
import ProductCard from "@/components/ProductCard"

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading products...
      </div>
    )

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load products.
      </div>
    )

  return (
    <main className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Household Gadgets
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
