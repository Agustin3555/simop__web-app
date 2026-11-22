import './LocalQuery.css'
import { useEffect, useMemo } from 'react'
import { useQueryActionState } from '@/hooks'
import { useTableQuery } from '../../hooks/useTableQuery.hook'
import { useTableDef } from '../../hooks/useTableDef.hook'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { DeleteButton } from './components'
import DataDownloadBanner from '../DataDownloadBanner/DataDownloadBanner'
import { Table, TableProps } from '@/shared/components'
import { compareObjects } from '@/shared/helpers/compareObjects.helper'
import { Button } from '@/shared/components/Button/Button'

const LocalQueryBody = () => {
  const { columns } = useTableDef()

  const selectedConfig = useConfigs(s =>
    s.configs.find(({ id }) => id === s.selectedId)!,
  )

  const setSelectedStates = useConfigs(s => s.setSelectedStates)

  const { states } = selectedConfig

  const fetchedColumns = useMemo(
    () =>
      columns.filter(({ usefulDef: { key } }) =>
        states.columnFetch.includes(key),
      ),
    [columns, states.columnFetch],
  )

  const rowSelection = useTable(s => s.rowSelection)
  const columnOrder = useTable(s => s.columnOrder)
  const columnVisibility = useTable(s => s.columnVisibility)
  const columnWidths = useTable(s => s.columnWidths)
  const columnSorting = useTable(s => s.columnSorting)
  const columnFilters = useTable(s => s.columnFilters)
  const columnCalcs = useTable(s => s.columnCalcs)

  const tableStates = useMemo(
    () => ({
      columnOrder,
      columnVisibility,
      columnWidths,
      columnSorting,
      columnFilters,
      columnCalcs,
    }),
    [
      columnCalcs,
      columnFilters,
      columnOrder,
      columnSorting,
      columnVisibility,
      columnWidths,
    ],
  )

  const {
    query: { data, status, isFetching },
    refetch,
    updateItem,
  } = useTableQuery()

  const queryActionState = useQueryActionState({ status, isFetching })

  const handleSaveConfig = () => setSelectedStates(tableStates)

  const updater: TableProps['updater'] = async (id, data) => {
    return await updateItem(Number(id), data)
  }

  const isSameStates = useMemo(() => {
    const comparableStates = Object.fromEntries(
      (Object.keys(tableStates) as (keyof typeof tableStates)[]).map(key => [
        key,
        states[key],
      ]),
    )

    return compareObjects(tableStates, comparableStates, ['columnOrder'])
  }, [tableStates, states])

  return (
    <div className="cmp-local-query">
      {data ? (
        <>
          <header>
            <div className="left">
              <Button
                title="Consultar datos"
                iconClass={`fa-solid fa-arrows-rotate`}
                size="l"
                border
                actionState={queryActionState}
                onAction={refetch}
              />
              {!isSameStates && (
                <Button
                  handlingClass="save-config"
                  text="Guardar configuración"
                  iconClass={`fa-solid fa-floppy-disk`}
                  size="l"
                  border
                  onAction={handleSaveConfig}
                />
              )}
            </div>
            <div className="right">
              {rowSelection.length !== 0 && <DeleteButton />}
            </div>
          </header>
          <Table columns={fetchedColumns} {...{ updater, data }} />
        </>
      ) : (
        <DataDownloadBanner
          actionState={queryActionState}
          onDownload={refetch}
        />
      )}
    </div>
  )
}

const LocalQuery = () => {
  // TODO: se puede optimizar

  const selectedId = useConfigs(s => s.selectedId)
  const { resetQuery } = useTableQuery()

  useEffect(() => {
    resetQuery()
  }, [selectedId])

  return <LocalQueryBody key={selectedId} />
}

export default LocalQuery
