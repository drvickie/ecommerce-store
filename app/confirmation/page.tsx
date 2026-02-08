"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useCart } from "@/context/CartContext"

export default function ConfirmationPage() {
  const params = useSearchParams()
  const ref = params.get("ref")
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main style={{ padding: 24 }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your payment was completed successfully.</p>
      <p>
        <strong>Transaction Reference:</strong> {ref}
      </p>
    </main>
  )
}
