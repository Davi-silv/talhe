import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ColorSelector } from '@/components/product/ColorSelector'
import { ProductCard } from '@/components/product/ProductCard'
import { SizeSelector } from '@/components/product/SizeSelector'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/format'
import { getProductBySlug, getProductsByCategory } from '@/lib/products'
import { categoryLabels } from '@/types/product'

export function ProductPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const product = getProductBySlug(slug)
  const { addItem } = useCart()

  const [size, setSize] = useState<string | null>(null)
  const [colorId, setColorId] = useState<string | null>(null)
  const [activeImage, setActiveImage] = useState(0)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    setJustAdded(false)
  }, [size, colorId])

  // Reinicia seleção ao trocar de peça
  useEffect(() => {
    setSize(null)
    setColorId(product?.colors[0]?.id ?? null)
    setActiveImage(0)
    setJustAdded(false)
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

  const selectedProduct = product
  const selectedColor = selectedProduct.colors.find((color) => color.id === colorId)
  const canAdd = Boolean(size && selectedColor)

  function handleAddToCart() {
    if (!size || !selectedColor) return

    addItem({
      productId: selectedProduct.id,
      slug: selectedProduct.slug,
      name: selectedProduct.name,
      image: selectedProduct.images[0] ?? '',
      size,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      priceCents: selectedProduct.priceCents,
    })
    setJustAdded(true)
  }

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
                to={`/colecao?categoria=${selectedProduct.category}`}
                className="hover:text-ink"
              >
                {categoryLabels[selectedProduct.category]}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-ink">{selectedProduct.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="aspect-[3/4] overflow-hidden bg-ink-soft">
              <img
                src={selectedProduct.images[activeImage] ?? selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>
            {selectedProduct.images.length > 1 && (
              <ul className="mt-3 flex gap-3">
                {selectedProduct.images.map((src, index) => (
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
              {categoryLabels[selectedProduct.category]}
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
              {selectedProduct.name}
            </h1>
            <p className="mt-4 font-display text-2xl font-semibold text-ink">
              {formatPrice(selectedProduct.priceCents)}
            </p>
            <p className="mt-6 font-body leading-relaxed text-ink-muted">
              {selectedProduct.description}
            </p>

            <div className="mt-8 space-y-6">
              <ColorSelector
                colors={selectedProduct.colors}
                value={colorId}
                onChange={setColorId}
              />
              <SizeSelector
                sizes={selectedProduct.sizes}
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
                onClick={handleAddToCart}
                title={
                  canAdd ? 'Adicionar à sacola' : 'Selecione tamanho e cor'
                }
              >
                {!canAdd
                  ? 'Selecione tamanho e cor'
                  : justAdded
                    ? 'Adicionado à sacola'
                    : 'Adicionar ao carrinho'}
              </Button>
              <p className="mt-3 font-body text-xs text-ink-muted">
                A sacola guarda suas peças neste navegador até o checkout.
              </p>
            </div>

            {(selectedProduct.fabric || selectedProduct.care) && (
              <dl className="mt-10 space-y-4 border-t border-ink/10 pt-8">
                {selectedProduct.fabric && (
                  <div>
                    <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      Composição
                    </dt>
                    <dd className="mt-1 font-body text-sm text-ink">
                      {selectedProduct.fabric}
                    </dd>
                  </div>
                )}
                {selectedProduct.care && (
                  <div>
                    <dt className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
                      Cuidados
                    </dt>
                    <dd className="mt-1 font-body text-sm text-ink">
                      {selectedProduct.care}
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
              Mais em {categoryLabels[selectedProduct.category].toLowerCase()}
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
