import { MouseEventHandler, useCallback, useState } from 'react'
import {
  ComboboxProps,
  Options,
  useCombobox,
  useInputHandler,
} from '../../hooks'
import { Button } from '@/components'
import { ComboboxLayout } from '..'

const init: Options[] = [
  { id: 1, title: 'Aloe vera' },
  { id: 2, title: 'Lavandula angustifolia' },
  { id: 3, title: 'Rosmarinus officinalis' },
  { id: 4, title: 'Echinacea purpurea' },
  { id: 5, title: 'Cucumis sativus' },
  { id: 6, title: 'Capsicum annuum' },
  { id: 7, title: 'Solanum lycopersicum' },
  { id: 8, title: 'Mentha piperita' },
  { id: 9, title: 'Ocimum basilicum' },
  { id: 10, title: 'Zingiber officinale' },
  { id: 11, title: 'Coffea arabica' },
  { id: 12, title: 'Malus domestica' },
  { id: 13, title: 'Ficus elastica' },
  { id: 14, title: 'Allium sativum' },
  { id: 15, title: 'Chamaedorea elegans' },
  { id: 16, title: 'Spathiphyllum cochlearispathum' },
  { id: 17, title: 'Bambusa vulgaris' },
  { id: 18, title: 'Neoregalia spp.' },
  { id: 19, title: 'Lilium longiflorum' },
  { id: 20, title: 'Carica papaya' },
]

// TODO: agregar un botón para actualizar las opciones

const Combobox = ({
  name,
  title,
  required = false,
  provider,
}: ComboboxProps) => {
  const [selected, setSelected] = useState<Options>()
  const { basicProps, options, sortedOptions } = useCombobox({
    title,
    required,
    provider,
  })

  const handleOptionChange = useInputHandler(newSelectedId => {
    const newSelected = options.find(({ id }) => String(id) === newSelectedId)

    setSelected(newSelected)
  })

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      // Evita que se dispare el evento de click del elemento padre (header)
      event.stopPropagation()

      setSelected(undefined)
    },
    []
  )

  return (
    <ComboboxLayout
      {...{ basicProps }}
      selection={
        <div className="selected-items">
          {selected && (
            <div className="item">
              <p>{selected.title}</p>
              <Button
                title="Eliminar"
                faIcon="fa-solid fa-xmark"
                hideText
                onClick={handleDeleteClick}
              />
            </div>
          )}
        </div>
      }
      fieldset={
        <fieldset className="drop-down">
          {sortedOptions?.map(({ id, title }) => (
            <label key={id} className="option">
              {title}
              <input
                type="radio"
                value={id}
                name={name}
                checked={selected ? id === selected.id : false}
                {...{ required }}
                onChange={handleOptionChange}
              />
            </label>
          ))}
        </fieldset>
      }
    />
  )
}

export default Combobox
