import { ColumnBehavior } from '@/shared/core/types'
import { createStore } from 'zustand/vanilla'

export type ColumnKey = number | string
export type RowKey = number | string

interface TableFilterValue {
  blank: boolean
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
  columnFilters: {
    column: ColumnKey
    filters: TableFilterValue
  }[]
  columnCalcs: { columnKey: ColumnKey; calc: unknown }[]
  rowSelection: RowKey[]

  setColumnGraphed: (column: ColumnKey) => void
  setColumnOrder: (columnOrder: ColumnKey[]) => void
  setColumnVisibility: (column: ColumnKey, visible: boolean) => void
  setColumnWidth: (column: ColumnKey, points: number) => void
  setColumnSorting: (column: ColumnKey) => void
  setColumnFilter: (
    column: ColumnKey,
    filters: Partial<TableFilterValue>,
  ) => void
  setRowSelection: (row: RowKey) => void

  cleanFilters: () => void
  selectAllRows: (rows: RowKey[]) => void
  deselectAllRows: () => void
  selectFilteredRows: (rows: RowKey[]) => void
  deselectFilteredRows: (rows: RowKey[]) => void
}

type TableProps = Partial<
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
      set({ columns })
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
          ? s.columnVisibility.filter(item => item !== column)
          : s.columnVisibility.includes(column)
            ? s.columnVisibility
            : [...s.columnVisibility, column],
      }))
    },

    setColumnWidth: (column, points) => {
      set(s => {
        const current = s.columnWidths.find(item => item.columnKey === column)

        if (!current) {
          return {
            columnWidths: [...s.columnWidths, { columnKey: column, points }],
          }
        }

        return {
          columnWidths: s.columnWidths.map(item =>
            item.columnKey === column ? { ...item, points } : item,
          ),
        }
      })
    },

    setColumnSorting: column => {
      set(s => {
        const current = s.columnSorting.find(item => item.columnKey === column)

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
            columnSorting: s.columnSorting.map(item =>
              item.columnKey === column ? { ...item, sort: 'desc' } : item,
            ),
          }
        }

        return {
          columnSorting: s.columnSorting
            .filter(item => item.columnKey !== column)
            .map(item =>
              item.order > current.order
                ? { ...item, order: item.order - 1 }
                : item,
            ),
        }
      })
    },

    setColumnFilter: (column, filters) => {
      set(s => {
        const current = s.columnFilters.find(item => item.column === column)
        const custom =
          filters.custom === undefined
            ? current?.filters.custom
            : filters.custom
        const nextFilters: TableFilterValue = {
          blank: filters.blank ?? current?.filters.blank ?? false,
          custom,
        }

        const hasFilter =
          nextFilters.blank ||
          (typeof nextFilters.custom === 'string'
            ? nextFilters.custom.trim() !== ''
            : nextFilters.custom !== undefined && nextFilters.custom !== null)

        if (!hasFilter) {
          return {
            columnFilters: s.columnFilters.filter(
              item => item.column !== column,
            ),
          }
        }

        if (!current) {
          return {
            columnFilters: [
              ...s.columnFilters,
              { column, filters: nextFilters },
            ],
          }
        }

        return {
          columnFilters: s.columnFilters.map(item =>
            item.column === column ? { ...item, filters: nextFilters } : item,
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
