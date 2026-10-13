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
  ToggleStates,
  Toolbar,
} from './components'
import { DragDropProvider } from '@dnd-kit/react'
import { RestrictToHorizontalAxis } from '@dnd-kit/abstract/modifiers'
import { classList, varList } from '@/helpers'
import { ColumnDef, ColumnBehavior } from '@/shared/core/types'
import { buildTextColumnBehavior } from '@/shared/core/columns/text'
import { buildNumberColumnBehavior } from '@/shared/core/columns/number'

const COLUMN_BEHAVIOR_BUILDERS: Record<
  ColumnDef['type'],
  (prop: any) => ColumnBehavior
> = {
  text: buildTextColumnBehavior,
  number: buildNumberColumnBehavior,
}

export interface TableProps {
  data: Record<string, unknown>[]
  columnDefs: ColumnDef[]
  rowKey: string
}

export const NewTable = ({ columnDefs, data, rowKey }: TableProps) => {
  const loadColumns = useTable(s => s.loadColumns)
  const state = useTable(s => s.columnVisibility)

  const [toggleStates, setToggleStates] = useState<ToggleStates>({
    columnControl: false,
    stickHeader: false,
    stickFooter: false,
  })

  useEffect(() => {
    const propBuilders = columnDefs.map(c =>
      COLUMN_BEHAVIOR_BUILDERS[c.type](c),
    )
    loadColumns(propBuilders)
  }, [columnDefs, loadColumns])

  const {
    renderedColumns,
    hiddenColumns,
    renderedRows,
    allRowKeys,
    filteredRowKeys,
    columnSizeVars,
    handleColumnDragEnd,
  } = useTableModel(data, rowKey)

  const { containerRef, visibleRows, loadMoreTrigger } =
    useInfiniteRows(renderedRows)

  return (
    <div className="new-cmp-table" style={varList(columnSizeVars)}>
      {JSON.stringify(state)}
      <Toolbar
        filteredDataLength={renderedRows.length}
        dataLength={data.length}
        {...{ toggleStates, setToggleStates }}
      />
      <article className="new-table" ref={containerRef}>
        <DragDropProvider
          modifiers={[RestrictToHorizontalAxis]}
          onDragEnd={handleColumnDragEnd}
        >
          <header className={classList({ stick: toggleStates.stickHeader })}>
            <RowSelectorHeader {...{ allRowKeys, filteredRowKeys }} />
            {renderedColumns.map((c, index) => (
              <ColumnHeader
                key={c.def.key}
                propBuilders={c}
                index={index}
                control={toggleStates.columnControl}
              />
            ))}
            {toggleStates.columnControl &&
              hiddenColumns.map(c => (
                <ColumnHeader key={c.def.key} propBuilders={c} hidden />
              ))}
          </header>
        </DragDropProvider>
        <ol className="body">
          {visibleRows.map(item => (
            <li className="row" key={item.key}>
              <RowSelectorCell rowKey={item.key} />
              {renderedColumns.map(c => (
                <Cell
                  key={`${item.key}-${c.def.key}`}
                  column={c}
                  value={item.row[c.def.key]}
                />
              ))}
            </li>
          ))}
          {loadMoreTrigger}
        </ol>
        <footer className={classList({ stick: toggleStates.stickFooter })}>
          <RowSelectorHeader {...{ allRowKeys, filteredRowKeys }} />
          {renderedColumns.map(c => (
            <ColumnFooter
              key={c.def.key}
              propBuilders={c}
              values={
                c.getTableColumnCalcs && renderedRows.map(r => r.row[c.def.key])
              }
            />
          ))}
        </footer>
      </article>
    </div>
  )
}
