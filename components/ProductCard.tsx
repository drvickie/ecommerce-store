"use client"

import { Product } from "@/types"
import { useCart } from "@/context/CartContext"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart()
  const isOutOfStock = product.stock === 0

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-4 flex flex-col justify-between">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-contain mb-4 rounded"
      />

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700 font-semibold mb-2">
          ₦{product.price.toLocaleString()}
        </p>
        <p
          className={`text-sm font-medium mb-3 ${
            isOutOfStock ? "text-red-600" : "text-green-600"
          }`}
        >
          {isOutOfStock ? "Out of Stock" : `In stock: ${product.stock}`}
        </p>
      </div>

      {/* Add to Cart */}
      <button
        onClick={() => addToCart(product)}
        disabled={isOutOfStock}
        className={`mt-auto py-2 rounded-lg font-semibold text-white w-full transition-all ${
          isOutOfStock
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isOutOfStock ? "Unavailable" : "Add to Cart"}
      </button>
      
    </div>
  )
}
