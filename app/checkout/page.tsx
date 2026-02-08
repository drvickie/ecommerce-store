"use client"

import { useState } from "react"
import { checkoutSchema, CheckoutFormData } from "@/lib/checkoutSchema"
import { useCart } from "@/context/CartContext"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Cannot checkout.</p>
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const vat = subtotal * 0.075
  const total = subtotal + vat

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = checkoutSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach(err => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})
    console.log("CHECKOUT DATA:", result.data)
    console.log("ORDER TOTAL:", total)

    // Paystack will be triggered here in Phase 7
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p>{errors.fullName}</p>}
        </div>

        <div>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p>{errors.phone}</p>}
        </div>

        <div>
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p>{errors.address}</p>}
        </div>

        <hr />

        <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
        <p>VAT (7.5%): ₦{vat.toLocaleString()}</p>
        <strong>Total: ₦{total.toLocaleString()}</strong>

        <br />
        <br />

        <button type="submit">Proceed to Payment</button>
      </form>
    </main>
  )
}
