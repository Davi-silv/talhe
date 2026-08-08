import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { getUserFirstName } from '@/lib/auth'

type AccountLinkProps = {
  solid: boolean
  onNavigate?: () => void
}

export function AccountLink({ solid, onNavigate }: AccountLinkProps) {
  const { user, loading } = useAuth()

  const className = [
    'hidden font-body text-sm font-medium tracking-wide transition-colors md:inline',
    solid ? 'text-ink-muted hover:text-ink' : 'text-stone/80 hover:text-fog',
  ].join(' ')

  if (loading) {
    return <span className={className}>Conta</span>
  }

  if (user) {
    return (
      <Link to="/conta" className={className} onClick={onNavigate}>
        {getUserFirstName(user)}
      </Link>
    )
  }

  return (
    <Link to="/entrar" className={className} onClick={onNavigate}>
      Entrar
    </Link>
  )
}
