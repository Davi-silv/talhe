import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

type AuthScreenProps = {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthScreen({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthScreenProps) {
  const { configured } = useAuth()

  return (
    <div className="pt-24 md:pt-28">
      <div className="mx-auto max-w-xl px-5 py-12 md:px-8 md:py-16">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 font-body text-ink-muted md:text-lg">{subtitle}</p>

        {!configured && (
          <p className="mt-8 border-l-2 border-brass pl-4 font-body text-sm text-ink-muted">
            Auth ainda sem credenciais. Crie um projeto no Supabase, copie{' '}
            <code className="font-medium text-ink">.env.example</code> para{' '}
            <code className="font-medium text-ink">.env.local</code> e reinicie o
            servidor.
          </p>
        )}

        <div className="mt-10">{children}</div>

        {footer ? (
          <p className="mt-10 font-body text-sm text-ink-muted">{footer}</p>
        ) : null}

        <p className="mt-8 font-body text-sm text-ink-muted">
          <Link
            to="/colecao"
            className="underline decoration-ink/20 underline-offset-4 hover:text-ink"
          >
            Continuar na coleção
          </Link>
        </p>
      </div>
    </div>
  )
}
