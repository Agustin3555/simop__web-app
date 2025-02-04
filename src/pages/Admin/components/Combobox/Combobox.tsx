import { MouseEventHandler, useCallback, useState } from 'react'
import {
  ComboboxProps,
  useAddFieldReset,
  useCombobox,
  useInputHandler,
} from '../../hooks'
import { Button } from '@/components'
import { ComboboxLayout } from '..'
import { Ref } from '@/types'

// TODO: agregar un botón para actualizar las opciones

const Combobox = ({
  name,
  title,
  multiple = false,
  required = false,
  getForConnect,
  long,
}: ComboboxProps) => {
  const [selected, setSelected] = useState<Ref[]>([])
  const { basicProps, options, sortedOptions } = useCombobox({
    title,
    required,
    getForConnect,
    long,
  })

  useAddFieldReset(() => setSelected([]))

  const handleOptionChange = useInputHandler(id => {
    const newSelected = options.find(option => String(option.id) === id)

    setSelected(
      multiple
        ? prev => {
            const exists = prev.some(item => item.id === Number(id))

            return exists
              ? prev.filter(item => item.id !== Number(id))
              : [...prev, newSelected]
          }
        : [newSelected],
    )
  })

  const handleDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    event => {
      // Evita que se dispare el evento de click del elemento padre (header)
      event.stopPropagation()

      const { name: id } = event.currentTarget

      setSelected(prev => prev.filter(item => item.id !== Number(id)))
    },
    [],
  )

  return (
    <ComboboxLayout
      {...{ basicProps }}
      selection={
        <div className="selected-items">
          {selected.map(({ id, title }) => (
            <div key={id} className="item">
              <p>{title}</p>
              <Button
                title="Eliminar"
                faIcon="fa-solid fa-xmark"
                name={String(id)}
                type="button"
                hideText
                onClick={handleDeleteClick}
              />
            </div>
          ))}
        </div>
      }
      fieldset={
        <fieldset className="drop-down">
          {sortedOptions?.map(({ id, title }) => (
            <label key={id} className="option">
              {title}
              <input
                type={multiple ? 'checkbox' : 'radio'}
                value={id}
                name={name}
                checked={selected.some(item => item.id === id)}
                // BUG: si se usa {...{ required }} y es true, dará un error al no ser focusable
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
