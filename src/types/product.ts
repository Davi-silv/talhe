/** Categorias alinhadas à vitrine da home. */
export type ProductCategory = 'camisas' | 'calcas' | 'camadas'

export type ProductColor = {
  id: string
  name: string
  /** Hex para o seletor visual */
  hex: string
}

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  /** Preço em centavos (evita float) */
  priceCents: number
  category: ProductCategory
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  /** Destaque na home / grid */
  featured?: boolean
  fabric?: string
  care?: string
}

export const categoryLabels: Record<ProductCategory, string> = {
  camisas: 'Camisas',
  calcas: 'Calças',
  camadas: 'Camadas',
}

export const categoryNotes: Record<ProductCategory, string> = {
  camisas: 'Linhas limpas, tecidos que respiram.',
  calcas: 'Queda reta e conforto estruturado.',
  camadas: 'Jaquetas e malhas para o clima urbano.',
}
