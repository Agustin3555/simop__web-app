import './LocalQuery.css'
import { useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useEntities, useRowSelection, useMetaModel } from '../../hooks'
import { Button } from '@/components'
import { DataDownloadBanner, ReportButton, ReportInTable, Table } from '..'
import { QuickFilters, TableProps } from '../Table/Table'
import { DeleteButton } from './components'
import { generateTableImages } from '../../helpers'
import { TableProvider } from '../../contexts/table.context'

export interface LocalQueryProps extends Pick<TableProps, 'methods'> {
  fetch?: {
    key?: string
    getAll?: string
  }
}

const LocalQuery = ({ fetch, methods }: LocalQueryProps) => {
  const { key, title, service } = useMetaModel()

  const [quickFilters, setQuickFilters] = useState<QuickFilters>({})

  const hasQuickFilters = useMemo(
    () => Object.keys(quickFilters).length !== 0,
    [quickFilters],
  )

  const { selectedRowIds } = useRowSelection()!

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

  const componentRef = useRef<HTMLDivElement | null>(null)

  const handleReportGenerate = useCallback(async () => {
    if (!componentRef.current) return

    const localQueryElement = componentRef.current

    const tableElement = localQueryElement.querySelector<HTMLElement>('.table')
    if (!tableElement) return

    const imageUrls = await generateTableImages(tableElement)
    if (!imageUrls) return

    return <ReportInTable schemeTitle={title.plural} {...{ imageUrls }} />
  }, [])

  return (
    <div className="cmp-local-query" ref={componentRef}>
      {data ? (
        <>
          <header>
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
                faIcon={`fa-solid fa-arrows-rotate`}
                actionState={queryActionState}
                onAction={queryHandleClick}
              />
            </div>
            <div className="actions">
              {selectedRowIds.length !== 0 && <DeleteButton />}
              <ReportButton onGenerate={handleReportGenerate} />
            </div>
          </header>
          <TableProvider>
            <Table {...{ data, setQuickFilters, methods }} />
          </TableProvider>
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
