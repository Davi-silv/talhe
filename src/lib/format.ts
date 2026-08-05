const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

/** Formata centavos para moeda brasileira. */
export function formatPrice(priceCents: number): string {
  return brl.format(priceCents / 100)
}
