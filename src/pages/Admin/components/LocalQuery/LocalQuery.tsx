import './LocalQuery.css'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useEntities, useRowSelection, useScheme } from '../../hooks'
import { Button, Icon, StateButton } from '@/components'
import { Combobox } from '..'
import { DeleteButton, ReportButton, Table } from './components'
import { VisibilityState } from '@tanstack/react-table'
import { utils, writeFile } from 'xlsx'
import { ComboboxProps } from '../Combobox/Combobox'

const LocalQuery = () => {
  const { scheme, flatProps } = useScheme()
  const { key, title } = scheme

  const initColumnVisibility = useMemo(
    () => Object.fromEntries(Object.keys(flatProps).map(id => [id, true])),
    [],
  )

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(initColumnVisibility)

  const { selectedRowIds } = useRowSelection()
  const localQueryRef = useRef<HTMLDivElement | null>(null)

  const { query, enableQuery } = useEntities(scheme)
  const { data, status, isFetching, refetch } = query

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

  const columnOptions = useMemo(() => {
    if (!data) return

    return Object.keys(columnVisibility).map(id => ({
      id,
      title: flatProps[id].title,
    }))
  }, [data, columnVisibility])

  const exportHandleClick = useCallback(() => {
    if (!data) return

    const selectedData =
      selectedRowIds.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds.includes(id))

    const worksheet = utils.json_to_sheet(selectedData)

    // Crea el libro de trabajo y agrega una hoja
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Datos')

    const date = new Date().toISOString().slice(0, 10)
    const fileName = `${title.plural} (${date}).xlsx`

    writeFile(workbook, fileName)
  }, [data, selectedRowIds])

  const optionHandleChange = useCallback<
    NonNullable<ComboboxProps['reportOption']>
  >(
    id =>
      setColumnVisibility(prev => {
        const newState = { ...prev }

        const checked = newState[id]
        newState[id] = !checked

        return newState
      }),
    [],
  )

  return (
    <div className="cmp-local-query" ref={localQueryRef}>
      <header>
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
          {columnOptions && (
            <Combobox
              keyName={`visibility-${key}`}
              title="Columnas"
              hideLabel
              multiple
              reduceHeader
              options={columnOptions}
              selectedIds={columnOptions.map(({ id }) => id)}
              reportOption={optionHandleChange}
            />
          )}
        </div>
        <div className="actions">
          {selectedRowIds.length !== 0 && <DeleteButton />}
          {data && (
            <>
              <ReportButton {...{ localQueryRef }} />
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
      {data && <Table {...{ data, columnVisibility, setColumnVisibility }} />}
    </div>
  )
}

export default LocalQuery
