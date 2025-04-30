import './Cell.css'
import { useScheme } from '@/pages/Admin/hooks'
import { Cell as TsCell } from '@tanstack/react-table'
import { Entity } from '@/services/config'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { steppedSizes } from '../../helpers'
import { AccesorKeys } from '../../Table'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  cell: TsCell<Entity, unknown>
  accesorKeys: AccesorKeys
  setAccesorKeys: Dispatch<SetStateAction<AccesorKeys>>
}

const Cell = ({ flatProps, cell, accesorKeys, setAccesorKeys }: Props) => {
  const { column, row } = cell

  const component = useMemo(
    () => flatProps[column.id].getCellComponent(row),
    [column.id, row],
  )

  const width = steppedSizes(column.columnDef.minSize!, column.getSize())

  return (
    <div className="cmp-cell" style={{ width }}>
      {component}
    </div>
  )
}

export default Cell
