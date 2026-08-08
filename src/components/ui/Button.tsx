import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

type SharedProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> & {
    href?: undefined
    to?: undefined
  }

type ButtonAsAnchor = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
    to?: undefined
  }

type ButtonAsRouterLink = SharedProps & {
  to: string
  href?: undefined
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

type Props = ButtonAsButton | ButtonAsAnchor | ButtonAsRouterLink

const variantClass: Record<Variant, string> = {
  primary:
    'bg-ink text-fog hover:bg-ink-soft focus-visible:outline-moss-bright disabled:bg-ink/40 disabled:text-fog/70',
  secondary:
    'bg-transparent text-fog border border-stone/40 hover:border-stone hover:bg-fog/10 focus-visible:outline-stone',
  ghost:
    'bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/5 focus-visible:outline-ink',
}

const sizeClass: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

/**
 * Botão / link do design system.
 * - `to` → React Router Link
 * - `href` → âncora externa ou hash
 * - sem ambos → <button>
 */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: Props) {
  const classes = [
    'inline-flex items-center justify-center gap-2',
    'font-body font-semibold tracking-wide',
    'transition-[background-color,border-color,color,transform] duration-300',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    'active:scale-[0.98] disabled:cursor-not-allowed disabled:active:scale-100',
    variantClass[variant],
    sizeClass[size],
    className,
  ].join(' ')

  if ('to' in rest && typeof rest.to === 'string') {
    const { to, ...linkRest } = rest
    return (
      <Link to={to} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && typeof rest.href === 'string') {
    const { href, ...anchorRest } = rest
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonRest } = rest as ButtonAsButton
  return (
    <button type={type} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
