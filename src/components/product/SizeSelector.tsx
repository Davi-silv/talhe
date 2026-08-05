type SizeSelectorProps = {
  sizes: string[]
  value: string | null
  onChange: (size: string) => void
}

export function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  return (
    <fieldset>
      <legend className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Tamanho
      </legend>
      <div className="mt-3 flex flex-wrap gap-2" role="listbox" aria-label="Tamanhos">
        {sizes.map((size) => {
          const selected = value === size
          return (
            <button
              key={size}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onChange(size)}
              className={[
                'min-w-12 px-3 py-2 font-body text-sm font-medium transition-colors duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss',
                selected
                  ? 'bg-ink text-fog'
                  : 'bg-transparent text-ink border border-ink/20 hover:border-ink',
              ].join(' ')}
            >
              {size}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}
