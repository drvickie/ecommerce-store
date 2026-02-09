"use client"

import { Product } from "@/types"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div
      className="product-card"
      style={{
        background: "#fff",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.2s",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
        }}
      />

      <div
        className="card-content"
        style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <h3 style={{ fontSize: 18, fontWeight: 600 }}>{product.name}</h3>

        <p className="price" style={{ fontSize: 16, fontWeight: 500 }}>
          ₦{product.price.toLocaleString()}
        </p>

        <span
          className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}
          style={{
            color: product.stock > 0 ? "green" : "red",
            fontWeight: 500,
            fontSize: 14,
          }}
        >
          {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
        </span>

        <button
          disabled={product.stock === 0}
          onClick={() => addToCart(product)}
          style={{
            marginTop: 8,
            padding: "8px 16px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: product.stock > 0 ? "pointer" : "not-allowed",
            transition: "background-color 0.2s",
          }}
        >
          Add to Cart
        </button>
      </div>
      
    </div>
  )
}
