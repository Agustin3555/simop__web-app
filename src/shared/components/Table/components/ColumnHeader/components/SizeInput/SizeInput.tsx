import './SizeInput.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { varList } from '@/helpers'

interface SizeInputProps {
  columnKey: string
  initSize: number
}

export const SizeInput = ({ columnKey, initSize }: SizeInputProps) => {
  const columnWidths = useTable(s => s.columnWidths)
  const setColumnWidth = useTable(s => s.setColumnWidth)

  const { points = initSize } =
    columnWidths.find(f => f.columnKey === columnKey) ?? {}

  return (
    <label
      className="cmp-size-input"
      style={varList({ chars: String(points).length })}
    >
      <input
        type="number"
        value={points}
        min={8}
        max={30}
        step={1}
        onChange={({ target: { value } }) => {
          setColumnWidth(columnKey, Math.round(Number(value)))
        }}
      />
    </label>
  )
}
