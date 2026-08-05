import type { ProductColor } from '@/types/product'

type ColorSelectorProps = {
  colors: ProductColor[]
  value: string | null
  onChange: (colorId: string) => void
}

export function ColorSelector({ colors, value, onChange }: ColorSelectorProps) {
  const selected = colors.find((c) => c.id === value)

  return (
    <fieldset>
      <legend className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Cor{selected ? ` — ${selected.name}` : ''}
      </legend>
      <div className="mt-3 flex flex-wrap gap-3" role="listbox" aria-label="Cores">
        {colors.map((color) => {
          const isSelected = value === color.id
          return (
            <button
              key={color.id}
              type="button"
              role="option"
              aria-selected={isSelected}
              aria-label={color.name}
              title={color.name}
              onClick={() => onChange(color.id)}
              className={[
                'h-9 w-9 rounded-full transition-transform duration-200',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss',
                isSelected ? 'scale-110 ring-2 ring-ink ring-offset-2 ring-offset-fog' : 'hover:scale-105',
              ].join(' ')}
              style={{ backgroundColor: color.hex }}
            />
          )
        })}
      </div>
    </fieldset>
  )
}
