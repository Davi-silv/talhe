import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { CartLine } from '@/components/cart/CartLine'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'

export function CartDrawer() {
  const { pathname } = useLocation()
  const {
    items,
    itemCount,
    subtotalCents,
    isOpen,
    closeCart,
    setQuantity,
    removeItem,
  } = useCart()

  useEffect(() => {
    closeCart()
  }, [pathname, closeCart])

  useEffect(() => {
    if (!isOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, closeCart])

  return (
    <div
      className={[
        'fixed inset-0 z-[60] transition-[visibility] duration-300',
        isOpen ? 'visible' : 'invisible',
      ].join(' ')}
      aria-hidden={!isOpen}
    >
      <button
        type="button"
        className={[
          'absolute inset-0 bg-ink/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={closeCart}
        aria-label="Fechar carrinho"
      />

      <aside
        className={[
          'absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-fog shadow-[-24px_0_60px_rgb(14_17_16/0.18)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <header className="flex items-center justify-between border-b border-ink/10 px-5 py-5">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-moss-bright">
              Sacola
            </p>
            <h2 id="cart-drawer-title" className="mt-1 font-display text-2xl font-bold">
              Carrinho
              {itemCount > 0 ? (
                <span className="ml-2 font-body text-base font-medium text-ink-muted">
                  ({itemCount})
                </span>
              ) : null}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="font-body text-sm text-ink-muted hover:text-ink"
          >
            Fechar
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center px-5">
            <p className="font-display text-2xl font-bold">Sua sacola está vazia.</p>
            <p className="mt-2 max-w-xs font-body text-ink-muted">
              Escolha uma peça, selecione tamanho e cor e adicione aqui.
            </p>
            <div className="mt-8">
              <Button to="/colecao" variant="ghost" onClick={closeCart}>
                Ver coleção
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.colorId}`}
                  className="border-b border-ink/10 pb-8 last:border-b-0 last:pb-0"
                >
                  <CartLine
                    item={item}
                    compact
                    onQuantity={setQuantity}
                    onRemove={removeItem}
                  />
                </li>
              ))}
            </ul>

            <footer className="border-t border-ink/10 bg-paper px-5 py-5">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-body text-sm text-ink-muted">Subtotal</span>
                <span className="font-display text-xl font-bold">
                  {formatPrice(subtotalCents)}
                </span>
              </div>
              <p className="mt-1 font-body text-xs text-ink-muted">
                Frete e pagamento na etapa de checkout.
              </p>
              <div className="mt-5 grid gap-3">
                <Button to="/carrinho" variant="ghost" className="w-full" onClick={closeCart}>
                  Ver sacola
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  disabled
                  title="Checkout na etapa 5"
                >
                  Finalizar pedido
                </Button>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
