import './Dropdown.css'
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Control } from '@/types'
import { Button, Icon } from '@/components'
import Option, { OptionProps } from './components/Option/Option'
import { useInputHandler } from '@/pages/Admin/hooks'
import { createPortal } from 'react-dom'
import { UseFloatingReturn } from '@floating-ui/react'
import { classList } from '@/helpers'
import { Selected } from '..'

export interface DropdownProps
  extends Pick<Control, 'keyName' | 'required' | 'editMode'>,
    Pick<UseFloatingReturn, 'refs' | 'floatingStyles'> {
  multiple?: boolean
  disabled: boolean

  search: string
  setSearch: Dispatch<SetStateAction<string>>
  selected: string[]
  setSelected: Dispatch<string[]>
  staticSelected?: string[]
  open: boolean

  fullSelection?: string[]
  sortedOptions: Pick<OptionProps, 'id' | 'fields' | 'isStatic'>[]
  getItemTitle: (id: string) => string
  toggleItem: (id: string) => void
  handleDeselectItemClick: MouseEventHandler<HTMLButtonElement>

  headerRef: RefObject<HTMLFieldSetElement | null>

  modeSlot?: ReactNode
  searchSlot?: ReactNode
}

const Dropdown = ({
  keyName,
  required = false,
  editMode = false,
  multiple = false,
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
}: DropdownProps) => {
  const [isMounted, setIsMounted] = useState(open)

  const isVoid = useMemo(() => !fullSelection?.length, [fullSelection])

  const handleSearchChange = useInputHandler(value => setSearch(value))

  const handleOptionChange = useInputHandler(value => toggleItem(value))

  const handleSelectAllClick = useCallback(
    () => setSelected(fullSelection!),
    [fullSelection],
  )

  const handleDeselectAllClick = useCallback(() => setSelected([]), [])

  useEffect(() => {
    let timeout: number

    if (open) setIsMounted(true)
    else timeout = setTimeout(() => setIsMounted(false), 200)

    return () => clearTimeout(timeout)
  }, [open])

  if (!isMounted) return null

  return createPortal(
    <div
      className={classList('cmp-base-combobox-drop-down', { open, multiple })}
      ref={refs.setFloating}
      style={{ ...floatingStyles, width: headerRef.current?.offsetWidth }}
    >
      {multiple && (
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
          {multiple && !isVoid && (
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
        <fieldset {...(editMode && { disabled })}>
          {sortedOptions.map(({ id, fields, isStatic }) => (
            // TODO: si es isStatic, no debería de renderizar
            <Option
              key={id}
              title={getItemTitle(id)}
              checked={selected.some(selectedId => selectedId === id)}
              handleChange={handleOptionChange}
              {...{ id, fields, keyName, required, multiple, isStatic }}
            />
          ))}
        </fieldset>
      )}
    </div>,
    document.body,
  )
}

export default Dropdown
