import './SelectedOptions.css'
import { Icon } from '@/components'

interface SelectedOptionsProps {
  options: { value: string; label: string }[]
  selected: string[]
  staticSelected: string[]
  multiple: boolean
  onRemove: (value: string) => void
}

export const SelectedOptions = ({
  options,
  selected,
  staticSelected,
  multiple,
  onRemove,
}: SelectedOptionsProps) => {
  return (
    <div className="cmp-selected-options" aria-live="polite">
      {selected.length === 0 ? (
        <span>
          Selecciona una {multiple ? 'o varias opciones' : 'opción'}...
        </span>
      ) : (
        selected.map(value => {
          const option = options.find(o => o.value === value)
          if (!option) return null

          const { label } = option

          return (
            <div key={value} className="chip" title={label}>
              <span>{label}</span>
              {!staticSelected.includes(value) && (
                <button
                  type="button"
                  title={`Eliminar ${label}`}
                  onClick={event => {
                    event.preventDefault()
                    onRemove(value)
                  }}
                >
                  <Icon faIcon="fa-solid fa-xmark" />
                </button>
              )}
            </div>
          )
        })
      )}
    </div>
  )
}
