import './RowSelectorHeader.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Dropdown } from '@/shared/components'
import { RowKey } from '../../contexts/Table/table.store'
import { NewButton } from '@/shared/components/Button/Button'

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
          <NewButton
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
            <NewButton
              text="Seleccionar filtrados"
              iconClass="fa-solid fa-check-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => selectFilteredRows(filteredRowKeys)}
            />
            <NewButton
              text="Deseleccionar filtrados"
              iconClass="fa-regular fa-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => deselectFilteredRows(filteredRowKeys)}
            />
            <NewButton
              text="Seleccionar todo"
              iconClass="fa-solid fa-check-square"
              border
              bodyStretch
              htmlAttrs={attrs}
              onAction={() => selectAllRows(allRowKeys)}
            />
            <NewButton
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
