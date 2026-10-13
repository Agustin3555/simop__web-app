import './Combobox.css'
import { useState } from 'react'
import { Icon } from '@/components'
import { Dropdown } from '..'

export interface ComboboxOption {
  value: string
  label: string
}

interface ComboboxBaseProps {
  name: string
  options: ComboboxOption[]
  required?: boolean
}

type ComboboxProps = ComboboxBaseProps &
  (
    | {
        selected: string[]
        onChange: (selected: string[]) => void
      }
    | {
        selected?: never
        onChange?: never
      }
  )

export const Combobox = (props: ComboboxProps) => {
  const { name, options, required = false } = props

  const [internalSelected, setInternalSelected] = useState<string[]>([])

  const selected = props.selected ?? internalSelected

  const handleOptionClick = (value: string) => () => {
    const checked = selected.includes(value)

    const nextSelected = checked
      ? selected.filter(selectedValue => selectedValue !== value)
      : [...selected, value]

    if (props.selected === undefined) setInternalSelected(nextSelected)
    else props.onChange(nextSelected)
  }

  return (
    <Dropdown
      handlingClass="cmp-combobox"
      opener={attrs => (
        <button type="button" {...attrs}>
          {selected.length === 0 && (
            <label className="null-option">
              <input type="checkbox" {...{ required }} />
              Selecciona un lenguaje
            </label>
          )}
          {selected.map(value => {
            const data = options.find(o => o.value === value)
            if (!data) return null

            const { label } = data

            return (
              <div key={value} className="selected-option">
                {label}
                <label
                  onClick={e => {
                    e.preventDefault()
                    handleOptionClick(value)()
                  }}
                >
                  <Icon faIcon="fa-solid fa-xmark" />
                  <input
                    type="checkbox"
                    checked
                    hidden
                    {...{ name, value, required }}
                  />
                </label>
              </div>
            )
          })}
        </button>
      )}
    >
      {options.map(o => (
        <button
          type="button"
          key={o.value}
          onClick={handleOptionClick(o.value)}
        >
          {o.label}
        </button>
      ))}
    </Dropdown>
  )
}
