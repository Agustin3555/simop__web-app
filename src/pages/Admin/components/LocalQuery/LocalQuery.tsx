import './LocalQuery.css'
import { useCallback, useState } from 'react'
import { useHandleAction } from '@/hooks'
import { useScheme } from '../../hooks'
import { Button, Icon, StateButton } from '@/components'
import { Table } from './components'
import { Entity } from '@/services/config'
import { utils, writeFile } from 'xlsx'
import { SecureHoldButton } from '..'

const LocalQuery = () => {
  const { scheme } = useScheme()
  const { title, service } = scheme

  const [data, setData] = useState<Entity[]>()
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([])

  const handleActionResult = useHandleAction(
    async ({ setError, setSuccess }) => {
      try {
        const response = await service.getAll()
        setData(response)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const { actionState, handleAction } = useHandleAction(
    async ({ setSuccess, setError }) => {
      try {
        await service.deleteMany(selectedRowIds)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  const handleExportClick = useCallback(() => {
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
        <div className="actions">
          {selectedRowIds.length !== 0 && (
            <SecureHoldButton
              text="Eliminar"
              title="Eliminar seleccionados"
              faIcon="fa-solid fa-trash"
              type="secondary"
              action={handleAction}
              {...{ actionState }}
            />
          )}
          {data && (
            <Button
              text="Descargar Excel"
              title={`Descargar Excel (${
                selectedRowIds.length === 0 ? 'todo' : 'seleccionados'
              })`}
              faIcon="fa-solid fa-file-excel"
              _type="secondary"
              onClick={handleExportClick}
            />
          )}
        </div>
      </header>
      {data && <Table {...{ data, selectedRowIds, setSelectedRowIds }} />}
    </div>
  )
}

export default LocalQuery
