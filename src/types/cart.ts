/** Linha do carrinho — chave = produto + tamanho + cor. */
export type CartItem = {
  productId: string
  slug: string
  name: string
  image: string
  size: string
  colorId: string
  colorName: string
  priceCents: number
  quantity: number
}

export type CartDraft = Omit<CartItem, 'quantity'> & {
  quantity?: number
}
