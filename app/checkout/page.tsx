"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/CartContext"
import { checkoutSchema, CheckoutFormData } from "@/lib/checkoutSchema"
import { generateReference } from "@/lib/paystack"

export default function CheckoutPage() {
  const { cartItems } = useCart()
  const router = useRouter()

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (cartItems.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: 50 }}>
        Your cart is empty.
      </p>
    )
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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const result = checkoutSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}

      result.error.issues.forEach(issue => {
        const field = issue.path[0]
          ? String(issue.path[0])
          : "_form"
        fieldErrors[field] = issue.message
      })

      setErrors(fieldErrors)
      return
    }

    setErrors({})

    if (!(window as any).PaystackPop) {
      alert("Paystack script not loaded. Please refresh.")
      return
    }

    const reference = generateReference()

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_KEY!,
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
      callback: (response: any) => {
        router.push(`/confirmation?ref=${response.reference}`)
      },
      onClose: () => alert("Payment cancelled"),
    })

    handler.openIframe()
  }

  const inputStyle = (field: string) => ({
    padding: 8,
    fontSize: 16,
    border: errors[field] ? "1px solid red" : "1px solid #ccc",
    borderRadius: 4,
  })

  return (
    <main className="container">
      <h1>Checkout</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 16 }}
      >
        {/* Full Name */}
        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle("fullName")}
          />
          <small>At least 3 characters</small>
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

        {/* Email */}
        <div>
          <label>Email</label>
          <input
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle("email")}
          />
          <small>Must be a valid email</small>
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div>
          <label>Phone Number</label>
          <input
            name="phone"
            placeholder="08012345678"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle("phone")}
          />
          <small>At least 10 digits</small>
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        {/* Address */}
        <div>
          <label>Delivery Address</label>
          <textarea
            name="address"
            placeholder="123 Main Street, Lagos"
            value={formData.address}
            onChange={handleChange}
            style={inputStyle("address")}
          />
          <small>At least 10 characters</small>
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* Totals */}
        <div className="checkout-totals">
          <p>Subtotal: ₦{subtotal.toLocaleString()}</p>
          <p>VAT (7.5%): ₦{vat.toLocaleString()}</p>
          <strong>Total: ₦{total.toLocaleString()}</strong>
        </div>

        <button type="submit">Proceed to Payment</button>
      </form>
    </main>
  )
}
