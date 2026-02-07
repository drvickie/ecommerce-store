"use client"

import Link from "next/link"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cartItems } = useCart()

  return (
    <header className="flex justify-between items-center p-4 border-b">
      <Link href="/" className="font-bold text-lg">
        Gadget Store
      </Link>

      <Link href="/cart" className="relative">
        Cart
        <span className="ml-2 text-sm font-medium">
          ({cartItems.length})
        </span>
      </Link>
    </header>
  )
}
