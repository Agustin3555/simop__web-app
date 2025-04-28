import './BaseCombobox.css'
import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControl } from '@/hooks'
import { useInputHandler } from '../../hooks'
import { Control } from '@/types'
import { Button, ControlLabel, Icon } from '@/components'
import { Option } from './components'
import { OptionProps } from './components/Option/Option'
import { classList } from '@/helpers'

export interface BaseComboboxProps extends Control {
  multiple?: boolean
  reduceHeader?: boolean

  search: string
  setSearch: Dispatch<SetStateAction<string>>
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>

  fullSelection?: string[]
  sortedOptions: Pick<OptionProps, 'id' | 'fields'>[]
  getItemTitle: (id: string) => string
  handleReset?: () => void
  handleEnter?: () => void

  modeSlot?: ReactNode
  searchSlot?: ReactNode
}

const BaseCombobox = ({
  keyName,
  title,
  hideLabel = false,
  required = false,
  editMode = false,
  long,
  multiple = false,
  reduceHeader = false,

  search,
  setSearch,
  selected,
  setSelected,

  fullSelection,
  sortedOptions,
  getItemTitle,
  handleEnter,
  handleReset,

  modeSlot,
  searchSlot,
}: BaseComboboxProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const [open, setOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null)

  const isVoid = useMemo(() => !fullSelection?.length, [fullSelection])

  const toggleItem = useCallback(
    (id: string) => {
      setSelected(prev => {
        if (!prev) return [id]

        const exists = prev.includes(id)

        if (multiple)
          return exists
            ? prev.filter(selectedId => selectedId !== id)
            : [...prev, id]

        return exists ? [] : [id]
      })

      if (!multiple) setOpen(false)
    },
    [multiple],
  )

  const handleHeaderClick = useCallback(() => setOpen(prev => !prev), [])

  const handleSearchChange = useInputHandler(value => setSearch(value))

  const handleOptionChange = useInputHandler(value => toggleItem(value))

  const handleDeselectItemClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(event => {
    // Evita que se dispare el evento de click del elemento padre (header)
    event.stopPropagation()

    toggleItem(event.currentTarget.name)
  }, [])

  const handleCheckAllChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(event => setSelected(event.target.checked ? [] : fullSelection!), [])

  const handleResetClick = useCallback(() => {
    editMode && handleReset ? handleReset() : setSelected([])
  }, [])

  useEffect(() => {
    const component = componentRef.current

    const handleClick = (event: MouseEvent) => {
      // Cierra el componente si se produce un click fuera del propio elemento
      if (component && !component.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      ref={componentRef}
      className={classList(
        'cmp-base-combobox',
        'control',
        long || (multiple ? 'l' : 'm'),
        { open },
      )}
      onMouseEnter={handleEnter}
    >
      <ControlLabel
        discreetLabel
        resetHandleClick={handleResetClick}
        {...{
          title,
          hideLabel,
          required,
          editMode,
          ...disabledState,
        }}
      />
      <header
        className={classList('box', { reduce: reduceHeader })}
        title={inputTitle}
        {...(editMode && { disabled })}
        onClick={handleHeaderClick}
      >
        {/* TODO: seleccionador global, renderizar solo si existe fullSelection */}
        <div className="selected-items">
          {selected.map(id => (
            <div key={id} className="item">
              <p>{getItemTitle(id)}</p>
              <Button
                name={id}
                title="Eliminar selección"
                faIcon="fa-solid fa-xmark"
                size="m"
                type="tertiary"
                onAction={handleDeselectItemClick}
              />
            </div>
          ))}
        </div>
        <div className="arrow">
          <Icon faIcon="fa-solid fa-angle-down" />
        </div>
      </header>
      <div className="drop-down">
        <header>
          {modeSlot}
          <div className="search">
            <input
              className="box input"
              value={search}
              placeholder="Buscar..."
              onChange={handleSearchChange}
            />
            {searchSlot}
          </div>
        </header>
        {isVoid ? (
          <div className="void">
            <Icon faIcon="fa-solid fa-frog" />
          </div>
        ) : (
          <fieldset {...(editMode && { disabled })}>
            {sortedOptions.map(({ id, fields }) => (
              <Option
                key={id}
                title={getItemTitle(id)}
                checked={selected.some(selectedId => selectedId === id)}
                handleChange={handleOptionChange}
                {...{ id, fields, keyName, required, multiple }}
              />
            ))}
          </fieldset>
        )}
      </div>
    </div>
  )
}

export default BaseCombobox
