"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import { useCart } from "@/context/CartContext"

export default function ConfirmationClient() {
  const params = useSearchParams()
  const router = useRouter()
  const ref = params.get("ref")
  const { clearCart } = useCart()

  // ✅ Clear cart once on client after payment
  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

      <button
        onClick={() => router.push("/")}
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
    </main>
  )
}
