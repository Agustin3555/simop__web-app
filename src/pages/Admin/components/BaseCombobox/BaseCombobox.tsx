import './BaseCombobox.css'
import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useControl } from '@/hooks'
import { useInputHandler } from '../../hooks'
import { Button, ControlLabel, Icon, StateButton } from '@/components'
import { StateButtonProps } from '@/components/StateButton/StateButton'
import { Option } from './components'
import { Control } from '@/types'
import { classList } from '@/helpers'
import { ControlLabelProps } from '@/components/ControlLabel/ControlLabel'

export interface BasicOption {
  id: string
  title: string
}

export type Fields = Record<string, { title: string; value: string }>

export interface BaseComboboxProps<E = unknown, T = E & BasicOption>
  extends Control,
    Pick<ControlLabelProps, 'resetHandleClick'> {
  multiple?: boolean
  reduceHeader?: boolean
  options?: T[]
  selected: T[]
  setSelected: Dispatch<SetStateAction<T[]>>
  selectedItems?: { id: string; title: string }[]
  sorter: (search: string, options: T[]) => T[]
  deselectItem: (id: string) => void
  reportOption?: (value: string) => void
  handleEnter?: () => void

  refetchPack?: Required<Pick<StateButtonProps, 'actionState' | 'handleAction'>>
  searchModePack?: {
    searchModes?: { mode: string; title: string }[]
    selectedSearchMode: string
    renderingOptions: (options: T[]) => Fields[]
    searchModeItemHandleChange: ChangeEventHandler<HTMLInputElement>
  }
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
  options,
  selected,
  setSelected,
  selectedItems,
  sorter,
  deselectItem,
  reportOption,
  handleEnter,
  resetHandleClick,

  refetchPack,
  searchModePack,
}: BaseComboboxProps) => {
  const {
    searchModes,
    selectedSearchMode,
    renderingOptions,
    searchModeItemHandleChange,
  } = searchModePack ?? {}

  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const comboboxLayoutRef = useRef<HTMLDivElement | null>(null)

  const isVoid = useMemo(() => !(options && options.length), [options])

  const finalRenderingOptions = useMemo(() => {
    if (!options) return

    const sorted = sorter(search.trim().toLowerCase(), options)

    if (renderingOptions) return renderingOptions(sorted)

    return sorted.map(({ id, title }) => {
      const fields: Fields = {}

      fields['id'] = { title: 'Clave', value: id }
      fields['title'] = { title: 'Título', value: title }

      return fields
    })
  }, [options, search, sorter, renderingOptions])

  const searchHandleChange = useInputHandler(value => setSearch(value))

  const optionHandleChange = useInputHandler(value => {
    if (!options) return

    const newSelected = options.find(option => option.id === value)

    if (!newSelected) return

    reportOption && reportOption(value)

    setSelected(
      multiple
        ? prev => {
            const exists = prev.some(item => item.id === value)

            return exists
              ? prev.filter(item => item.id !== value)
              : [...prev, newSelected]
          }
        : [newSelected],
    )

    if (!multiple) setOpen(false)
  })

  const deleteSelectedItemHandleClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(event => {
    // Evita que se dispare el evento de click del elemento padre (header)
    event.stopPropagation()

    const id = event.currentTarget.name

    deselectItem(id)
    reportOption && reportOption(id)
  }, [])

  const toggleHandleClick = useCallback(() => setOpen(prev => !prev), [])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Cierra el componente si el click es fuera del propio elemento
      const close =
        comboboxLayoutRef.current &&
        !comboboxLayoutRef.current.contains(event.target as Node)

      if (close) setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)

    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div
      ref={comboboxLayoutRef}
      className={classList(
        'cmp-base-combobox',
        'control',
        long || (multiple ? 'l' : 'm'),
        { open },
      )}
      onMouseEnter={handleEnter}
    >
      {/* <pre>{JSON.stringify(finalRenderingOptions, undefined, ' ')}</pre> */}
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
        onClick={toggleHandleClick}
      >
        <div className="selected-items">
          {selectedItems?.map(({ id, title }) => (
            <div key={id} className="item">
              <p>{title}</p>
              <Button
                title="Eliminar"
                faIcon="fa-solid fa-xmark"
                name={id}
                type="button"
                hideText
                _type="secondary"
                onClick={deleteSelectedItemHandleClick}
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
          {searchModes && (
            <fieldset>
              {searchModes.map(({ mode, title }) => (
                <label key={mode}>
                  {title}
                  <input
                    type="radio"
                    name={`searchMode-${keyName}`}
                    value={mode}
                    checked={selectedSearchMode === mode}
                    onChange={searchModeItemHandleChange}
                  />
                </label>
              ))}
            </fieldset>
          )}
          <div className="search">
            <input
              className="box input"
              value={search}
              placeholder="Buscar ..."
              onChange={searchHandleChange}
            />
            {refetchPack && (
              <StateButton
                text="Actualizar opciones"
                hiddenText
                faIcon="fa-solid fa-rotate"
                {...refetchPack}
              />
            )}
          </div>
        </header>
        {isVoid ? (
          <div className="void">
            <Icon faIcon="fa-solid fa-frog" />
          </div>
        ) : (
          finalRenderingOptions && (
            <fieldset className="drop-down" {...(editMode && { disabled })}>
              {finalRenderingOptions.map(
                option =>
                  option.id && (
                    <Option
                      key={option.id.value}
                      checked={selected.some(
                        ({ id }) => id === option.id.value,
                      )}
                      fields={option}
                      selectedSearchMode={selectedSearchMode ?? 'title'}
                      handleChange={optionHandleChange}
                      {...{ keyName, required, multiple }}
                    />
                  ),
              )}
            </fieldset>
          )
        )}
      </div>
    </div>
  )
}

export default BaseCombobox
