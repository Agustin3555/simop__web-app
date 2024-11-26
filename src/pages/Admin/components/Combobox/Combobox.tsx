import { MouseEventHandler, useCallback, useState } from 'react'
import { ComboboxProps, useCombobox, useInputHandler } from '../../hooks'
import { Button } from '@/components'
import { ComboboxLayout } from '..'
import { Ref } from '../../types'

// TODO: agregar un botón para actualizar las opciones

const Combobox = ({
  name,
  title,
  required = false,
  provider,
}: ComboboxProps) => {
  const [selected, setSelected] = useState<Ref>()
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
