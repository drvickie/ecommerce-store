"use client"

import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const vat = subtotal * 0.075
  const total = subtotal + vat

  if (cartItems.length === 0) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold mb-4">Your Cart</h1>
        <p>Your cart is empty.</p>
      </main>
    )
  }

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cartItems.map(item => (
          <div
            key={item.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                ₦{item.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={item.stock}
                value={item.quantity}
                onChange={e =>
                  updateQuantity(item.id, Number(e.target.value))
                }
                className="w-16 border rounded px-2 py-1"
              />

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 border-t pt-4 space-y-2">
        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>VAT (7.5%): ₦{vat.toLocaleString()}</p>
        <p className="font-bold text-lg">
          Total: ₦{total.toLocaleString()}
        </p>
      </div>
    </main>
  )
}
