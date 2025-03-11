import './Combobox.css'
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useHandleAction, useControl } from '@/hooks'
import { useAddFieldReset, useInputHandler } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { Button, ControlLabel, Icon, StateButton } from '@/components'
import { Option } from './components'
import { Control } from '@/types'
import { Entity } from '@/services/config'
import { getFlatProps, Scheme } from '../../services/config'
import { REFETCH_INTERVALS } from '../../constants/refetchIntervals.const'
import { classList } from '@/helpers'
import { sort } from './helpers'

export type SearchMode = keyof Entity

export interface ComboboxProps extends Control {
  value?: Partial<Entity>[]
  multiple?: boolean
  scheme: Scheme
}

const Combobox = ({
  keyName,
  title,
  value: initialData,
  hideLabel = false,
  required = false,
  editMode = false,
  long,
  multiple = false,
  scheme,
}: ComboboxProps) => {
  const { key, service, refreshRate, anchorField } = scheme

  const { inputTitle, disabledState } = useControl({ title, required })
  const { disabled } = disabledState

  const [enabled, setEnabled] = useState(false)
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [searchModes, setSearchModes] = useState<SearchMode[]>([])
  const [selectedSearchMode, setSelectedSearchMode] = useState(anchorField)
  const [selected, setSelected] = useState<Partial<Entity>[]>(initialData ?? [])
  const comboboxLayoutRef = useRef<HTMLDivElement>(null)

  const queryFn = useCallback(async () => {
    const options = await service.getForConnect!()

    if (options.length !== 0) setSearchModes(Object.keys(options[0]))

    return options
  }, [])

  const { data: options, refetch } = useQuery({
    queryKey: [key, 'refs'],
    queryFn,
    initialData,
    refetchInterval: refreshRate ? REFETCH_INTERVALS[refreshRate] : Infinity,
    retry: false,
    enabled,
  })

  useAddFieldReset(() => setSelected([]))

  const isVoid = useMemo(() => !(options && options.length), [options])

  const flatProps = useMemo(() => getFlatProps(scheme), [])

  const searchModeTitles = useMemo(
    () => searchModes.map(mode => ({ mode, title: flatProps[mode].title })),
    [searchModes, flatProps],
  )

  const sortedOptions = useMemo(() => {
    if (!options || searchModes.length === 0) return

    const sorted = sort(
      search.trim().toLowerCase(),
      options,
      option => option[selectedSearchMode],
    )

    return sorted.map(props => {
      const record: Record<
        SearchMode,
        { title: string; value: number | string }
      > = {}

      searchModes.forEach(mode => {
        record[mode] = {
          title: flatProps[mode].title as string,
          value: props[mode],
        }
      })

      return record
    })
  }, [options, search, selectedSearchMode, searchModes])

  const handleEnter = useCallback(() => setEnabled(true), [])

  const handleSearchChange = useInputHandler(value => setSearch(value))

  const handleToggleClick = useCallback(() => setOpen(prev => !prev), [])

  const handleSearchModeChange = useCallback(
    (mode: SearchMode) => () => setSelectedSearchMode(mode),
    [],
  )

  const handleOptionChange = useInputHandler(value => {
    if (!options) return

    const newSelected = options.find(option => String(option.id) === value)

    if (!newSelected) return

    setSelected(
      multiple
        ? prev => {
            const exists = prev.some(item => item.id === Number(value))

            return exists
              ? prev.filter(item => item.id !== Number(value))
              : [...prev, newSelected]
          }
        : [newSelected],
    )

    if (!multiple) setOpen(false)
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

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        await refetch()

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleClickOutside = useCallback((event: MouseEvent) => {
    // Cierra el componente si el click es fuera del propio elemento
    if (
      comboboxLayoutRef.current &&
      !comboboxLayoutRef.current.contains(event.target as Node)
    )
      setOpen(false)
  }, [])

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  const resetHandleClick = useCallback(() => setSelected(initialData ?? []), [])

  return (
    <div
      ref={comboboxLayoutRef}
      className={classList(
        'cmp-combobox',
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
        className="box"
        title={inputTitle}
        {...(editMode && { disabled })}
        onClick={handleToggleClick}
      >
        <div className="selected-items">
          {selected.map(item => (
            <div key={item.id} className="item">
              <p>{item[selectedSearchMode]}</p>
              <Button
                title="Eliminar"
                faIcon="fa-solid fa-xmark"
                name={String(item.id)}
                type="button"
                hideText
                _type="secondary"
                onClick={handleDeleteClick}
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
          {searchModeTitles.length !== 0 && (
            <fieldset>
              {searchModeTitles.map(({ mode, title }) => (
                <label key={mode}>
                  {title}
                  <input
                    type="radio"
                    name={`searchMode-${keyName}`}
                    checked={selectedSearchMode === mode}
                    onChange={handleSearchModeChange(mode)}
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
              onChange={handleSearchChange}
            />
            <StateButton
              text="Actualizar opciones"
              hiddenText
              faIcon="fa-solid fa-rotate"
              {...handleActionResult}
            />
          </div>
        </header>
        {isVoid ? (
          <div className="void">
            <Icon faIcon="fa-solid fa-frog" />
          </div>
        ) : (
          <fieldset className="drop-down" {...(editMode && { disabled })}>
            {sortedOptions?.map(option => (
              <Option
                key={option.id.value}
                checked={selected.some(item => item.id === option.id.value)}
                fields={option}
                handleChange={handleOptionChange}
                {...{ keyName, required, multiple, selectedSearchMode }}
              />
            ))}
          </fieldset>
        )}
      </div>
    </div>
  )
}

export default Combobox
