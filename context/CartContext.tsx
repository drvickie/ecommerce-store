"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { Product } from "@/types"

/* ---------------- TYPES ---------------- */

export interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
}

/* ---------------- CONTEXT ---------------- */

const CartContext = createContext<CartContextType | undefined>(undefined)

/* ---------------- PROVIDER ---------------- */

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  function addToCart(product: Product) {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function removeFromCart(id: number) {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  function updateQuantity(id: number, quantity: number) {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.min(Math.max(quantity, 1), item.stock) }
          : item
      )
    )
  }

  function clearCart() {
    setCartItems([])
    localStorage.removeItem("cart")
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

/* ---------------- HOOK ---------------- */

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
