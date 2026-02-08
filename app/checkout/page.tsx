"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { checkoutSchema, CheckoutFormData } from "@/lib/checkoutSchema"
import { generateReference } from "@/lib/paystack"

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (cartItems.length === 0) {
    return <p>Your cart is empty. Cannot proceed to checkout.</p>
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
      if (result.error && Array.isArray(result.error.errors)) {
        result.error.errors.forEach(err => {
          const field = err.path[0] ? String(err.path[0]) : "_form"
          fieldErrors[field] = err.message
        })
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    if (!(window as any).PaystackPop) {
      alert("Paystack script not loaded. Please refresh the page.")
      return
    }

    const reference = generateReference()

    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_c192cf9712d90cb2ef49c4ab3a99b23137a0f068", // 🔴 Replace with your Paystack PUBLIC key
      email: result.data.email,
      amount: Math.round(total * 100),
      currency: "NGN",
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: result.data.fullName,
          },
          {
            display_name: "Phone Number",
            variable_name: "phone",
            value: result.data.phone,
          },
        ],
      },
      callback: function (response: any) {
        clearCart()
        router.push(`/confirmation?ref=${response.reference}`)
      },
      onClose: function () {
        alert("Payment cancelled")
      },
    })

    handler.openIframe()
  }

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Checkout</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {/* Full Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Full Name</label>
          <input
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            style={{
              padding: 8,
              fontSize: 16,
              border: errors.fullName ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <small style={{ color: "#555", fontSize: 12 }}>
            Must be at least 3 characters
          </small>
          {errors.fullName && (
            <span style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.fullName}
            </span>
          )}
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Email</label>
          <input
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: 8,
              fontSize: 16,
              border: errors.email ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <small style={{ color: "#555", fontSize: 12 }}>
            Must be a valid email address
          </small>
          {errors.email && (
            <span style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="08012345678"
            value={formData.phone}
            onChange={handleChange}
            style={{
              padding: 8,
              fontSize: 16,
              border: errors.phone ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <small style={{ color: "#555", fontSize: 12 }}>
            At least 10 digits, numbers only
          </small>
          {errors.phone && (
            <span style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* Address */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Delivery Address</label>
          <textarea
            name="address"
            placeholder="123 Main Street, Lagos"
            value={formData.address}
            onChange={handleChange}
            style={{
              padding: 8,
              fontSize: 16,
              border: errors.address ? "1px solid red" : "1px solid #ccc",
              borderRadius: 4,
            }}
          />
          <small style={{ color: "#555", fontSize: 12 }}>
            At least 5 characters
          </small>
          {errors.address && (
            <span style={{ color: "red", fontSize: 14, marginTop: 4 }}>
              {errors.address}
            </span>
          )}
        </div>

        {/* General errors fallback */}
        {errors._form && (
          <p style={{ color: "red", fontSize: 14 }}>{errors._form}</p>
        )}

        <hr style={{ margin: "16px 0" }} />

        {/* Totals */}
        <div>
          <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
          <p>VAT (7.5%): ₦{vat.toLocaleString()}</p>
          <strong>Total: ₦{total.toLocaleString()}</strong>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            marginTop: 24,
            padding: "12px 0",
            backgroundColor: "#1a73e8",
            color: "white",
            fontSize: 18,
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Proceed to Payment
        </button>
      </form>
    </main>
  )
}
