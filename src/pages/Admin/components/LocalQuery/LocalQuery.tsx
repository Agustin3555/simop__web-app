import './LocalQuery.css'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { Button, Toggle } from '@/components'
import { DeleteButton } from './components'
import { classList } from '@/helpers'
import { useTableQuery } from '../../hooks/useTableQuery.hook'
import { useTableDef } from '../../hooks/useTableDef.hook'
import { GraphScreenshotsProvider } from '../../providers/graphScreenshots.provider'
import DataDownloadBanner from '../DataDownloadBanner/DataDownloadBanner'
import GraphList from '../GraphList/GraphList'
// import Table from '../Table/Table'
import { NewTable, NewTableProps } from '@/shared/components'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { compareObjects } from '@/shared/helpers/compareObjects.helper'

interface Panel {
  key: string
  title: string
  faIcon: string
  component: ReactNode
}

export interface LocalQueryProps {
  panels?: Panel[]
}

const LocalQueryBody = ({ panels: customPanels = [] }: LocalQueryProps) => {
  const panels = useMemo(() => {
    const graphListPanel: Panel = {
      key: 'graphsList',
      title: 'Gráficos',
      faIcon: 'fa-solid fa-chart-pie',
      component: <p>GraphList</p>,
      // component: <GraphList />,
    }

    return [graphListPanel, ...customPanels]
  }, [])

  const [panelToggles, setPanelToggles] = useState(
    Object.fromEntries(panels.map(v => [v.key, false])),
  )

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

  const handleChange = useCallback<(key: string) => () => void>(
    key => () =>
      setPanelToggles(prev => {
        const newState = { ...prev }
        newState[key] = !newState[key]
        return newState
      }),
    [],
  )

  const handleSaveConfig = () => setSelectedStates(tableStates)

  const updater: NewTableProps['updater'] = async (id, data) => {
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
        <GraphScreenshotsProvider>
          <div className="group">
            <header>
              <div className="left">
                <Button
                  title="Consultar datos"
                  faIcon={`fa-solid fa-arrows-rotate`}
                  actionState={queryActionState}
                  onAction={refetch}
                />
                {!isSameStates && (
                  <Button
                    handlingClass="save-config"
                    text="Guardar configuración"
                    faIcon={`fa-solid fa-floppy-disk`}
                    type="secondary"
                    onAction={handleSaveConfig}
                  />
                )}
              </div>
              <div className="actions">
                {rowSelection.length !== 0 && <DeleteButton />}
                {panels.map(({ key, title, faIcon }) => (
                  <Toggle
                    key={key}
                    title={`Mostrar ${title}`}
                    value={panelToggles[key]}
                    size="l"
                    onChange={handleChange(key)}
                    {...{ faIcon }}
                  />
                ))}
              </div>
            </header>
            <NewTable columns={fetchedColumns} {...{ updater, data }} />
          </div>
          <div
            className={classList('panels', {
              active: Object.values(panelToggles).find(v => v === true)!,
            })}
          >
            {panels.map(({ key, component }) => (
              <div
                key={key}
                className={classList('panel', { active: panelToggles[key] })}
              >
                {component}
              </div>
            ))}
          </div>
        </GraphScreenshotsProvider>
      ) : (
        <DataDownloadBanner
          actionState={queryActionState}
          onDownload={refetch}
        />
      )}
    </div>
  )
}

const LocalQuery = (props: LocalQueryProps) => {
  // TODO: se puede optimizar

  const selectedId = useConfigs(s => s.selectedId)
  const { resetQuery } = useTableQuery()

  useEffect(() => {
    resetQuery()
  }, [selectedId])

  return <LocalQueryBody key={selectedId} {...props} />
}

export default LocalQuery
