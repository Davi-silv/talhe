import { useCart } from '@/hooks/useCart'

type CartButtonProps = {
  solid: boolean
  onBeforeOpen?: () => void
}

export function CartButton({ solid, onBeforeOpen }: CartButtonProps) {
  const { itemCount, openCart } = useCart()

  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.()
        openCart()
      }}
      className={[
        'relative flex h-10 w-10 items-center justify-center transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        solid
          ? 'text-ink focus-visible:outline-moss'
          : 'text-fog focus-visible:outline-stone',
      ].join(' ')}
      aria-label={
        itemCount > 0 ? `Abrir carrinho, ${itemCount} itens` : 'Abrir carrinho'
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden
      >
        <path d="M6 7h12l-1 12H7L6 7Z" />
        <path d="M9 7V6a3 3 0 0 1 6 0v1" />
      </svg>
      {itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center bg-brass px-1 font-body text-[0.65rem] font-bold text-ink">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      ) : null}
    </button>
  )
}
