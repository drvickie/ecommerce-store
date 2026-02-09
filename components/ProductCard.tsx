"use client"

import { Product } from "@/types"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="card-content">
        <h3 className="product-name">{product.name}</h3>

        <p className="price">₦{product.price.toLocaleString()}</p>

        <span className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>

        <button
          className={`add-to-cart-btn ${product.stock === 0 ? "disabled" : ""}`}
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
          
        >
          Add to Cart
        </button>
      </div>

    </div>
  )
}
