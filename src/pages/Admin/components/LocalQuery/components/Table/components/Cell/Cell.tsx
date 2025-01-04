import './Cell.css'
import { useScheme } from '@/pages/Admin/hooks'
import { Cell as TanstackCell } from '@tanstack/react-table'
import { Entity } from '@/services/config'

/*
  No se usa 'getValue' porque se necesita tener el valor original. 'getValue'
  obtiene un valor procesado porque en la definición de las columnas se
  provee un método 'accessorFn'
*/

interface Props {
  cell: TanstackCell<Entity, unknown>
  flatProps: ReturnType<typeof useScheme>['flatProps']
}

const Cell = ({ flatProps, cell }: Props) => {
  const component = flatProps[cell.column.id].getCellComponent(cell.row)

  return <td className="cmp-cell">{component}</td>
}

export default Cell
