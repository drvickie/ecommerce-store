"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Product } from "@/types"

export type CartItem = Product & { quantity: number }

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

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) setCartItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id)
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be within CartProvider")
  return ctx
}
