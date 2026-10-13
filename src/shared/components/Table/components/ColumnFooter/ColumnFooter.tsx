import './ColumnFooter.css'
import { useMemo } from 'react'
import { ColumnBehavior } from '@/shared/core/types'

interface ColumnFooterProps {
  propBuilders: ColumnBehavior
  values?: unknown[]
}

export const ColumnFooter = ({ propBuilders, values }: ColumnFooterProps) => {
  const {
    def: { key, title },
    getTableCell,
    getTableColumnCalcs,
  } = propBuilders

  const calcs = useMemo(
    () => values && getTableColumnCalcs!(values),
    [getTableColumnCalcs, values],
  )

  const selectCalc = calcs?.[0]

  return (
    <div
      className="cmp-column-footer"
      style={{ width: `var(--col-${key}-size)` }}
    >
      {selectCalc && (
        <div className="content">
          <h2 className="text">{selectCalc.label}</h2>
          {getTableCell(selectCalc.result())}
        </div>
      )}
      <small className="text">{title}</small>
    </div>
  )
}
