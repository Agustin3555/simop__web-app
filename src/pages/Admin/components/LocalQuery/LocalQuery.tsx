import './LocalQuery.css'
import { useCallback } from 'react'
import { useQueryActionState } from '@/hooks'
import { useEntities, useMetaModel, useTable } from '../../hooks'
import { Button } from '@/components'
import { DataDownloadBanner, GraphList, ReportButton, Table } from '..'
import { TableProps } from '../Table/Table'
import { DeleteButton } from './components'

export interface LocalQueryProps extends Pick<TableProps, 'methods'> {
  fetch?: {
    key?: string
    getAll?: string
  }
}

const LocalQuery = ({ fetch, methods }: LocalQueryProps) => {
  const { key, service } = useMetaModel()
  const { states } = useTable()
  const { selectedRowIds } = states

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

  return (
    <div className="cmp-local-query">
      {data ? (
        <>
          <header>
            <div className="left">
              <Button
                title="Consultar datos"
                faIcon={`fa-solid fa-arrows-rotate`}
                actionState={queryActionState}
                onAction={queryHandleClick}
              />
            </div>
            <div className="actions">
              {selectedRowIds.length !== 0 && <DeleteButton />}
              <ReportButton {...{ methods }} />
            </div>
          </header>
          <Table {...{ data, methods }} />
          {/* <GraphList /> */}
        </>
      ) : (
        <DataDownloadBanner
          actionState={queryActionState}
          onDownload={queryHandleClick}
        />
      )}
    </div>
  )
}

export default LocalQuery
