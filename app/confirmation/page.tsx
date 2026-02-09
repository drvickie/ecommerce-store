"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function ConfirmationPage() {
  const params = useSearchParams()
  const ref = params.get("ref")
  const { clearCart } = useCart()

  // Ensure cart is cleared after successful payment
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "80px auto",
        background: "#ffffff",
        padding: 32,
        borderRadius: 8,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "green", marginBottom: 16 }}>
        Payment Successful 🎉
      </h1>

      <p style={{ marginBottom: 12 }}>
        Thank you for your purchase. Your payment was completed successfully.
      </p>

      {ref && (
        <p style={{ fontSize: 14, marginBottom: 24 }}>
          <strong>Transaction Reference:</strong> {ref}
        </p>
      )}

      <Link href="/">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Continue Shopping
        </button>
      </Link>
    </main>
  )
}
