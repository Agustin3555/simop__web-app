import { ColumnBehavior } from '@/shared/core/types'
import { createStore } from 'zustand/vanilla'

export type ColumnKey = string
export type RowKey = string

interface Filters {
  valueState?: 'value' | 'null'
  custom: unknown
}

export interface TableState {
  columns: ColumnBehavior[]

  loadColumns: (columns: ColumnBehavior[]) => void

  columnOrder: ColumnKey[]
  columnGraphed: ColumnKey[]
  columnVisibility: ColumnKey[]
  columnWidths: { columnKey: ColumnKey; points: number }[]
  columnSorting: { columnKey: ColumnKey; sort: 'asc' | 'desc'; order: number }[]
  columnFilters: { columnKey: ColumnKey; filters: Filters }[]
  columnCalcs: { columnKey: ColumnKey; calc: string }[]
  rowSelection: RowKey[]

  setColumnGraphed: (column: ColumnKey) => void
  setColumnOrder: (columnOrder: ColumnKey[]) => void
  setColumnVisibility: (column: ColumnKey, visible: boolean) => void
  setColumnWidth: (column: ColumnKey, points: number) => void
  setColumnSorting: (column: ColumnKey) => void
  setColumnFilter: (column: ColumnKey, filters: Partial<Filters>) => void
  setColumnCalc: (column: ColumnKey, calc?: string) => void
  setRowSelection: (row: RowKey) => void

  cleanFilters: () => void
  selectAllRows: (rows: RowKey[]) => void
  deselectAllRows: () => void
  selectFilteredRows: (rows: RowKey[]) => void
  deselectFilteredRows: (rows: RowKey[]) => void
}

export type TableProps = Partial<
  Pick<
    TableState,
    | 'columnOrder'
    | 'columnGraphed'
    | 'columnVisibility'
    | 'columnWidths'
    | 'columnSorting'
    | 'columnFilters'
    | 'columnCalcs'
  >
>

export const createTableStore = (init?: TableProps) => {
  return createStore<TableState>()(set => ({
    columns: [],

    loadColumns: columns => {
      set(({ columnOrder, columnWidths }) => ({
        columns,
        ...(columnOrder.length === 0 && {
          columnOrder: columns.map(c => c.usefulDef.key),
        }),
        ...(columnWidths.length === 0 && {
          columnWidths: columns.map(({ usefulDef: { key, column } }) => ({
            columnKey: key,
            points: column.size,
          })),
        }),
      }))
    },

    columnOrder: init?.columnOrder ?? [],
    columnGraphed: init?.columnGraphed ?? [],
    columnVisibility: init?.columnVisibility ?? ['id'],
    columnWidths: init?.columnWidths ?? [],
    columnSorting: init?.columnSorting ?? [],
    columnFilters: init?.columnFilters ?? [],
    columnCalcs: init?.columnCalcs ?? [],
    rowSelection: [],

    setColumnGraphed: column => {
      set(s => ({
        columnGraphed: s.columnGraphed.includes(column)
          ? s.columnGraphed.filter(c => c !== column)
          : [...s.columnGraphed, column],
      }))
    },

    setColumnOrder: columnOrder => {
      set({ columnOrder })
    },

    setColumnVisibility: (column, visible) => {
      set(s => ({
        columnVisibility: visible
          ? s.columnVisibility.filter(i => i !== column)
          : s.columnVisibility.includes(column)
            ? s.columnVisibility
            : [...s.columnVisibility, column],
      }))
    },

    setColumnWidth: (column, points) => {
      set(s => {
        const current = s.columnWidths.find(i => i.columnKey === column)

        if (!current) {
          return {
            columnWidths: [...s.columnWidths, { columnKey: column, points }],
          }
        }

        return {
          columnWidths: s.columnWidths.map(i =>
            i.columnKey === column ? { ...i, points } : i,
          ),
        }
      })
    },

    setColumnSorting: column => {
      set(s => {
        const current = s.columnSorting.find(i => i.columnKey === column)

        if (!current) {
          return {
            columnSorting: [
              ...s.columnSorting,
              { columnKey: column, sort: 'asc', order: s.columnSorting.length },
            ],
          }
        }

        if (current.sort === 'asc') {
          return {
            columnSorting: s.columnSorting.map(i =>
              i.columnKey === column ? { ...i, sort: 'desc' } : i,
            ),
          }
        }

        return {
          columnSorting: s.columnSorting
            .filter(i => i.columnKey !== column)
            .map(i =>
              i.order > current.order ? { ...i, order: i.order - 1 } : i,
            ),
        }
      })
    },

    setColumnFilter: (column, filters) => {
      set(s => {
        const current = s.columnFilters.find(i => i.columnKey === column)
        const custom = Object.prototype.hasOwnProperty.call(filters, 'custom')
          ? filters.custom
          : current?.filters.custom
        const valueState = Object.prototype.hasOwnProperty.call(
          filters,
          'valueState',
        )
          ? filters.valueState
          : current?.filters.valueState
        const nextFilters: Filters = {
          valueState,
          custom,
        }

        const hasFilter =
          nextFilters.valueState !== undefined ||
          (typeof nextFilters.custom === 'string'
            ? nextFilters.custom.trim() !== ''
            : nextFilters.custom !== undefined && nextFilters.custom !== null)

        if (!hasFilter) {
          return {
            columnFilters: s.columnFilters.filter(i => i.columnKey !== column),
          }
        }

        if (!current) {
          return {
            columnFilters: [
              ...s.columnFilters,
              { columnKey: column, filters: nextFilters },
            ],
          }
        }

        return {
          columnFilters: s.columnFilters.map(i =>
            i.columnKey === column ? { ...i, filters: nextFilters } : i,
          ),
        }
      })
    },

    setColumnCalc: (column, calc) => {
      set(s => {
        if (calc === undefined) {
          return {
            columnCalcs: s.columnCalcs.filter(i => i.columnKey !== column),
          }
        }

        const current = s.columnCalcs.find(i => i.columnKey === column)

        if (!current) {
          return {
            columnCalcs: [...s.columnCalcs, { columnKey: column, calc }],
          }
        }

        return {
          columnCalcs: s.columnCalcs.map(i =>
            i.columnKey === column ? { ...i, calc } : i,
          ),
        }
      })
    },

    setRowSelection: row => {
      set(s => ({
        rowSelection: s.rowSelection.includes(row)
          ? s.rowSelection.filter(r => r !== row)
          : [...s.rowSelection, row],
      }))
    },

    cleanFilters: () => {
      set({ columnFilters: [] })
    },

    selectAllRows: rows => {
      set({ rowSelection: [...new Set(rows)] })
    },

    deselectAllRows: () => {
      set({ rowSelection: [] })
    },

    selectFilteredRows: rows => {
      set(s => ({
        rowSelection: [...new Set([...s.rowSelection, ...rows])],
      }))
    },

    deselectFilteredRows: rows => {
      const rowsToDeselect = new Set(rows)
      set(s => ({
        rowSelection: s.rowSelection.filter(row => !rowsToDeselect.has(row)),
      }))
    },
  }))
}

export type TableStore = ReturnType<typeof createTableStore>
