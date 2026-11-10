import './Combobox.css'
import { ReactNode, useMemo, useRef, useState } from 'react'
import { Icon } from '@/components'
import { Dropdown } from '../Dropdown/Dropdown'
import { SelectedOptions } from './components'
import { clsx } from '@/helpers'
import { NewButton } from '../Button/Button'
import { Select } from '../Select/Select'

const EMPTY_SEARCH_FIELDS: { value: string; label: string }[] = []

interface ComboboxBaseProps {
  name: string
  options: {
    value: string
    label: string
    searchValues?: Record<string, string>
  }[]
  searchFields?: { value: string; label: string }[]
  defaultSearchField?: string
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

// TODO: debe poder hacerse focus y abrirse con teclado, y navegar con flechas y enter

export const NewCombobox = (props: ComboboxProps) => {
  const {
    name,
    options,
    staticSelected = [],
    required = false,
    multiple = false,
    children,
    searchFields = EMPTY_SEARCH_FIELDS,
    defaultSearchField,
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
  const [selectedSearchField, setSelectedSearchField] = useState('')
  const hasOpened = useRef(false)

  const activeSearchField = searchFields.some(
    ({ value }) => value === selectedSearchField,
  )
    ? selectedSearchField
    : (searchFields.find(({ value }) => value === defaultSearchField)?.value ??
      searchFields[0]?.value ??
      '')

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
        const label = normalize(
          activeSearchField
            ? (option.searchValues?.[activeSearchField] ?? '')
            : option.label,
        )

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
  }, [activeSearchField, options, search])

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
    <div className={clsx('new-cmp-combobox', 'ui-l', { multiple })}>
      <input
        value={selected.length ? JSON.stringify(selected) : ''}
        tabIndex={-1}
        onChange={() => {}}
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
                  <Icon iconClass="fa-solid fa-shapes" />
                </div>
              )}
              <Icon iconClass="fa-solid fa-angle-down" />
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
              {searchFields.length > 0 && (
                <Select
                  options={searchFields}
                  size="s"
                  htmlAttrs={{
                    value: activeSearchField,
                    onChange: e =>
                      setSelectedSearchField(e.currentTarget.value),
                    'aria-label': 'Campo para buscar',
                  }}
                />
              )}
              {multiple && (
                <>
                  <NewButton
                    title="Seleccionar todo"
                    iconClass="fa-solid fa-check-square"
                    size="s"
                    border
                    onAction={handleSelectAll}
                  />
                  <NewButton
                    title="Deseleccionar todo"
                    iconClass="fa-regular fa-square"
                    size="s"
                    border
                    onAction={handleDeselectAll}
                  />
                </>
              )}
              {children}
            </div>
            <div
              className="list"
              role="listbox"
              aria-multiselectable={multiple}
            >
              {orderedOptions.map(({ value, searchValues }) => {
                const isSelected = selected.includes(value)
                const isStatic = staticSelected.includes(value)

                const primaryValue = searchValues?.[activeSearchField]
                if (!primaryValue) return null

                const secondaryValues = searchFields
                  .filter(({ value: field }) => field !== activeSearchField)
                  .flatMap(field => {
                    const fieldValue = searchValues?.[field.value]
                    return fieldValue
                      ? [
                          {
                            key: field.value,
                            label: field.label,
                            value: fieldValue,
                          },
                        ]
                      : []
                  })

                return (
                  <button
                    key={value}
                    className={clsx({ isSelected })}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={isStatic}
                    {...(!multiple ? attrs : {})}
                    onClick={() => handleToggleOption(value)}
                  >
                    <span className="primary-value text">{primaryValue}</span>
                    {secondaryValues.length > 0 && (
                      <span className="secondary-values">
                        {secondaryValues.map(({ key, label, value }) => (
                          <span key={key} className="field">
                            <span className="label text">{label}:</span>
                            <span className="value text">{value}</span>
                          </span>
                        ))}
                      </span>
                    )}
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
