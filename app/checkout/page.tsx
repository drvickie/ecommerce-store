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

  // Guard: no checkout with empty cart
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
      result.error.errors.forEach(err => {
        const field = err.path[0]
        if (field) {
          fieldErrors[field as string] = err.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    const reference = generateReference()

    const handler = (window as any).PaystackPop.setup({
      key: "pk_test_c192cf9712d90cb2ef49c4ab3a99b23137a0f068", // 🔴 REPLACE with your Paystack PUBLIC key
      email: result.data.email,
      amount: Math.round(total * 100), // Paystack uses kobo
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
        router.push(`/confirmation?ref=${response.reference}`)
      },
      onClose: function () {
        alert("Payment cancelled")
      },
    })

    handler.openIframe()
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
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

        <button type="submit">
          Proceed to Payment
        </button>
      </form>
    </main>
  )
}
