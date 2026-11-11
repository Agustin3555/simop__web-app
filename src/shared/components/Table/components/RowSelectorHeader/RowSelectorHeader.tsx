import './RowSelectorHeader.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Dropdown } from '@/shared/components'
import { RowKey } from '../../contexts/Table/table.store'
import { Button } from '@/shared/components/Button/Button'

interface RowSelectorHeaderProps {
  allRowKeys: RowKey[]
  filteredRowKeys: RowKey[]
}

export const RowSelectorHeader = ({
  allRowKeys,
  filteredRowKeys,
}: RowSelectorHeaderProps) => {
  const rowSelection = useTable(s => s.rowSelection)
  const selectAllRows = useTable(s => s.selectAllRows)
  const deselectAllRows = useTable(s => s.deselectAllRows)
  const selectFilteredRows = useTable(s => s.selectFilteredRows)
  const deselectFilteredRows = useTable(s => s.deselectFilteredRows)

  return (
    <div className="cmp-row-selector-header">
      <div className="counter">
        <small>{rowSelection.length}</small>
      </div>
      <Dropdown
        opener={attrs => (
          <Button
            title="Acciones de selección"
            iconClass="fa-solid fa-ellipsis-vertical"
            size="s"
            border
            htmlAttrs={attrs}
          />
        )}
      >
        {attrs => (
          <>
            <Button
              text="Seleccionar filtrados"
              iconClass="fa-solid fa-check-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => selectFilteredRows(filteredRowKeys)}
            />
            <Button
              text="Deseleccionar filtrados"
              iconClass="fa-regular fa-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => deselectFilteredRows(filteredRowKeys)}
            />
            <Button
              text="Seleccionar todo"
              iconClass="fa-solid fa-check-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => selectAllRows(allRowKeys)}
            />
            <Button
              text="Deseleccionar todo"
              iconClass="fa-regular fa-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => deselectAllRows()}
            />
          </>
        )}
      </Dropdown>
    </div>
  )
}
