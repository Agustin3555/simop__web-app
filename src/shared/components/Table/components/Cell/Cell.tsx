import './Cell.css'
import { ColumnBehavior } from '@/shared/core/types'

interface CellProps {
  column: ColumnBehavior
  value: unknown
}

export const Cell = ({
  column: {
    def: { key },
    getTableCell,
  },
  value,
}: CellProps) => {
  return (
    <div className="new-cmp-cell" style={{ width: `var(--col-${key}-size)` }}>
      {getTableCell(value)}
    </div>
  )
}
