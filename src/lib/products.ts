import { products } from '@/data/products'
import type { Product, ProductCategory } from '@/types/product'

export function getAllProducts(): Product[] {
  return products
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.filter((p) => p.featured).slice(0, limit)
}

export function filterProducts(category?: ProductCategory | null): Product[] {
  if (!category) return products
  return getProductsByCategory(category)
}

/** Valida string de query para categoria tipada. */
export function parseCategoryParam(
  value: string | null,
): ProductCategory | null {
  if (value === 'camisas' || value === 'calcas' || value === 'camadas') {
    return value
  }
  return null
}
