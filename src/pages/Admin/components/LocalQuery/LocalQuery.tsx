import './LocalQuery.css'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import {
  StateToDerived,
  DerivedToState,
  useDerivedState,
  useEntities,
  useRowSelection,
  useScheme,
} from '../../hooks'
import { VisibilityState } from '@tanstack/react-table'
import { Button } from '@/components'
import { Combobox } from '..'
import { DeleteButton, ReportButton, Table } from './components'
import { QuickFilters } from './components/Table/Table'

const LocalQuery = () => {
  const { scheme, flatProps } = useScheme()
  const { key, columnVisibility: schemeColumnVisibility } = scheme

  const [quickFilters, setQuickFilters] = useState<QuickFilters>({})

  const hasQuickFilters = useMemo(
    () => Object.keys(quickFilters).length !== 0,
    [quickFilters],
  )

  const allColumnsVisible = useMemo(
    () => Object.fromEntries(Object.keys(flatProps).map(id => [id, true])),
    [],
  )

  const initColumnVisibility = useMemo(
    () =>
      schemeColumnVisibility && {
        ...Object.fromEntries(Object.keys(flatProps).map(id => [id, false])),
        ...Object.fromEntries(schemeColumnVisibility.map(id => [id, true])),
      },
    [],
  )

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initColumnVisibility ?? allColumnsVisible,
  )

  const fromVisibilityToKeys = useCallback<
    StateToDerived<VisibilityState, string[]>
  >(
    visibility =>
      Object.entries(visibility)
        .filter(([, value]) => value)
        .map(([key]) => key),
    [],
  )

  const fromKeysToVisibility = useCallback<
    DerivedToState<VisibilityState, string[]>
  >((keys, prev) => {
    const newVisibility: VisibilityState = {}

    for (const key of Object.keys(prev)) newVisibility[key] = keys.includes(key)

    return newVisibility
  }, [])

  const [visibleKeys, setVisibleKeys] = useDerivedState(
    columnVisibility,
    setColumnVisibility,
    fromVisibilityToKeys,
    fromKeysToVisibility,
  )

  const { selectedRowIds } = useRowSelection()
  const componentRef = useRef<HTMLDivElement | null>(null)

  const { query, enableQuery } = useEntities(scheme)
  const { data, status, isFetching, refetch } = query

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const columnOptions = useMemo(
    () =>
      Object.keys(allColumnsVisible).map(id => ({
        id,
        title: flatProps[id].title,
      })),
    [],
  )

  return (
    <div className="cmp-local-query" ref={componentRef}>
      <header>
        <Combobox
          keyName={`visibility-${key}`}
          title="Columnas activas"
          hideLabel
          multiple
          reduceHeader
          selected={visibleKeys}
          setSelected={setVisibleKeys}
          options={columnOptions}
        />
        {hasQuickFilters && (
          <div className="filter-container">
            {Object.values(quickFilters).map(({ title, filter }) => (
              <div key={title} className="item">
                <small>{title}</small>
                {filter}
              </div>
            ))}
          </div>
        )}
        <div className="left">
          <Button
            title="Consultar datos"
            faIcon={`fa-solid ${
              data ? 'fa-arrows-rotate' : 'fa-cloud-arrow-down'
            }`}
            actionState={queryActionState}
            onAction={queryHandleClick}
          />
        </div>
        <div className="actions">
          {selectedRowIds.length !== 0 && <DeleteButton />}
          {data && <ReportButton {...{ localQueryRef: componentRef }} />}
        </div>
      </header>
      {data && (
        <Table
          {...{ data, columnVisibility, setColumnVisibility, setQuickFilters }}
        />
      )}
    </div>
  )
}

export default LocalQuery
