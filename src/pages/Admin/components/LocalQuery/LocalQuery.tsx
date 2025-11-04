import './LocalQuery.css'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import {
  useConfigModule,
  useLazyQuery,
  useMetaModel,
  useTable,
} from '../../hooks'
import { Button, Toggle } from '@/components'
import { DataDownloadBanner, GraphList, ReportButton, Table } from '..'
import { DeleteButton } from './components'
import { GraphScreenshotsProvider } from '../../providers'
import { buildConfigKey } from '../../helpers'
import { classList } from '@/helpers'

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
      component: <GraphList />,
    }

    return [graphListPanel, ...customPanels]
  }, [])

  const [panelToggles, setPanelToggles] = useState(
    Object.fromEntries(panels.map(v => [v.key, false])),
  )

  const { key, service } = useMetaModel()
  const { selectedConfig } = useConfigModule()

  const { states } = useTable()
  const { selectedRowIds } = states

  const { query, handleClick } = useLazyQuery(
    buildConfigKey(key, selectedConfig),
    () => service.getAll(selectedConfig.columns),
  )

  const handleChange = useCallback<(key: string) => () => void>(
    key => () =>
      setPanelToggles(prev => {
        const newState = { ...prev }
        newState[key] = !newState[key]
        return newState
      }),
    [],
  )

  const { data, status, isFetching } = query

  const queryActionState = useQueryActionState({ status, isFetching })

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
                  onAction={handleClick}
                />
              </div>
              <div className="actions">
                {selectedRowIds.length !== 0 && <DeleteButton />}
                <ReportButton />
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
            <Table {...{ data }} />
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
          onDownload={handleClick}
        />
      )}
    </div>
  )
}

const LocalQuery = (props: LocalQueryProps) => {
  const { selectedConfig } = useConfigModule()
  const { id, columns } = selectedConfig

  return <LocalQueryBody key={[id, columns.length].join('-')} {...props} />
}

export default LocalQuery
