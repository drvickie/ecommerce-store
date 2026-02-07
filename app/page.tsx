"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"

export default function HomePage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>

  return (
    <div>
      {data?.map(p => (
        <div key={p.id}>{p.name}</div>
      ))}
    </div>
  )
}
