import './Cell.css'
import { memo, useMemo } from 'react'
import { Cell as TsCell } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import { Prop } from '@/pages/Admin/meta/utils'
import { useTable } from '@/pages/Admin/hooks'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  getAllPropsRecord: Record<string, Prop>
  cell: TsCell<LooseEntity, unknown>
}

const Cell = ({
  getAllPropsRecord,
  cell: {
    row: { original },
    column: { id },
  },
}: Props) => {
  const { accessorKeys } = useTable().states

  const component = useMemo(
    () => getAllPropsRecord[id].getTableCell(original, accessorKeys[id]),
    [original, accessorKeys],
  )

  return (
    <div className="cmp-cell" style={{ width: `var(--col-${id}-size)` }}>
      {component}
    </div>
  )
}

export default memo(Cell)
