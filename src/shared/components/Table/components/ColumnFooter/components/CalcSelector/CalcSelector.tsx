import './CalcSelector.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { ColumnBehavior } from '@/shared/core/types'
import {
  ComboboxProps,
  NewCombobox,
} from '@/shared/components/Combobox/Combobox'
import { CalcResults } from '@/shared/components/Table/hooks/useTableModel.hook'

interface CalcSelectorProps {
  columnKey: string
  calcs: ReturnType<NonNullable<ColumnBehavior['getTableFooterCalcs']>>
  calcResult: CalcResults[number]
  getTableCell: ColumnBehavior['getTableCell']
}

export const CalcSelector = ({
  columnKey,
  calcs,
  calcResult,
  getTableCell,
}: CalcSelectorProps) => {
  const setColumnCalc = useTable(s => s.setColumnCalc)

  const options: ComboboxProps['options'] = Object.entries(calcs).map(
    ([key, { label }]) => ({ value: key, label }),
  )

  return (
    <div className="cmp-calc-selector">
      <NewCombobox
        name="calcs"
        selected={calcResult ? [calcResult.calc] : []}
        onChange={selected => {
          setColumnCalc(
            columnKey,
            selected.length === 0 ? undefined : selected[0],
          )
        }}
        {...{ options }}
      />
      {calcResult && (
        <div className="result">{getTableCell(calcResult.result)}</div>
      )}
    </div>
  )
}
