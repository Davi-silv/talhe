import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/product/ProductCard'
import { brand } from '@/lib/brand'
import { getFeaturedProducts } from '@/lib/products'
import {
  categoryLabels,
  categoryNotes,
  type ProductCategory,
} from '@/types/product'

const collections: Array<{
  id: ProductCategory
  image: string
}> = [
  {
    id: 'camisas',
    image:
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'calcas',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'camadas',
    image:
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=900&q=80',
  },
]

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1920&q=80'

export function HomePage() {
  const featured = getFeaturedProducts(6)

  return (
    <>
      <section className="relative isolate flex min-h-svh items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={HERO_IMAGE}
            alt=""
            className="animate-kenburns h-full w-full object-cover object-[center_20%]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(63_79_58_/0.35),transparent_55%)]"
            aria-hidden
          />
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-36">
          <p className="animate-rise font-display text-5xl font-extrabold tracking-tight text-fog sm:text-6xl md:text-8xl lg:text-9xl">
            {brand.name}
          </p>

          <div
            className="animate-line-grow mt-5 h-px w-24 origin-left bg-brass md:w-32"
            aria-hidden
          />

          <h1 className="animate-rise-delay-1 mt-6 max-w-xl font-display text-2xl font-semibold leading-tight text-fog sm:text-3xl md:text-4xl">
            {brand.tagline}
          </h1>

          <p className="animate-rise-delay-2 mt-4 max-w-md font-body text-base text-stone/90 md:text-lg">
            Roupas masculinas com silhueta consciente — do alfaiate à rua, sem
            excesso.
          </p>

          <div className="animate-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <Button to="/colecao" variant="primary" size="lg">
              Ver coleção
            </Button>
            <Button href="/#corte" variant="secondary" size="lg">
              Entender o corte
            </Button>
          </div>
        </div>
      </section>

      <section id="colecao" className="scroll-mt-24 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Coleção
          </h2>
          <p className="mt-3 max-w-lg font-body text-ink-muted md:text-lg">
            Três eixos. Cada peça começa pelo talhe — a forma que veste o corpo
            com intenção.
          </p>

          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {collections.map((item, index) => (
              <li key={item.id}>
                <Link
                  to={`/colecao?categoria=${item.id}`}
                  className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-moss"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-ink-soft">
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                      aria-hidden
                    />
                    <span className="absolute bottom-4 left-4 font-display text-2xl font-bold text-fog">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">
                    {categoryLabels[item.id]}
                  </h3>
                  <p className="mt-1 font-body text-sm text-ink-muted">
                    {categoryNotes[item.id]}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
                Em destaque
              </h2>
              <p className="mt-3 max-w-md font-body text-ink-muted md:text-lg">
                Seleção da temporada — corte, tecido e cor em equilíbrio.
              </p>
            </div>
            <Button to="/colecao" variant="ghost" size="md">
              Ver tudo
            </Button>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="corte"
        className="scroll-mt-24 py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:items-center md:gap-16 md:px-8">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-moss-bright">
              O corte
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl">
              Menos volume. Mais presença.
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ink-muted md:text-lg">
              TALHE nasce da ideia de que o caimento é o primeiro detalhe que se
              nota — e o último que se esquece. Selecionamos proporções
              contemporâneas para o homem brasileiro: conforto real, linha
              limpa, zero teatro.
            </p>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-4 -z-10 bg-[radial-gradient(circle_at_center,rgb(63_79_58_/0.15),transparent_70%)]"
              aria-hidden
            />
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
              alt="Homem de terno em ambiente urbano"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            Pronto para vestir o corte certo?
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-ink-muted md:text-lg">
            Explore o catálogo completo e escolha tamanho e cor em cada detalhe.
          </p>
          <div className="mt-8 flex justify-center">
            <Button to="/colecao" variant="ghost" size="lg">
              Ir para a coleção
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
