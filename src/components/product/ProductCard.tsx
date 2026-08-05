import { Link } from 'react-router-dom'
import type { Product } from '@/types/product'
import { categoryLabels } from '@/types/product'
import { formatPrice } from '@/lib/format'

type ProductCardProps = {
  product: Product
}

/**
 * Card de produto — imagem + nome + preço.
 * Sem “caixa” decorativa: a interação é o próprio bloco clicável.
 */
export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <Link
        to={`/produto/${product.slug}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-ink-soft">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-3">
          <div>
            <p className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-moss-bright">
              {categoryLabels[product.category]}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-ink-muted">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 font-body text-sm font-medium text-ink">
            {formatPrice(product.priceCents)}
          </p>
        </div>
      </Link>
    </article>
  )
}
