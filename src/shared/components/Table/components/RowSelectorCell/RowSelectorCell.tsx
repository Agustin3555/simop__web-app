import './RowSelectorCell.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Checker } from '@/pages/Admin/components'
import { RowKey } from '../../contexts/Table/table.store'

interface RowSelectorCellProps {
  rowKey: RowKey
}

export const RowSelectorCell = ({ rowKey }: RowSelectorCellProps) => {
  const rowSelection = useTable(s => s.rowSelection)
  const setRowSelection = useTable(s => s.setRowSelection)

  const selected = !!rowSelection.find(
    selectedRowKey => selectedRowKey === rowKey,
  )

  return (
    <div className="new-cmp-row-selector-cell">
      <label title="Alternar selección">
        <input
          type="checkbox"
          checked={selected}
          hidden
          onChange={() => setRowSelection(rowKey)}
        />
        <Checker />
      </label>
    </div>
  )
}
