import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductGrid } from '@/components/product/ProductGrid'
import { filterProducts, parseCategoryParam } from '@/lib/products'
import {
  categoryLabels,
  categoryNotes,
  type ProductCategory,
} from '@/types/product'

const filters: Array<{ id: ProductCategory | 'todos'; label: string }> = [
  { id: 'todos', label: 'Todas' },
  { id: 'camisas', label: categoryLabels.camisas },
  { id: 'calcas', label: categoryLabels.calcas },
  { id: 'camadas', label: categoryLabels.camadas },
]

export function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = parseCategoryParam(searchParams.get('categoria'))

  const products = useMemo(() => filterProducts(category), [category])

  const subtitle = category
    ? categoryNotes[category]
    : 'Peças para vestir o corte — filtre por eixo ou explore tudo.'

  function setFilter(id: ProductCategory | 'todos') {
    if (id === 'todos') {
      setSearchParams({}, { replace: true })
      return
    }
    setSearchParams({ categoria: id }, { replace: true })
  }

  return (
    <div className="pt-24 md:pt-28">
      <header className="border-b border-ink/10 bg-paper/80">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
            Catálogo
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {category ? categoryLabels[category] : 'Coleção'}
          </h1>
          <p className="mt-4 max-w-lg font-body text-ink-muted md:text-lg">
            {subtitle}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div
          className="flex flex-wrap gap-2 border-b border-ink/10 pb-6"
          role="tablist"
          aria-label="Filtrar por categoria"
        >
          {filters.map((filter) => {
            const active =
              filter.id === 'todos' ? category === null : filter.id === category
            return (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(filter.id)}
                className={[
                  'px-4 py-2 font-body text-sm font-medium transition-colors duration-200',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss',
                  active
                    ? 'bg-ink text-fog'
                    : 'text-ink-muted hover:text-ink',
                ].join(' ')}
              >
                {filter.label}
              </button>
            )
          })}
        </div>

        <p className="mt-6 font-body text-sm text-ink-muted">
          {products.length}{' '}
          {products.length === 1 ? 'peça' : 'peças'}
        </p>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>

        <p className="mt-16 text-center font-body text-sm text-ink-muted">
          <Link to="/" className="underline decoration-brass/60 underline-offset-4 hover:text-ink">
            Voltar ao início
          </Link>
        </p>
      </div>
    </div>
  )
}
