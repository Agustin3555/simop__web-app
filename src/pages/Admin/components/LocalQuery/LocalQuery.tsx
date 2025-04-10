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
import { Button, Icon, StateButton } from '@/components'
import { Combobox } from '..'
import { DeleteButton, ReportButton, Table } from './components'
import { GetHeaderResult } from './components/Table/Table'
import { format } from '@formkit/tempo'
import { utils, writeFile } from 'xlsx'

const LocalQuery = () => {
  const { scheme, flatProps } = useScheme()
  const { key, title, columnVisibility: schemeColumnVisibility } = scheme

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

  const [quickFilters, setQuickFilters] = useState<GetHeaderResult[]>()

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

  const exportHandleClick = useCallback(() => {
    if (!data) return

    const selectedData =
      selectedRowIds.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds.includes(id))

    const convertedData = selectedData.map(row =>
      Object.keys(flatProps).reduce((acc, key) => {
        acc[key] = flatProps[key].getExcelValue(row)
        return acc
      }, {} as Record<string, any>),
    )

    const worksheet = utils.json_to_sheet(convertedData)

    // Crea el libro de trabajo y agrega una hoja
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Datos')

    const date = format('', { date: 'short' }).replaceAll('/', '-')
    const fileName = `${title.plural} (${date}).xlsx`

    writeFile(workbook, fileName)
  }, [data, selectedRowIds])

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
        {quickFilters && (
          <div className="filters">
            {quickFilters.map(({ title, filter }) => (
              <div key={title} className="item">
                <small>{title}</small>
                {filter}
              </div>
            ))}
          </div>
        )}
        <div className="left">
          <StateButton
            text="Consultar datos"
            hiddenText
            faIcon="fa-solid fa-cloud-arrow-down"
            actionState={queryActionState}
            handleAction={queryHandleClick}
          />
          {data && (
            <div className="total-items">
              <Icon faIcon="fa-solid fa-cubes-stacked" />
              <p>{data.length}</p>
            </div>
          )}
        </div>
        <div className="actions">
          {selectedRowIds.length !== 0 && <DeleteButton />}
          {data && (
            <>
              <ReportButton {...{ localQueryRef: componentRef }} />
              <Button
                text="Descargar Excel"
                title={`Descargar Excel (${
                  selectedRowIds.length === 0 ? 'todo' : 'seleccionados'
                })`}
                faIcon="fa-solid fa-file-excel"
                _type="secondary"
                onClick={exportHandleClick}
              />
            </>
          )}
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
