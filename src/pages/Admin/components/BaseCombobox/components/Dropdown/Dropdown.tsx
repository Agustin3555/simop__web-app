import './Dropdown.css'
import {
  MouseEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useComboboxCore, useInputHandler } from '@/pages/Admin/hooks'
import { createPortal } from 'react-dom'
import { UseFloatingReturn } from '@floating-ui/react'
import { Button, Icon } from '@/components'
import { Selected } from '..'
import { classList } from '@/helpers'
import { BaseComboboxProps } from '../../BaseCombobox'
import { Option } from './components'

export interface DropdownProps
  extends Pick<
      BaseComboboxProps,
      | 'selected'
      | 'setSelected'
      | 'staticSelected'
      | 'fullSelection'
      | 'sortedOptions'
      | 'getItemTitle'
      | 'modeSlot'
      | 'searchSlot'
    >,
    Pick<UseFloatingReturn, 'refs' | 'floatingStyles'> {
  disabled: boolean

  toggleItem: (id: string) => void
  handleDeselectItemClick: MouseEventHandler<HTMLButtonElement>

  headerRef: RefObject<HTMLFieldSetElement | null>
}

const Dropdown = ({
  disabled,

  selected,
  setSelected,
  staticSelected,

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
}: DropdownProps) => {
  const { isEditMode, isMultiple, isOpen, setIsOpen, search, setSearch } =
    useComboboxCore()

  const [isMounted, setIsMounted] = useState(isOpen)

  const isVoid = useMemo(() => !fullSelection?.length, [fullSelection])

  const handleSearchChange = useInputHandler(value => setSearch(value))

  const handleOptionChange = useInputHandler(value => toggleItem(value))

  const handleSelectAllClick = useCallback(
    () => setSelected(fullSelection!),
    [fullSelection],
  )

  const handleDeselectAllClick = useCallback(() => setSelected([]), [])

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => setIsMounted(true))
      return () => cancelAnimationFrame(id)
    }

    const timeout = setTimeout(() => setIsMounted(false), 200)
    return () => clearTimeout(timeout)
  }, [isOpen])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      const isInsideHeader = headerRef.current?.contains(el)
      const isInsideDropdown = refs.floating.current?.contains(el)

      if (!(isInsideHeader || isInsideDropdown)) setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [headerRef, isOpen])

  if (!isMounted) return null

  return createPortal(
    <div
      className={classList('cmp-base-combobox-drop-down', {
        isMultiple,
        isOpen,
      })}
      ref={refs.setFloating}
      style={{ ...floatingStyles, width: headerRef.current?.offsetWidth }}
    >
      {isMultiple && (
        <Selected
          {...{
            disabled,

            selected,
            staticSelected,

            getItemTitle,
            handleDeselectItemClick,
          }}
        />
      )}
      <header>
        {modeSlot}
        <div className="search">
          <input
            className="box input"
            value={search}
            placeholder="Buscar..."
            onChange={handleSearchChange}
          />
          {isMultiple && !isVoid && (
            <>
              <Button
                title="Seleccionar todo"
                faIcon="fa-solid fa-check-square"
                size="s"
                type="secondary"
                onAction={handleSelectAllClick}
              />
              <Button
                title="Deseleccionar todo"
                faIcon="fa-regular fa-square"
                size="s"
                type="secondary"
                onAction={handleDeselectAllClick}
              />
            </>
          )}
          {searchSlot}
        </div>
      </header>
      {isVoid ? (
        <div className="void">
          <Icon faIcon="fa-solid fa-frog" />
        </div>
      ) : (
        <fieldset {...(isEditMode && { disabled })}>
          {sortedOptions.map(({ id, isStatic, fields }) => (
            <Option
              key={id}
              isChecked={selected.some(selectedId => selectedId === id)}
              title={getItemTitle(id)}
              handleChange={handleOptionChange}
              {...{ id, isStatic, fields }}
            />
          ))}
        </fieldset>
      )}
    </div>,
    document.body,
  )
}

export default Dropdown
