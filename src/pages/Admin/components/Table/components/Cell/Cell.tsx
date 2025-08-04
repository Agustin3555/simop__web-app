import './Cell.css'
import { Cell as TsCell } from '@tanstack/react-table'
import { LooseEntity } from '@/models/config'
import { useMemo } from 'react'
import { steppedSizes } from '../../helpers'
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

const Cell = ({ getAllPropsRecord, cell }: Props) => {
  const { row, column } = cell
  const { original } = row
  const { id, columnDef, getSize } = column
  const { accessorKeys } = useTable().states

  const component = useMemo(
    () => getAllPropsRecord[id].getTableCell(original, accessorKeys[id]),
    [original, accessorKeys],
  )

  const width = steppedSizes(columnDef.minSize!, getSize())

  return (
    <div className="cmp-cell" style={{ width }}>
      {component}
    </div>
  )
}

export default Cell
