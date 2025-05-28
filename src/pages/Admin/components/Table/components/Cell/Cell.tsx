import './Cell.css'
import { Cell as TsCell } from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'
import { useMemo } from 'react'
import { steppedSizes } from '../../helpers'
import { AccessorKeys } from '../../Table'
import { PropScheme } from '@/pages/Admin/meta'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  getAllPropsRecord: Record<string, PropScheme<GeneralEntity>>
  cell: TsCell<GeneralEntity, unknown>
  accessorKeys: AccessorKeys
}

const Cell = ({ getAllPropsRecord, cell, accessorKeys }: Props) => {
  const { row, column } = cell
  const { original } = row
  const { id, columnDef, getSize } = column

  const component = useMemo(
    () => getAllPropsRecord[id].getValueComponent(original, accessorKeys[id]),
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
