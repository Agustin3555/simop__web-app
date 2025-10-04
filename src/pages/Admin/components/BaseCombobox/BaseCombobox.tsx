import './BaseCombobox.css'
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useControl } from '@/hooks'
import { Control } from '@/types'
import { ControlLabel, Icon } from '@/components'
import { classList } from '@/helpers'
import { Dropdown, Selected } from './components'
import { OptionProps } from './components/Dropdown/components/Option/Option'
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react'
import { useAddFieldReset } from '../../hooks'

export interface BaseComboboxProps extends Control {
  multiple?: boolean

  search: string
  setSearch: Dispatch<SetStateAction<string>>
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  staticSelected?: string[]

  fullSelection?: string[]
  sortedOptions: Pick<OptionProps, 'id' | 'fields' | 'isStatic'>[]
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

  search,
  setSearch,
  selected,
  setSelected,
  staticSelected,

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
  const headerRef = useRef<HTMLFieldSetElement>(null)

  useAddFieldReset(() => setSelected([]))

  const { refs, floatingStyles, update } = useFloating({
    placement: 'bottom-start',
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  const toggleItem = useCallback(
    (id: string) => {
      setSelected(prev => {
        if (!prev) return [id]

        const newState = [...prev]

        const exists = newState.includes(id)

        if (multiple)
          return exists
            ? newState.filter(selectedId => selectedId !== id)
            : [...newState, id]

        return exists ? [] : [id]
      })

      if (!multiple) setOpen(false)
    },
    [multiple, setSelected],
  )

  const handleHeaderClick = useCallback(() => {
    setOpen(prev => !prev)
    if (!open) setTimeout(update, 0)
  }, [open, update])

  const handleDeselectItemClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(event => {
    // Evita que se dispare el evento de click del header
    event.stopPropagation()

    toggleItem(event.currentTarget.value)
  }, [])

  const handleResetClick = useCallback(() => {
    editMode && handleReset ? handleReset() : setSelected([])
  }, [])

  useEffect(() => {
    if (headerRef.current) refs.setReference(headerRef.current)
  }, [refs])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      const isInsideHeader = headerRef.current?.contains(target as Node)
      const isInsideDropdown = refs.floating.current?.contains(target as Node)

      if (!(isInsideHeader || isInsideDropdown)) setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [refs.floating])

  return (
    <div
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
      <fieldset
        className="header box"
        ref={headerRef}
        name={keyName}
        title={inputTitle}
        onClick={handleHeaderClick}
        {...(editMode && { disabled })}
      >
        <Selected
          {...{
            keyName,
            editMode,
            disabled,

            selected,
            staticSelected,

            getItemTitle,
            handleDeselectItemClick,
          }}
        />
        <div className="arrow">
          <Icon faIcon="fa-solid fa-angle-down" />
        </div>
      </fieldset>
      <Dropdown
        {...{
          keyName,
          required,
          editMode,
          multiple,
          disabled,

          search,
          setSearch,
          selected,
          setSelected,
          staticSelected,
          open,

          fullSelection,
          sortedOptions,
          getItemTitle,
          toggleItem,
          handleDeselectItemClick,

          headerRef,
          refs,
          floatingStyles,

          modeSlot,
          searchSlot,
        }}
      />
    </div>
  )
}

export default BaseCombobox
