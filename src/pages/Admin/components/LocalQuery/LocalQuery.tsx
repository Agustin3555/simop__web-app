import './LocalQuery.css'
import { useCallback, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { Button, Icon, StateButton } from '@/components'
import { Table } from './components'
import { Columns } from './types'
import { utils, writeFile } from 'xlsx'
import { GetAllProvider } from '@/types'

interface LocalQueryProps<T> extends GetAllProvider<T> {
  columns: Columns<T>
}

const LocalQuery = <T extends { id: number }>({
  getAllProvider,
  columns,
}: LocalQueryProps<T>) => {
  const [data, setData] = useState<T[]>()
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([])

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        const response = await getAllProvider()
        setData(response)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleExportClick = useCallback(() => {
    const selectedData =
      selectedRowIds.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds.includes(id))

    const worksheet = utils.json_to_sheet(selectedData)

    // Crea el libro de trabajo y agrega una hoja
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Datos')

    // TODO: agregar el nombre de la vista
    const date = new Date().toISOString().slice(0, 10)
    const fileName = `datos_${date}.xlsx`

    writeFile(workbook, fileName)
  }, [data, selectedRowIds])

  return (
    <div className="cmp-local-query">
      <header>
        <div className="left">
          <StateButton
            text="Consultar datos"
            hiddenText
            faIcon="fa-solid fa-cloud-arrow-down"
            {...handleActionResult}
          />
          {data && (
            <div className="total-items">
              <Icon faIcon="fa-solid fa-cubes-stacked" />
              <p>{data.length}</p>
            </div>
          )}
        </div>
        {data && (
          <Button
            title="Descargar Excel"
            faIcon="fa-solid fa-file-excel"
            _type="secondary"
            onClick={handleExportClick}
          />
        )}
      </header>
      {data && (
        <Table {...{ data, columns, selectedRowIds, setSelectedRowIds }} />
      )}
    </div>
  )
}

export default LocalQuery
