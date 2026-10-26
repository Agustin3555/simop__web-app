import './Cell.css'
import { useSubmitAction } from '@/hooks'
import { Button } from '@/components'
import { ServiceData } from '@/infra/http/service.type'
import { ColumnBehavior } from '@/shared/core/types'
import { NewTableProps } from '../../NewTable'

interface CellProps extends Pick<NewTableProps, 'updater'> {
  rowId: string
  column: ColumnBehavior
  value: unknown
  editMode: boolean
}

export const Cell = ({
  rowId,
  column: {
    usefulDef: {
      key,
      input: { isHidden },
    },
    getFormField,
    writeFormValue,
    getTableCell,
  },
  value,
  updater,
  editMode,
}: CellProps) => {
  const { handleSubmit, actionState } = useSubmitAction(
    async ({ formValues, setSuccess, setError }) => {
      try {
        const data: ServiceData = {}
        writeFormValue(formValues, data)
        await updater!(rowId, data)

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <div className="new-cmp-cell" style={{ width: `var(--col-${key}-size)` }}>
      {updater && editMode && !isHidden ? (
        <form onSubmit={handleSubmit}>
          {getFormField(value, true)}
          <Button
            faIcon="fa-solid fa-check"
            size="s"
            submit
            {...{ actionState }}
          />
        </form>
      ) : (
        getTableCell(value)
      )}
    </div>
  )
}
