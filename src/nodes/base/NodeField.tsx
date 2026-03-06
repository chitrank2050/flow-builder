import type { CSSProperties } from 'react'

type FieldType = 'text' | 'select' | 'textarea' | 'number' | 'readonly'

interface SelectOption {
  value: string
  label?: string
}

export interface BaseField {
  id: string
  type: FieldType
  label?: string
  value?: string
  placeholder?: string
  rows?: number
  options?: SelectOption[] | string[]
  onChange?: (value: string) => void
}

type Props = {
  field: BaseField
  accentColor: string
}

// Field Renderer
export default function NodeField({ field, accentColor }: Props) {
  const style = { '--accent': accentColor } as CSSProperties

  if (field.type === 'select') {
    return (
      <div className="node-field">
        {field.label && <span className="field-label">{field.label}</span>}
        <select
          className="field-select"
          value={field.value}
          onChange={(e) => field.onChange?.(e.target.value)}
          style={style}
        >
          {field.options?.map((opt) => {
            if (typeof opt === 'string') {
              return (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              )
            }

            return (
              <option key={opt.value} value={opt.value}>
                {opt.label ?? opt.value}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  if (field.type === 'textarea') {
    return (
      <div className="node-field">
        {field.label && <span className="field-label">{field.label}</span>}
        <textarea
          className="field-textarea"
          value={field.value}
          onChange={(e) => field.onChange?.(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 3}
          style={style}
        />
      </div>
    )
  }

  if (field.type === 'readonly') {
    return (
      <div className="node-field">
        {field.label && <span className="field-label">{field.label}</span>}
        <div className="field-input" style={{ color: 'var(--color-neutral-500)', ...style }}>
          {field.value || '—'}
        </div>
      </div>
    )
  }

  return (
    <div className="node-field">
      {field.label && <span className="field-label">{field.label}</span>}
      <input
        className="field-input"
        type={field.type === 'number' ? 'number' : 'text'}
        value={field.value}
        onChange={(e) => field.onChange?.(e.target.value)}
        placeholder={field.placeholder}
        style={style}
      />
    </div>
  )
}
