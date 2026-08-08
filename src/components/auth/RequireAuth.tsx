import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function RequireAuth() {
  const { user, loading, configured } = useAuth()
  const location = useLocation()

  if (!configured) {
    return <Outlet />
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60svh] max-w-6xl items-center justify-center px-5 pt-24">
        <p className="font-body text-ink-muted">Carregando sua conta…</p>
      </div>
    )
  }

  if (!user) {
    const next = `${location.pathname}${location.search}`
    return <Navigate to={`/entrar?next=${encodeURIComponent(next)}`} replace />
  }

  return <Outlet />
}
