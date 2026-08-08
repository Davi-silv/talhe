import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CartLine } from '@/components/cart/CartLine'
import { useAuth } from '@/hooks/useAuth'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'

export function CartPage() {
  const { user } = useAuth()
  const { items, itemCount, subtotalCents, setQuantity, removeItem, clearCart } =
    useCart()

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-5 pt-24 text-center md:px-8">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
          Sacola
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">
          Carrinho vazio
        </h1>
        <p className="mt-4 max-w-md font-body text-ink-muted md:text-lg">
          Ainda não há peças aqui. Explore a coleção e escolha tamanho e cor.
        </p>
        <div className="mt-8">
          <Button to="/colecao" variant="ghost" size="lg">
            Ir para a coleção
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 md:pt-28">
      <header className="border-b border-ink/10 bg-paper/80">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
            Sacola
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Carrinho
          </h1>
          <p className="mt-4 font-body text-ink-muted md:text-lg">
            {itemCount} {itemCount === 1 ? 'peça' : 'peças'} prontas para vestir.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-[1.4fr_0.8fr] lg:items-start">
        <section aria-label="Itens do carrinho">
          <ul className="space-y-10">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.colorId}`}
                className="border-b border-ink/10 pb-10 last:border-b-0 last:pb-0"
              >
                <CartLine
                  item={item}
                  onQuantity={setQuantity}
                  onRemove={removeItem}
                />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={clearCart}
            className="mt-10 font-body text-sm text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Esvaziar sacola
          </button>
        </section>

        <aside className="border-t border-ink/10 pt-8 lg:sticky lg:top-28 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          <h2 className="font-display text-2xl font-bold">Resumo</h2>
          <dl className="mt-6 space-y-3 font-body text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-muted">Frete</dt>
              <dd className="text-ink-muted">Calculado no checkout</dd>
            </div>
          </dl>
          <div className="mt-6 flex items-baseline justify-between border-t border-ink/10 pt-5">
            <span className="font-body text-sm text-ink-muted">Total estimado</span>
            <span className="font-display text-2xl font-bold">
              {formatPrice(subtotalCents)}
            </span>
          </div>

          <div className="mt-8 grid gap-3">
            {user ? (
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled
                title="Checkout na etapa 5"
              >
                Finalizar pedido
              </Button>
            ) : (
              <Button to="/entrar?next=/carrinho" variant="primary" size="lg" className="w-full">
                Entrar para finalizar
              </Button>
            )}
            <Link
              to="/colecao"
              className="text-center font-body text-sm text-ink-muted underline decoration-ink/20 underline-offset-4 hover:text-ink"
            >
              Continuar comprando
            </Link>
          </div>
          <p className="mt-4 font-body text-xs text-ink-muted">
            Pagamento com Pix, cartão e boleto chega na etapa 5 (Mercado Pago).
          </p>
        </aside>
      </div>
    </div>
  )
}
