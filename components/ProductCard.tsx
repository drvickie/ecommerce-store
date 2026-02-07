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
    <div className="border rounded p-4 flex flex-col gap-2">
      {/* Product name */}
      <h3 className="font-semibold">{product.name}</h3>

      {/* Price */}
      <p className="text-sm">₦{product.price.toLocaleString()}</p>

      {/* Stock status */}
      {isOutOfStock ? (
        <span className="text-red-600 text-sm font-medium">
          Out of Stock
        </span>
      ) : (
        <span className="text-green-600 text-sm">
          In stock: {product.stock}
        </span>
      )}

      {/* Add to cart button 
      <button
        onClick={() => addToCart(product)}
        disabled={isOutOfStock}
        className={`mt-auto px-3 py-2 rounded text-white text-sm
          ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
        `}
      >
        Add to Cart
      </button> */}
      <button
        onClick={() => {
        console.log("ADDING TO CART:", product.name)
        addToCart(product)
       }}
       disabled={isOutOfStock}
       className={`mt-auto px-3 py-2 rounded text-white text-sm
         ${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"}
     `}
>
        Add to Cart
      </button>



    </div>
  )
}
