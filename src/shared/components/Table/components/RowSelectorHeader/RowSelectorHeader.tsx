import './RowSelectorHeader.css'
import { useTable } from '../../contexts/Table/useTable.hook'
import { Button } from '@/components'
import { Dropdown } from '@/shared/components'
import { RowKey } from '../../contexts/Table/table.store'

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
            faIcon="fa-solid fa-ellipsis-vertical"
            size="s"
            type="secondary"
            buttonHTMLAttrs={attrs}
          />
        )}
      >
        {attrs => (
          <>
            <Button
              text="Seleccionar todo"
              faIcon="fa-solid fa-check-square"
              size="m"
              type="secondary"
              inverted
              onAction={() => selectAllRows(allRowKeys)}
              buttonHTMLAttrs={attrs}
            />
            <Button
              text="Deseleccionar todo"
              faIcon="fa-regular fa-square"
              size="m"
              type="secondary"
              inverted
              onAction={() => deselectAllRows()}
              buttonHTMLAttrs={attrs}
            />
            <Button
              text="Seleccionar filtrados"
              faIcon="fa-solid fa-check-square"
              size="m"
              type="secondary"
              inverted
              onAction={() => selectFilteredRows(filteredRowKeys)}
              buttonHTMLAttrs={attrs}
            />
            <Button
              text="Deseleccionar filtrados"
              faIcon="fa-regular fa-square"
              size="m"
              type="secondary"
              inverted
              onAction={() => deselectFilteredRows(filteredRowKeys)}
              buttonHTMLAttrs={attrs}
            />
          </>
        )}
      </Dropdown>
    </div>
  )
}
