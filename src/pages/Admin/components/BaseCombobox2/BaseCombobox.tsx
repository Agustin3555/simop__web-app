import './BaseCombobox.css'
import {
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
import { Button, ControlLabel, Icon } from '@/components'
import { Control } from '@/types'
import { classList } from '@/helpers'
import { ControlLabelProps } from '@/components/ControlLabel/ControlLabel'
import { Option } from './components'
import { OptionProps } from './components/Option/Option'

export interface BaseComboboxProps
  extends Control,
    Pick<ControlLabelProps, 'resetHandleClick'> {
  multiple?: boolean
  reduceHeader?: boolean

  search: string
  setSearch: Dispatch<SetStateAction<string>>
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>

  sortedOptions: Pick<OptionProps, 'id' | 'fields'>[]
  getItemTitle: (id: string) => string
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

  sortedOptions,
  getItemTitle,
  handleEnter,
  resetHandleClick,

  modeSlot,
  searchSlot,
}: BaseComboboxProps) => {
  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const [open, setOpen] = useState(false)
  const componentRef = useRef<HTMLDivElement | null>(null)

  const isVoid = useMemo(
    () => !(sortedOptions && sortedOptions.length),
    [sortedOptions],
  )

  const toggleItem = useCallback((id: string) => {
    setSelected(prev => {
      const exists = prev.includes(id)

      if (multiple)
        return exists
          ? prev.filter(selectedId => selectedId !== id)
          : [...prev, id]

      return exists ? [] : [id]
    })

    if (!multiple) setOpen(false)
  }, [])

  const headerHandleClick = useCallback(() => setOpen(prev => !prev), [])

  const searchHandleChange = useInputHandler(value => setSearch(value))

  const optionHandleChange = useInputHandler(value => toggleItem(value))

  const deselectItemHandleClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(event => {
    // Evita que se dispare el evento de click del elemento padre (header)
    event.stopPropagation()

    toggleItem(event.currentTarget.name)
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
        {...{
          title,
          hideLabel,
          required,
          editMode,
          ...disabledState,
          resetHandleClick,
        }}
      />
      <header
        className={classList('box', { reduce: reduceHeader })}
        title={inputTitle}
        {...(editMode && { disabled })}
        onClick={headerHandleClick}
      >
        {/* TODO: seleccionador global */}
        <div className="selected-items">
          {selected.map(id => (
            <div key={id} className="item">
              <p>{getItemTitle(id)}</p>
              <Button
                title="Eliminar"
                faIcon="fa-solid fa-xmark"
                name={id}
                type="button"
                hideText
                _type="secondary"
                onClick={deselectItemHandleClick}
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
              onChange={searchHandleChange}
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
                handleChange={optionHandleChange}
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
