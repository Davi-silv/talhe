import { type FormEvent, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AuthScreen } from '@/components/auth/AuthScreen'
import { Field } from '@/components/auth/Field'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export function RegisterPage() {
  const { user, loading, configured, signUp } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/conta" replace />
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setInfo(null)
    setSubmitting(true)

    try {
      const result = await signUp({
        name: name.trim(),
        email: email.trim(),
        password,
      })

      if (result.needsEmailConfirmation) {
        setInfo(
          'Conta criada. Confirme o e-mail enviado pelo Supabase para entrar.',
        )
        return
      }

      navigate('/conta', { replace: true })
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Não foi possível criar a conta.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthScreen
      eyebrow="Conta"
      title="Criar conta"
      subtitle="Cadastre-se para guardar pedidos e acelerar o checkout."
      footer={
        <>
          Já tem conta?{' '}
          <Link
            to="/entrar"
            className="text-ink underline decoration-ink/20 underline-offset-4 hover:decoration-ink"
          >
            Entrar
          </Link>
        </>
      }
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        <Field
          id="register-name"
          label="Nome"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <Field
          id="register-email"
          label="E-mail"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Field
          id="register-password"
          label="Senha"
          type="password"
          autoComplete="new-password"
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {error ? <p className="font-body text-sm text-moss">{error}</p> : null}
        {info ? <p className="font-body text-sm text-ink">{info}</p> : null}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={!configured || submitting}
        >
          {submitting ? 'Criando…' : 'Criar conta'}
        </Button>
      </form>
    </AuthScreen>
  )
}
