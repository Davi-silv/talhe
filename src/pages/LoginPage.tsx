import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { AuthScreen } from '@/components/auth/AuthScreen'
import { Field } from '@/components/auth/Field'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const { user, loading, configured, signIn } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') || '/conta'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to={next} replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSubmitting(true)

    try {
      await signIn(email.trim(), password)
      navigate(next, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível entrar.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthScreen
      eyebrow="Conta"
      title="Entrar"
      subtitle="Acesse seus dados para acompanhar pedidos e finalizar o checkout."
      footer={
        <>
          Ainda não tem conta?{' '}
          <Link
            to="/criar-conta"
            className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
          >
            Criar conta
          </Link>
        </>
      }
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <Field
          id="login-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Field
          id="login-password"
          label="Senha"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? <p className="font-body text-sm text-moss">{error}</p> : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={!configured || submitting}
        >
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </AuthScreen>
  )
}
