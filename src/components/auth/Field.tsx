import type { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export function Field({ label, id, className = '', ...rest }: FieldProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </span>
      <input
        id={id}
        className={[
          'mt-2 w-full border-0 border-b border-ink/20 bg-transparent py-3 font-body text-base text-ink',
          'placeholder:text-ink-muted/60',
          'focus:border-ink focus:outline-none',
          className,
        ].join(' ')}
        {...rest}
      />
    </label>
  )
}
