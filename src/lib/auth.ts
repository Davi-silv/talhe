import type { User } from '@supabase/supabase-js'

export function getUserDisplayName(user: User | null): string {
  if (!user) return ''

  const metadataName =
    typeof user.user_metadata?.full_name === 'string'
      ? user.user_metadata.full_name.trim()
      : ''

  if (metadataName) return metadataName

  const emailName = user.email?.split('@')[0]?.replace(/[._-]+/g, ' ')
  return emailName ? capitalizeWords(emailName) : 'Conta'
}

export function getUserFirstName(user: User | null): string {
  const full = getUserDisplayName(user)
  return full.split(' ')[0] || 'Conta'
}

export function mapAuthError(message: string): string {
  const value = message.toLowerCase()

  if (value.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.'
  }
  if (value.includes('user already registered')) {
    return 'Este e-mail já possui uma conta TALHE.'
  }
  if (value.includes('password should be at least')) {
    return 'A senha precisa ter pelo menos 6 caracteres.'
  }
  if (value.includes('email not confirmed')) {
    return 'Confirme seu e-mail antes de entrar.'
  }
  if (value.includes('rate limit') || value.includes('too many')) {
    return 'Muitas tentativas. Aguarde um momento e tente de novo.'
  }
  if (value.includes('unable to validate email')) {
    return 'Informe um e-mail válido.'
  }

  return 'Não foi possível concluir agora. Tente novamente.'
}

function capitalizeWords(value: string): string {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
