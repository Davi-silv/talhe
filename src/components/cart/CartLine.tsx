import { Link } from 'react-router-dom'
import { formatPrice } from '@/lib/format'
import { CART_MAX_QTY, cartLineKey } from '@/lib/cart'
import type { CartItem } from '@/types/cart'

type CartLineProps = {
  item: CartItem
  onQuantity: (key: string, quantity: number) => void
  onRemove: (key: string) => void
  compact?: boolean
}

export function CartLine({
  item,
  onQuantity,
  onRemove,
  compact = false,
}: CartLineProps) {
  const key = cartLineKey(item)
  const lineTotal = item.priceCents * item.quantity

  return (
    <article className={compact ? 'flex gap-4' : 'grid gap-4 sm:grid-cols-[7rem_1fr] sm:gap-6'}>
      <Link
        to={`/produto/${item.slug}`}
        className="block shrink-0 overflow-hidden bg-ink-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
      >
        <img
          src={item.image}
          alt=""
          className={
            compact
              ? 'h-24 w-20 object-cover'
              : 'aspect-[3/4] w-full object-cover sm:h-auto sm:w-28'
          }
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={`/produto/${item.slug}`}
              className="font-display text-base font-bold leading-snug hover:text-ink-muted"
            >
              {item.name}
            </Link>
            <p className="mt-1 font-body text-sm text-ink-muted">
              {item.colorName} · tam. {item.size}
            </p>
          </div>
          <p className="shrink-0 font-body text-sm font-medium">
            {formatPrice(lineTotal)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div
            className="inline-flex items-center border border-ink/20"
            role="group"
            aria-label={`Quantidade de ${item.name}`}
          >
            <button
              type="button"
              className="h-9 w-9 font-body text-lg leading-none text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
              onClick={() => onQuantity(key, item.quantity - 1)}
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="min-w-8 text-center font-body text-sm tabular-nums">
              {item.quantity}
            </span>
            <button
              type="button"
              className="h-9 w-9 font-body text-lg leading-none text-ink transition-colors hover:bg-ink/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
              onClick={() => onQuantity(key, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              disabled={item.quantity >= CART_MAX_QTY}
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="font-body text-xs uppercase tracking-[0.14em] text-ink-muted underline decoration-transparent underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
            onClick={() => onRemove(key)}
          >
            Remover
          </button>
        </div>
      </div>
    </article>
  )
}
