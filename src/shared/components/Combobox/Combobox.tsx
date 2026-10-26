import './Combobox.css'
import { ReactNode, useMemo, useRef, useState } from 'react'
import { Button, Icon } from '@/components'
import { Dropdown } from '../Dropdown/Dropdown'
import { SelectedOptions } from './components'
import { classList } from '@/helpers'

interface ComboboxBaseProps {
  name: string
  options: { value: string; label: string }[]
  staticSelected?: string[]
  required?: boolean
  multiple?: boolean
  onFirstOpen?: () => void
  children?: ReactNode
}

export type ComboboxProps = ComboboxBaseProps &
  (
    | {
        selected: string[]
        defaultSelected?: never
        onChange: (selected: string[]) => void
      }
    | {
        selected?: never
        defaultSelected?: string[]
        onChange?: never
      }
  )

export const NewCombobox = (props: ComboboxProps) => {
  const {
    name,
    options,
    staticSelected = [],
    required = false,
    multiple = false,
    children,
  } = props

  const invalidStaticValues = useMemo(
    () => staticSelected.filter(value => !options.some(o => o.value === value)),
    [options, staticSelected],
  )

  if (invalidStaticValues.length > 0) {
    throw new Error(
      `staticSelected values must exist in options: ${invalidStaticValues.join(', ')}`,
    )
  }

  const [internalSelected, setInternalSelected] = useState<string[]>(
    props.defaultSelected ?? [],
  )

  const [search, setSearch] = useState('')
  const hasOpened = useRef(false)

  const selected = [
    ...new Set([...(props.selected ?? internalSelected), ...staticSelected]),
  ]

  const orderedOptions = useMemo(() => {
    const normalize = (text: string) =>
      text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const normalizedSearch = normalize(search.trim())

    return options
      .map((option, index) => {
        const label = normalize(option.label)

        const matchIndex = normalizedSearch
          ? label.indexOf(normalizedSearch)
          : 0

        const rank =
          matchIndex < 0
            ? 4
            : matchIndex === 0 && label.length === normalizedSearch.length
              ? 0
              : matchIndex === 0
                ? 1
                : /^\s/.test(label[matchIndex - 1])
                  ? 2
                  : 3

        return { option, index, rank }
      })
      .sort((a, b) => a.rank - b.rank || a.index - b.index)
      .map(({ option }) => option)
  }, [options, search])

  const updateSelected = (nextSelected: string[]) => {
    const nextSelectedWithStatic = [
      ...new Set([...nextSelected, ...staticSelected]),
    ]

    props.selected === undefined
      ? setInternalSelected(nextSelectedWithStatic)
      : props.onChange(nextSelectedWithStatic)
  }

  const handleToggleOption = (value: string) => {
    if (staticSelected.includes(value)) return

    const checked = selected.includes(value)

    const nextSelected = multiple
      ? checked
        ? selected.filter(selectedValue => selectedValue !== value)
        : [...selected, value]
      : checked
        ? []
        : [value]

    updateSelected(nextSelected)
  }

  const handleSelectAll = () =>
    updateSelected(options.map(({ value }) => value))

  const handleDeselectAll = () => updateSelected([])

  const handleFirstOpen = () => {
    if (hasOpened.current) return

    hasOpened.current = true
    props.onFirstOpen?.()
  }

  return (
    <div className={classList('new-cmp-combobox', 'ui-l', { multiple })}>
      <input
        value={selected.length ? JSON.stringify(selected) : undefined}
        tabIndex={-1}
        aria-hidden="true"
        readOnly
        {...{ name, required }}
      />
      <Dropdown
        opener={attrs => (
          <button
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            onClick={handleFirstOpen}
            {...attrs}
          >
            <SelectedOptions
              {...{ options, selected, staticSelected, multiple }}
              onRemove={handleToggleOption}
            />
            <span>
              {multiple && (
                <div className="counter">
                  {selected.length}
                  <Icon faIcon="fa-solid fa-shapes" />
                </div>
              )}
              <Icon faIcon="fa-solid fa-angle-down" />
            </span>
          </button>
        )}
      >
        {attrs => (
          <>
            {multiple && (
              <SelectedOptions
                {...{ options, selected, staticSelected, multiple }}
                onRemove={handleToggleOption}
              />
            )}
            <div className="header">
              <input
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
              />
              {multiple && (
                <>
                  <Button
                    title="Seleccionar todo"
                    faIcon="fa-solid fa-check-square"
                    size="s"
                    type="secondary"
                    onAction={handleSelectAll}
                  />
                  <Button
                    title="Deseleccionar todo"
                    faIcon="fa-regular fa-square"
                    size="s"
                    type="secondary"
                    onAction={handleDeselectAll}
                  />
                  {children}
                </>
              )}
            </div>
            <div
              className="list"
              role="listbox"
              aria-multiselectable={multiple}
            >
              {orderedOptions.map(({ label, value }) => {
                const isSelected = selected.includes(value)
                const isStatic = staticSelected.includes(value)

                return (
                  <button
                    key={value}
                    className={classList({ isSelected })}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isStatic}
                    {...(!multiple ? attrs : {})}
                    onClick={() => handleToggleOption(value)}
                  >
                    <span>{label}</span>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </Dropdown>
    </div>
  )
}
