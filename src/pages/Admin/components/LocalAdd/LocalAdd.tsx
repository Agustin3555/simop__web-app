import './LocalAdd.css'
import { useMemo } from 'react'
import { useSubmitAction } from '@/hooks'
import { useTableDef } from '../../hooks/useTableDef.hook'
import { useTableQuery } from '../../hooks/useTableQuery.hook'
import Form from '../Form/Form'

const LocalAdd = () => {
  const {
    tableDef: { key, mutationColumns, mutationColumnGroups },
    columns,
  } = useTableDef()

  const { createItem } = useTableQuery()

  const fieldGroups = useMemo(
    () =>
      mutationColumnGroups.map(({ columnKeys, ...rest }) => ({
        fields: columnKeys.map(columnKey =>
          columns.find(c => c.usefulDef.key === columnKey)!.getFormField(),
        ),
        ...rest,
      })),
    [],
  )

  const submitActionResult = useSubmitAction(
    async ({ formValues, setError, setSuccess }) => {
      try {
        const createData: Record<string, unknown> = {}

        mutationColumns.forEach(columnKey =>
          columns
            .find(c => c.usefulDef.key === columnKey)!
            .writeFormValue(formValues, createData),
        )

        // console.log(createData)

        await createItem(createData)

        await setSuccess()
      } catch (error) {
        // console.log(error)

        await setError()
      }
    },
  )

  return (
    <div className="cmp-local-add">
      <Form
        tableKey={key}
        enableReset
        {...submitActionResult}
        {...{ fieldGroups }}
      />
    </div>
  )
}

export default LocalAdd
