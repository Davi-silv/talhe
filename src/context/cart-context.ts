import { createContext } from 'react'
import type { CartDraft, CartItem } from '@/types/cart'

export type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotalCents: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  addItem: (draft: CartDraft) => void
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)
