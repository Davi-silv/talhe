import { getProductBySlug } from '@/lib/products'
import type { CartItem } from '@/types/cart'

export const CART_STORAGE_KEY = 'talhe.cart.v1'
export const CART_MAX_QTY = 10

/** Identidade única de uma variação no carrinho. */
export function cartLineKey(item: {
  productId: string
  size: string
  colorId: string
}): string {
  return `${item.productId}::${item.size}::${item.colorId}`
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0)
}

/**
 * Descarta linhas órfãs (peça removida do catálogo) e
 * sincroniza preço/nome/imagem com o mock atual.
 */
export function hydrateCartItems(items: CartItem[]): CartItem[] {
  const next: CartItem[] = []

  for (const item of items) {
    const product = getProductBySlug(item.slug)
    if (!product) continue

    const color = product.colors.find((c) => c.id === item.colorId)
    if (!color) continue
    if (!product.sizes.includes(item.size)) continue

    next.push({
      ...item,
      productId: product.id,
      name: product.name,
      image: product.images[0] ?? item.image,
      colorName: color.name,
      priceCents: product.priceCents,
      quantity: Math.min(Math.max(1, item.quantity), CART_MAX_QTY),
    })
  }

  return next
}

export function readStoredCart(): CartItem[] {
  if (typeof localStorage === 'undefined') return []

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    const items = parsed.filter(isCartItem)
    return hydrateCartItems(items)
  } catch {
    return []
  }
}

export function writeStoredCart(items: CartItem[]): void {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return (
    typeof item.productId === 'string' &&
    typeof item.slug === 'string' &&
    typeof item.name === 'string' &&
    typeof item.image === 'string' &&
    typeof item.size === 'string' &&
    typeof item.colorId === 'string' &&
    typeof item.colorName === 'string' &&
    typeof item.priceCents === 'number' &&
    typeof item.quantity === 'number'
  )
}
