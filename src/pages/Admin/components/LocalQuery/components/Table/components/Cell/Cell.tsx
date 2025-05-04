import './Cell.css'
import { useScheme } from '@/pages/Admin/hooks'
import { Cell as TsCell } from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'
import { useMemo } from 'react'
import { steppedSizes } from '../../helpers'
import { AccesorKeys } from '../../Table'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  cell: TsCell<GeneralEntity, unknown>
  accesorKeys: AccesorKeys
}

const Cell = ({ flatProps, cell, accesorKeys }: Props) => {
  const { row, column } = cell
  const { original } = row
  const { id, columnDef, getSize } = column

  const component = useMemo(
    () => flatProps[id].getValueComponent(original, accesorKeys[id]),
    [original, accesorKeys],
  )

  const width = steppedSizes(columnDef.minSize!, getSize())

  return (
    <div className="cmp-cell" style={{ width }}>
      {component}
    </div>
  )
}

export default Cell
