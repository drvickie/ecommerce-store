"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@/types"

export type CartItem = Product & {
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  /* ===============================
     Load cart from localStorage
     =============================== */
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart))
      } catch {
        localStorage.removeItem("cart")
      }
    }
  }, [])

  /* ===============================
     Persist cart to localStorage
     =============================== */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  /* ===============================
     Add item to cart (STOCK SAFE)
     =============================== */
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      // Prevent adding out-of-stock items
      if (product.stock === 0) return prev

      const existing = prev.find(item => item.id === product.id)

      if (existing) {
        // Prevent exceeding stock
        if (existing.quantity >= product.stock) return prev

        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  /* ===============================
     Remove item completely
     =============================== */
  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  /* ===============================
     Update quantity (CLAMPED)
     =============================== */
  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id !== id) return item

        // Clamp quantity between 1 and stock
        const safeQuantity = Math.max(1, Math.min(quantity, item.stock))

        return { ...item, quantity: safeQuantity }
      })
    )
  }

  /* ===============================
     Clear cart (after payment)
     =============================== */
  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
