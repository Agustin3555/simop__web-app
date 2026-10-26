import './NewTable.css'
import { useEffect, useState } from 'react'
import { useTable } from './contexts/Table/useTable.hook'
import { useTableModel } from './hooks/useTableModel.hook'
import { useInfiniteRows } from './hooks/useInfiniteRowsTable.hook'
import {
  Cell,
  ColumnFooter,
  ColumnHeader,
  RowSelectorCell,
  RowSelectorHeader,
  TogglesState,
  Toolbar,
} from './components'
import { DragDropProvider } from '@dnd-kit/react'
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { classList, varList } from '@/helpers'
import { ColumnBehavior } from '@/shared/core/types'
import { ServiceData } from '@/infra/http/service.type'

const togglesStateInit: TogglesState = {
  columnControl: false,
  stickHeader: false,
  stickFooter: false,
}

export interface NewTableProps {
  columns: ColumnBehavior[]
  rowKey?: string
  updater?: (id: string, data: ServiceData) => Promise<void>
  data: object[]
}

export const NewTable = ({
  columns,
  rowKey = 'id',
  updater,
  data,
}: NewTableProps) => {
  const editModeState = useState(false)
  const [editMode] = editModeState

  const togglesState = useState<TogglesState>(togglesStateInit)
  const [toggles] = togglesState

  const loadColumns = useTable(s => s.loadColumns)
  // const state = useTable(s => s.columnVisibility)

  useEffect(() => {
    loadColumns(columns)
  }, [columns, loadColumns])

  const {
    renderedColumns,
    hiddenColumns,
    columnSizeVars,
    handleColumnDragEnd,

    renderedRows,
    selectedRows,
    allRowKeys,
    filteredRowKeys,

    calcResults,
  } = useTableModel(data, rowKey)

  const { containerRef, visibleRows, loadMoreTrigger } =
    useInfiniteRows(renderedRows)

  return (
    <div className="new-cmp-table" style={varList(columnSizeVars)}>
      {/* {JSON.stringify(state)} */}
      <Toolbar
        dataLength={data.length}
        {...(updater && { editModeState })}
        {...{
          renderedColumns,
          renderedRows,
          selectedRows,
          calcResults,
          togglesState,
        }}
      />
      <article className="new-table" ref={containerRef}>
        <DragDropProvider
          modifiers={[RestrictToHorizontalAxis]}
          onDragEnd={handleColumnDragEnd}
        >
          <header className={classList({ stick: toggles.stickHeader })}>
            <RowSelectorHeader {...{ allRowKeys, filteredRowKeys }} />
            {renderedColumns.map((c, i) => (
              <ColumnHeader
                key={c.usefulDef.key}
                propBuilders={c}
                index={i}
                control={toggles.columnControl}
              />
            ))}
            {toggles.columnControl &&
              hiddenColumns.map(c => (
                <ColumnHeader key={c.usefulDef.key} propBuilders={c} hidden />
              ))}
          </header>
        </DragDropProvider>
        <ol className="body">
          {visibleRows.map(r => (
            <li className="row" key={r.key}>
              <RowSelectorCell rowKey={r.key} />
              {renderedColumns.map(c => (
                <Cell
                  key={`${r.key}-${c.usefulDef.key}`}
                  rowId={r.key}
                  column={c}
                  value={r.row[c.usefulDef.key]}
                  {...{ updater, editMode }}
                />
              ))}
            </li>
          ))}
          {loadMoreTrigger}
        </ol>
        <footer className={classList({ stick: toggles.stickFooter })}>
          <RowSelectorHeader {...{ allRowKeys, filteredRowKeys }} />
          {renderedColumns.map((c, i) => (
            <ColumnFooter
              key={c.usefulDef.key}
              column={c}
              calcResult={calcResults[i]}
            />
          ))}
        </footer>
      </article>
    </div>
  )
}
