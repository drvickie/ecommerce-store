"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const vat = subtotal * 0.075
  const total = subtotal + vat

  if (cartItems.length === 0) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Your cart is empty.</p>
  }

  return (
    <main className="container">
      <h1>Your Cart</h1>

      {cartItems.map(item => (
        <div
          key={item.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
            background: "#fff",
            padding: 12,
            borderRadius: 6,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
          }}
        >
          <img src={item.image} alt={item.title} width={100} style={{ borderRadius: 4 }} />
          <div style={{ marginLeft: 12, flex: 1 }}>
            <h3>{item.title}</h3>
            <p>₦{item.price.toLocaleString()}</p>
            <input
              type="number"
              value={item.quantity}
              min={1}
              max={item.stock}
              onChange={e => updateQuantity(item.id, Number(e.target.value))}
              style={{ width: 60, padding: 4, marginTop: 4 }}
            />
            <button onClick={() => removeFromCart(item.id)} style={{ marginTop: 8 }}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="checkout-totals" style={{ marginTop: 24 }}>
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>VAT (7.5%): ₦{vat.toLocaleString()}</p>
        <strong>Total: ₦{total.toLocaleString()}</strong>
      </div>

      <Link href="/checkout">
        <button style={{ marginTop: 24 }}>Proceed to Checkout</button>
      </Link>
    </main>
  )
}
