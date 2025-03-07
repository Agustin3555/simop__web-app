import './Cell.css'
import { useScheme } from '@/pages/Admin/hooks'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { Entity } from '@/services/config'
import { useMemo } from 'react'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  flatProps: ReturnType<typeof useScheme>['flatProps']
  cell: TanstackCell<Entity, unknown>
}

const Cell = ({ flatProps, cell }: Props) => {
  const component = useMemo(
    () => flatProps[cell.column.id].getCellComponent(cell.row),
    [],
  )

  return <td className="cmp-cell">{component}</td>
}

export default Cell
