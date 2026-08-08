import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  CART_MAX_QTY,
  cartItemCount,
  cartLineKey,
  cartSubtotalCents,
  readStoredCart,
  writeStoredCart,
} from '@/lib/cart'
import type { CartDraft, CartItem } from '@/types/cart'
import { CartContext } from './cart-context'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readStoredCart())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    writeStoredCart(items)
  }, [items])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((draft: CartDraft) => {
    const incomingQty = Math.min(draft.quantity ?? 1, CART_MAX_QTY)
    const key = cartLineKey(draft)

    setItems((current) => {
      const index = current.findIndex((item) => cartLineKey(item) === key)
      if (index === -1) {
        return [...current, { ...draft, quantity: incomingQty }]
      }

      const next = [...current]
      const existing = next[index]
      next[index] = {
        ...existing,
        quantity: Math.min(existing.quantity + incomingQty, CART_MAX_QTY),
      }
      return next
    })

    setIsOpen(true)
  }, [])

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) => {
      if (quantity < 1) {
        return current.filter((item) => cartLineKey(item) !== key)
      }

      return current.map((item) =>
        cartLineKey(item) === key
          ? { ...item, quantity: Math.min(quantity, CART_MAX_QTY) }
          : item,
      )
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => cartLineKey(item) !== key))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      itemCount: cartItemCount(items),
      subtotalCents: cartSubtotalCents(items),
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
