import { useQuery } from "@tanstack/react-query"
import { fetchProducts } from "@/lib/api"

export default function HomePage() {
  const { data, isLoading, isError } = useQuery(["products"], fetchProducts)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading products</div>

  return (
    <div className="grid grid-cols-2 gap-4">
      {data?.map(p => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>Stock: {p.stock}</p>
        </div>
      ))}
    </div>
  )
}
