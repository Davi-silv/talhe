import { Link } from 'react-router-dom'
import { brand } from '@/lib/brand'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contato" className="mt-auto border-t border-ink/10 bg-ink text-stone">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8 md:py-20">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight text-fog md:text-4xl">
            {brand.name}
          </p>
          <p className="mt-4 max-w-md font-body text-base text-stone-dim">
            {brand.description}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              Navegação
            </p>
            <ul className="mt-4 space-y-3 font-body text-sm text-stone">
              <li>
                <Link to="/colecao" className="transition-colors hover:text-fog">
                  Coleção
                </Link>
              </li>
              <li>
                <Link to="/carrinho" className="transition-colors hover:text-fog">
                  Carrinho
                </Link>
              </li>
              <li>
                <a href="/#corte" className="transition-colors hover:text-fog">
                  O corte
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-brass">
              Contato
            </p>
            <ul className="mt-4 space-y-3 font-body text-sm text-stone">
              <li>
                <a
                  href="mailto:ola@talhe.store"
                  className="transition-colors hover:text-fog"
                >
                  ola@talhe.store
                </a>
              </li>
              <li>
                <span className="text-stone-dim">São Paulo — BR</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-fog/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 font-body text-xs text-stone-dim md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {year} {brand.name}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por{' '}
            <a
              href={brand.github}
              target="_blank"
              rel="noreferrer"
              className="text-stone transition-colors hover:text-fog"
            >
              {brand.author}
            </a>
            {' · '}
            <span className="text-stone">{brand.agency}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
