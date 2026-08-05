import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ColorSelector } from '@/components/product/ColorSelector'
import { ProductCard } from '@/components/product/ProductCard'
import { SizeSelector } from '@/components/product/SizeSelector'
import { formatPrice } from '@/lib/format'
import { getProductBySlug, getProductsByCategory } from '@/lib/products'
import { categoryLabels } from '@/types/product'

export function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug)

  const [size, setSize] = useState<string | null>(null)
  const [colorId, setColorId] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)

  // Reinicia seleção ao trocar de peça
  useEffect(() => {
    setSize(null)
    setColorId(product?.colors[0]?.id ?? null)
    setActiveImage(0)
    window.scrollTo(0, 0)
  }, [product])

  const related = useMemo(() => {
    if (!product) return []
    return getProductsByCategory(product.category)
      .filter((p) => p.id !== product.id)
      .slice(0, 3)
  }, [product])

  if (!product) {
    return (
      <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col items-center justify-center px-5 pt-24 text-center md:px-8">
        <h1 className="font-display text-3xl font-bold md:text-5xl">
          Peça não encontrada
        </h1>
        <p className="mt-4 max-w-md font-body text-ink-muted">
          Esta peça saiu de linha ou o link está incorreto.
        </p>
        <div className="mt-8">
          <Button to="/colecao" variant="ghost" size="lg">
            Ver coleção
          </Button>
        </div>
      </div>
    )
  }

  const canAdd = Boolean(size && colorId)

  return (
    <div className="pt-20 md:pt-24">
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
        <nav className="font-body text-sm text-ink-muted" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/colecao" className="hover:text-ink">
                Coleção
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                to={`/colecao?categoria=${product.category}`}
                className="hover:text-ink"
              >
                {categoryLabels[product.category]}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="aspect-[3/4] overflow-hidden bg-ink-soft">
              <img
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <ul className="mt-3 flex gap-3">
                {product.images.map((src, index) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setActiveImage(index)}
                      aria-label={`Imagem ${index + 1}`}
                      aria-current={activeImage === index}
                      className={[
                        'aspect-square w-20 overflow-hidden transition-opacity',
                        activeImage === index
                          ? 'opacity-100 ring-2 ring-ink ring-offset-2 ring-offset-fog'
                          : 'opacity-60 hover:opacity-100',
                      ].join(' ')}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:pt-4">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-moss-bright">
              {categoryLabels[product.category]}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 font-display text-2xl font-semibold text-ink">
              {formatPrice(product.priceCents)}
            </p>
            <p className="mt-6 font-body leading-relaxed text-ink-muted">
              {product.description}
            </p>

            <div className="mt-8 space-y-6">
              <ColorSelector
                colors={product.colors}
                value={colorId}
                onChange={setColorId}
              />
              <SizeSelector
                sizes={product.sizes}
                value={size}
                onChange={setSize}
              />
            </div>

            <div className="mt-8">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                disabled={!canAdd}
                title={
                  canAdd
                    ? 'Carrinho disponível na etapa 3'
                    : 'Selecione tamanho e cor'
                }
              >
                {canAdd ? 'Adicionar ao carrinho' : 'Selecione tamanho e cor'}
              </Button>
              <p className="mt-3 font-body text-xs text-ink-muted">
                Carrinho e checkout chegam na próxima etapa. Por enquanto, teste
                a seleção de tamanho e cor.
              </p>
            </div>

            {(product.fabric || product.care) && (
              <dl className="mt-10 space-y-4 border-t border-ink/10 pt-8">
                {product.fabric && (
                  <div>
                    <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      Composição
                    </dt>
                    <dd className="mt-1 font-body text-sm text-ink">
                      {product.fabric}
                    </dd>
                  </div>
                )}
                {product.care && (
                  <div>
                    <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      Cuidados
                    </dt>
                    <dd className="mt-1 font-body text-sm text-ink">
                      {product.care}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20 border-t border-ink/10 pt-14 md:mt-28">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Mais em {categoryLabels[product.category].toLowerCase()}
            </h2>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
