import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { getUserDisplayName } from '@/lib/auth'

export function AccountPage() {
  const { user, configured, signOut } = useAuth()
  const [signingOut, setSigningOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignOut() {
    setError(null)
    setSigningOut(true)
    try {
      await signOut()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível sair.')
      setSigningOut(false)
    }
  }

  if (!configured) {
    return (
      <div className="mx-auto max-w-3xl px-5 pt-28 md:px-8 md:pt-32">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
          Conta
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Auth em configuração
        </h1>
        <p className="mt-4 max-w-lg font-body text-ink-muted md:text-lg">
          Preencha <code className="text-ink">VITE_SUPABASE_URL</code> e{' '}
          <code className="text-ink">VITE_SUPABASE_ANON_KEY</code> em{' '}
          <code className="text-ink">.env.local</code> para ativar login e
          cadastro.
        </p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const createdAt = user.created_at
    ? new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }).format(new Date(user.created_at))
    : null

  return (
    <div className="pt-24 md:pt-28">
      <header className="border-b border-ink/10 bg-paper/80">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
            Conta
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {getUserDisplayName(user)}
          </h1>
          <p className="mt-4 max-w-lg font-body text-ink-muted md:text-lg">
            Seus dados de acesso. Pedidos entram na próxima etapa.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <dl className="max-w-xl space-y-8">
          <div>
            <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
              E-mail
            </dt>
            <dd className="mt-2 font-body text-lg text-ink">{user.email}</dd>
          </div>
          {createdAt ? (
            <div>
              <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Desde
              </dt>
              <dd className="mt-2 font-body text-lg text-ink">{createdAt}</dd>
            </div>
          ) : null}
        </dl>

        {error ? <p className="mt-8 font-body text-sm text-moss">{error}</p> : null}

        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/colecao" variant="ghost">
            Continuar comprando
          </Button>
          <Button
            variant="primary"
            onClick={handleSignOut}
            disabled={signingOut}
          >
            {signingOut ? 'Saindo…' : 'Sair'}
          </Button>
        </div>

        <p className="mt-8 font-body text-sm text-ink-muted">
          <Link
            to="/carrinho"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Ver sacola
          </Link>
        </p>
      </div>
    </div>
  )
}
