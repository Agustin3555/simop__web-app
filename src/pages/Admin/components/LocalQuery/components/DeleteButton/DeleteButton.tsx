import './DeleteButton.css'
import { useMemo } from 'react'
import { useHandleAction } from '@/hooks'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { useTableQuery } from '@/pages/Admin/hooks/useTableQuery.hook'
import { NewButton } from '@/shared/components/Button/Button'

export const DeleteButton = () => {
  const rowSelection = useTable(s => s.rowSelection)
  const deselectAllRows = useTable(s => s.deselectAllRows)
  const { deleteManyItems } = useTableQuery()

  const selectedRowIds = useMemo(() => rowSelection.map(Number), [rowSelection])

  const deleteAction = useHandleAction(async ({ setSuccess, setError }) => {
    try {
      await deleteManyItems(selectedRowIds)
      deselectAllRows()

      await setSuccess()
    } catch (error) {
      await setError()
    }
  })

  return (
    <NewButton
      handlingClass="cmp-delete-button"
      text="Eliminar"
      title="Eliminar seleccionados"
      iconClass="fa-solid fa-trash"
      size="l"
      holdToConfirm
      border
      {...deleteAction}
    />
  )
}
