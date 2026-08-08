import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AccountLink } from '@/components/auth/AccountLink'
import { CartButton } from '@/components/cart/CartButton'
import { brand, navLinks } from '@/lib/brand'
import { useAuth } from '@/hooks/useAuth'
import { getUserFirstName } from '@/lib/auth'

export function Header() {
  const { pathname } = useLocation()
  const { user } = useAuth()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Em rotas internas o fundo é claro — header sólido desde o início
  const solid = !isHome || scrolled || menuOpen

  useEffect(() => {
    if (!isHome) {
      setScrolled(false)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
        solid
          ? 'border-b border-ink/10 bg-fog/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          to="/"
          className={[
            'font-display text-2xl font-extrabold tracking-tight transition-colors md:text-[1.75rem]',
            solid ? 'text-ink' : 'text-fog',
          ].join(' ')}
          aria-label={`${brand.name} — início`}
        >
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Principal">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith('/') && !link.href.includes('#')
            const className = [
              'group relative font-body text-sm font-medium tracking-wide transition-colors',
              solid
                ? 'text-ink-muted hover:text-ink'
                : 'text-stone/80 hover:text-fog',
            ].join(' ')
            const underline = [
              'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
              solid ? 'bg-moss' : 'bg-brass',
            ].join(' ')

            if (isRoute) {
              return (
                <Link key={link.href} to={link.href} className={className}>
                  {link.label}
                  <span className={underline} />
                </Link>
              )
            }

            return (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
                <span className={underline} />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <AccountLink solid={solid} onNavigate={() => setMenuOpen(false)} />
          <CartButton solid={solid} onBeforeOpen={() => setMenuOpen(false)} />
          <button
            type="button"
            className={[
              'relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden',
              solid ? 'text-ink' : 'text-fog',
            ].join(' ')}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={[
                'block h-0.5 w-6 origin-center bg-current transition-transform duration-300',
                menuOpen ? 'translate-y-2 rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-6 bg-current transition-opacity duration-300',
                menuOpen ? 'opacity-0' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-0.5 w-6 origin-center bg-current transition-transform duration-300',
                menuOpen ? '-translate-y-2 -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={[
          'fixed inset-0 top-16 bg-fog px-5 pt-10 transition-[opacity,visibility] duration-300 md:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0',
        ].join(' ')}
      >
        <nav className="flex flex-col gap-6" aria-label="Mobile">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith('/') && !link.href.includes('#')
            if (isRoute) {
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="font-display text-3xl font-bold text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            }
            return (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-3xl font-bold text-ink"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            )
          })}
          <Link
            to={user ? '/conta' : '/entrar'}
            className="font-display text-3xl font-bold text-ink"
            onClick={() => setMenuOpen(false)}
          >
            {user ? getUserFirstName(user) : 'Entrar'}
          </Link>
        </nav>
      </div>
    </header>
  )
}
