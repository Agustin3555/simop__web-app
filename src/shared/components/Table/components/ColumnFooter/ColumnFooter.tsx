import './ColumnFooter.css'
import { ColumnBehavior } from '@/shared/core/types'
import { CalcSelector } from './components'
import { CalcResults } from '../../hooks/useTableModel.hook'

interface ColumnFooterProps {
  column: ColumnBehavior
  calcResult: CalcResults[number]
}

export const ColumnFooter = ({
  column: {
    usefulDef: { key, title },
    getTableCell,
    getTableFooterCalcs,
  },
  calcResult,
}: ColumnFooterProps) => {
  return (
    <div
      className="cmp-column-footer"
      style={{ width: `var(--col-${key}-size)` }}
    >
      {getTableFooterCalcs && (
        <CalcSelector
          columnKey={key}
          calcs={getTableFooterCalcs()}
          {...{ calcResult, getTableCell }}
        />
      )}
      <small className="text">{title}</small>
    </div>
  )
}
