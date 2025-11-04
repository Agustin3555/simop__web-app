import './BaseCombobox.css'
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { useInputField } from '@/hooks'
import { useAddFieldReset, useComboboxCore } from '../../hooks'
import { InputField } from '@/types'
import { InputLabel, Icon } from '@/components'
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

export interface BaseComboboxProps
  extends Pick<InputField, 'title' | 'hideLabel' | 'isRequired'> {
  selected: string[]
  setSelected: Dispatch<SetStateAction<string[]>>
  staticSelected?: string[]

  fullSelection?: string[]
  sortedOptions: Pick<OptionProps, 'id' | 'fields' | 'isStatic'>[]
  getItemTitle: (id: string) => undefined | string
  handleReset?: () => void
  handleEnter?: () => void

  modeSlot?: ReactNode
  searchSlot?: ReactNode
}

const BaseCombobox = ({
  title,
  hideLabel,
  isRequired,

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
  const headerRef = useRef<HTMLFieldSetElement>(null)

  const { keyName, isMultiple, isEditMode, isOpen, setIsOpen } =
    useComboboxCore()

  const { inputTitle, disabledState } = useInputField({ title, isRequired })
  const { disabled } = disabledState

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

        if (isMultiple)
          return exists
            ? newState.filter(selectedId => selectedId !== id)
            : [...newState, id]

        return exists ? [] : [id]
      })

      if (!isMultiple) setIsOpen(false)
    },
    [isMultiple, setSelected],
  )

  const handleHeaderClick = useCallback(() => {
    setIsOpen(prev => !prev)
    if (!isOpen) setTimeout(update, 0)
  }, [isOpen, update])

  const handleDeselectItemClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    event => {
      // Evita que se dispare el evento de click del header
      event.stopPropagation()
      toggleItem(event.currentTarget.value)
    },
    [toggleItem],
  )

  const handleResetClick = useCallback(() => {
    isEditMode && handleReset ? handleReset() : setSelected([])
  }, [])

  useEffect(() => {
    if (headerRef.current) refs.setReference(headerRef.current)
  }, [refs])

  useEffect(() => {
    if (!staticSelected?.length) return
    if (!selected.length) setSelected(staticSelected)
  }, [selected])

  return (
    <div
      className={classList('cmp-base-combobox', 'control', { isOpen })}
      onMouseEnter={handleEnter}
    >
      <InputLabel
        discreetLabel
        resetHandleClick={handleResetClick}
        {...{
          title,
          hideLabel,
          isRequired,
          isEditMode,
          ...disabledState,
        }}
      />
      <fieldset
        className="header box"
        ref={headerRef}
        name={keyName}
        title={inputTitle}
        onClick={handleHeaderClick}
        {...(isEditMode && { disabled })}
      >
        <Selected
          {...{
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
        }}
      />
    </div>
  )
}

export default BaseCombobox
