import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
  emptyMessage?: string
}

export function ProductGrid({
  products,
  emptyMessage = 'Nenhuma peça nesta categoria.',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center font-body text-ink-muted">{emptyMessage}</p>
    )
  }

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
