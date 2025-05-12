import './LocalQuery.css'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import {
  StateToDerived,
  DerivedToState,
  useDerivedState,
  useEntities,
  useRowSelection,
  useMetaModel,
} from '../../hooks'
import { VisibilityState } from '@tanstack/react-table'
import { Button } from '@/components'
import { Combobox } from '..'
import { DeleteButton, ReportButton, Table } from './components'
import { QuickFilters, TableProps } from './components/Table/Table'
import { Method } from '@/services/config'

export interface LocalQueryProps extends Pick<TableProps, 'methods'> {
  fetch?: {
    key?: string
    getAll?: string
  }
}

const LocalQuery = ({ fetch, methods }: LocalQueryProps) => {
  const { forGetAll } = methods ?? {}

  const metaModel = useMetaModel()
  const { key, service, getFields, getPropFields } = metaModel

  const [quickFilters, setQuickFilters] = useState<QuickFilters>({})

  const hasQuickFilters = useMemo(
    () => Object.keys(quickFilters).length !== 0,
    [quickFilters],
  )

  const getAllFields = useMemo(() => getFields(forGetAll ?? Method.GetAll), [])

  const allColumnsVisible = useMemo(
    () => Object.fromEntries(getAllFields?.map(key => [key, true]) ?? []),
    [],
  )

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const metaModelColumnVisibility = getFields('columnVisibility')

      return metaModelColumnVisibility
        ? {
            ...Object.fromEntries(getAllFields?.map(key => [key, false]) ?? []),
            ...Object.fromEntries(
              metaModelColumnVisibility.map(key => [key, true]),
            ),
          }
        : allColumnsVisible
    },
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

  const { query, enableQuery } = useEntities(
    fetch?.key ? [key, fetch.key] : [key],
    service[fetch?.getAll ?? 'getAll'],
  )

  const { data, status, isFetching, refetch } = query

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const columnOptions = useMemo(
    () =>
      getPropFields(forGetAll ?? Method.GetAll)?.map(({ key, title }) => ({
        id: key,
        title,
      })) ?? [],
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
          {...{
            data,
            columnVisibility,
            setColumnVisibility,
            setQuickFilters,
            methods,
          }}
        />
      )}
    </div>
  )
}

export default LocalQuery
