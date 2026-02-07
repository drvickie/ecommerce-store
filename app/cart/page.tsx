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

  if (cartItems.length === 0)
    return (
      <main className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty.</p>
      </main>
    )

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center sm:justify-between border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-24 w-24 object-contain mb-2 sm:mb-0 sm:mr-4"
              />

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Stock: {item.stock}</p>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <input
                  type="number"
                  min={1}
                  max={item.stock}
                  value={item.quantity}
                  onChange={e =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                />

                <button className="text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="border rounded-lg p-6 bg-white shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-gray-700 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </p>
            <p className="flex justify-between">
              <span>VAT (7.5%)</span>
              <span>₦{vat.toLocaleString()}</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </p>
          </div>

          <button className="w-full mt-6 bg-black text-white py-3 rounded hover:bg-gray-800 transition">
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  )
}
