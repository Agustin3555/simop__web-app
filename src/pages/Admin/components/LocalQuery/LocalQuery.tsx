import './LocalQuery.css'
import { useCallback, useRef } from 'react'
import { useQueryActionState } from '@/hooks'
import { useEntities, useRowSelection, useScheme } from '../../hooks'
import { Button, Icon, StateButton } from '@/components'
import { DeleteButton, DownloadReportButton, Table } from './components'
import { utils, writeFile } from 'xlsx'

const LocalQuery = () => {
  const { scheme } = useScheme()
  const { title } = scheme

  const { selectedRowIds } = useRowSelection()
  const localQueryRef = useRef<HTMLDivElement | null>(null)

  const { query, enableQuery } = useEntities(scheme)
  const { data, status, isFetching, refetch } = query

  const queryActionState = useQueryActionState({ status, isFetching })

  const queryHandleClick = useCallback(async () => {
    enableQuery()

    if (data || status === 'error') await refetch()
  }, [data, status])

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
        </div>
        <div className="actions">
          {selectedRowIds.length !== 0 && <DeleteButton />}
          {data && (
            <>
              <DownloadReportButton {...{ localQueryRef }} />
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
      {data && <Table {...{ data }} />}
    </div>
  )
}

export default LocalQuery
