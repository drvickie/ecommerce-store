"use client"

interface Product {
  id: number
  title: string
  price: number
  stock: number
  image: string
}

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="card-content">
        <h3>{product.title}</h3>
        <p>₦{product.price.toLocaleString()}</p>
        <span className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
        <button disabled={product.stock === 0} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
  
    </div>
  )
}
