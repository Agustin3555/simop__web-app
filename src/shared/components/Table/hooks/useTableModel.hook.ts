import { useMemo } from 'react'
import { useTable } from '../contexts/Table/useTable.hook'
import type { ColumnKey, RowKey } from '../contexts/Table/table.store'
import type { ColumnBehavior } from '@/shared/core/types'
import type { DragEndEvent } from '@dnd-kit/react'
import { isSortable } from '@dnd-kit/react/sortable'

type Row = object
type TableColumn = ColumnBehavior

export type CalcResults = (
  { calc: string; label: string; result: unknown } | undefined
)[]

const getRowValue = (row: Row, key: string): unknown => Reflect.get(row, key)

const validateRows = (
  data: Row[],
  rowKey: ColumnKey,
): {
  rows: Row[]
  keys: RowKey[]
} => {
  const rows: Row[] = []
  const keys: RowKey[] = []

  for (const row of data) {
    const key = getRowValue(row, rowKey)
    // La selección de filas necesita una clave estable y compatible con React.
    if (typeof key !== 'string' && typeof key !== 'number') {
      throw new Error(
        `NewTable: rowKey "${rowKey}" must reference a string or number in every data row.`,
      )
    }

    keys.push(String(key))
    rows.push(row)
  }

  return { rows, keys }
}

const sortColumnsByOrder = (
  columns: TableColumn[],
  columnOrder: ColumnKey[],
) => {
  const order = new Map<ColumnKey, number>()

  // Si el orden contiene claves repetidas, prevalece su primera aparición.
  columnOrder.forEach((key, index) => {
    if (!order.has(key)) order.set(key, index)
  })

  return columns
    .map((column, index) => ({
      column,
      index,
      order: order.get(column.usefulDef.key) ?? Number.POSITIVE_INFINITY,
    }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map(({ column }) => column)
}

const getOrderedColumns = (
  columns: TableColumn[],
  columnVisibility: ColumnKey[],
  columnOrder: ColumnKey[],
) => {
  const hiddenColumnKeys = new Set(columnVisibility)
  const hiddenColumns = columns.filter(({ usefulDef: { key } }) =>
    hiddenColumnKeys.has(key),
  )
  const renderedColumns = columns.filter(
    ({ usefulDef: { key } }) => !hiddenColumnKeys.has(key),
  )

  return {
    renderedColumns: sortColumnsByOrder(renderedColumns, columnOrder),
    hiddenColumns: sortColumnsByOrder(hiddenColumns, columnOrder),
  }
}

const reorderColumnKeys = (
  columns: TableColumn[],
  visibleColumns: TableColumn[],
  columnOrder: ColumnKey[],
  fromIndex: number,
  toIndex: number,
) => {
  const columnKeys = new Set<ColumnKey>(
    columns.map(({ usefulDef: { key } }) => key),
  )
  const includedKeys = new Set<ColumnKey>()
  const completeOrder: ColumnKey[] = []

  // Elimina claves obsoletas y duplicadas, y agrega columnas nuevas al final.
  for (const key of columnOrder) {
    if (!columnKeys.has(key) || includedKeys.has(key)) continue
    completeOrder.push(key)
    includedKeys.add(key)
  }

  for (const key of columnKeys) {
    if (includedKeys.has(key)) continue
    completeOrder.push(key)
  }

  const reorderedVisibleKeys = visibleColumns.map(
    ({ usefulDef: { key } }) => key,
  )
  const [movedKey] = reorderedVisibleKeys.splice(fromIndex, 1)
  reorderedVisibleKeys.splice(toIndex, 0, movedKey)

  // Solo reemplaza los espacios visibles para preservar el orden de las ocultas.
  const visibleKeySet = new Set<ColumnKey>(reorderedVisibleKeys)
  let visibleIndex = 0

  return completeOrder.map(key => {
    if (!visibleKeySet.has(key)) return key
    return reorderedVisibleKeys[visibleIndex++]
  })
}

const compareRows = (
  first: Row,
  second: Row,
  sorting: {
    columnKey: ColumnKey
    sort: 'asc' | 'desc'
    compare?: (first: unknown, second: unknown) => number
  }[],
) => {
  // Evalúa los criterios por prioridad; los valores vacíos siempre quedan al final.
  for (const { columnKey, sort, compare } of sorting) {
    const firstValue = getRowValue(first, columnKey)
    const secondValue = getRowValue(second, columnKey)

    if (firstValue == null || secondValue == null) {
      if (firstValue == null && secondValue == null) continue
      return firstValue == null ? 1 : -1
    }

    const comparison = compare?.(firstValue, secondValue) ?? 0
    if (comparison !== 0) return sort === 'asc' ? comparison : -comparison
  }

  return 0
}

export const useTableModel = (data: Row[], rowKey: ColumnKey) => {
  const validation = useMemo(() => validateRows(data, rowKey), [data, rowKey])

  const columns = useTable(s => s.columns)
  const columnOrder = useTable(s => s.columnOrder)
  const columnVisibility = useTable(s => s.columnVisibility)
  const columnWidths = useTable(s => s.columnWidths)
  const columnFilters = useTable(s => s.columnFilters)
  const columnSorting = useTable(s => s.columnSorting)
  const columnCalcs = useTable(s => s.columnCalcs)
  const rowSelection = useTable(s => s.rowSelection)
  const setColumnOrder = useTable(s => s.setColumnOrder)

  const { renderedColumns, hiddenColumns } = useMemo(
    () => getOrderedColumns(columns, columnVisibility, columnOrder),
    [columnOrder, columnVisibility, columns],
  )

  const handleColumnDragEnd = (event: DragEndEvent) => {
    if (event.canceled) return

    const { source } = event.operation
    if (!isSortable(source)) return

    const fromIndex = renderedColumns.findIndex(
      ({ usefulDef: { key } }) => key === source.id,
    )
    const toIndex = source.sortable.index
    if (
      fromIndex < 0 ||
      toIndex < 0 ||
      toIndex >= renderedColumns.length ||
      fromIndex === toIndex
    )
      return

    setColumnOrder(
      reorderColumnKeys(
        columns,
        renderedColumns,
        columnOrder,
        fromIndex,
        toIndex,
      ),
    )
  }

  const renderedRows = useMemo(() => {
    // Indexa las definiciones para resolver filtros y comparadores en tiempo constante.
    const columnsByKey = new Map<ColumnKey, TableColumn>(
      columns.map(column => [column.usefulDef.key, column]),
    )
    const filteredRows = validation.rows.filter(row =>
      columnFilters.every(({ columnKey, filters }) => {
        const value = getRowValue(row, columnKey)

        if (filters.valueState === 'null') return value == null
        if (filters.valueState === 'value' && value == null) return false

        const propBuilder = columnsByKey.get(columnKey)

        return (
          !propBuilder?.applyTableFilter ||
          propBuilder.applyTableFilter(value, filters.custom)
        )
      }),
    )

    const sorting = [...columnSorting]
      .sort((a, b) => a.order - b.order)
      .map(sort => ({
        ...sort,
        compare: columnsByKey.get(sort.columnKey)?.compareTableValues,
      }))

    // No muta las filas originales al ordenar; el orden visual se deriva del estado.
    const sortedRows = sorting.length
      ? [...filteredRows].sort((a, b) => compareRows(a, b, sorting))
      : filteredRows

    return sortedRows.map(row => ({
      key: String(getRowValue(row, rowKey)),
      row: renderedColumns.reduce<Record<string, unknown>>(
        (renderedRow, { usefulDef: { key } }) => {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            Reflect.set(renderedRow, key, getRowValue(row, key))
          }
          return renderedRow
        },
        { [rowKey]: getRowValue(row, rowKey) },
      ),
    }))
  }, [
    columnFilters,
    columnSorting,
    columns,
    renderedColumns,
    rowKey,
    validation.rows,
  ])

  const filteredRowKeys = useMemo(
    () => renderedRows.map(({ key }) => key),
    [renderedRows],
  )

  const selectedRowKeys = useMemo(() => new Set(rowSelection), [rowSelection])

  const selectedRows = useMemo(
    () => renderedRows.filter(({ key }) => selectedRowKeys.has(key)),
    [renderedRows, selectedRowKeys],
  )

  const columnSizeVars = useMemo(() => {
    const widthsByKey = new Map<ColumnKey, number>(
      columnWidths.map(({ columnKey, points }) => [columnKey, points]),
    )

    // Prioriza el ancho ajustado por el usuario y usa el tamaño definido como respaldo.
    return Object.fromEntries(
      columns.map(({ usefulDef: { key } }) => [
        `col-${key}-size`,
        `calc(${widthsByKey.get(key)} * 1rem)`,
      ]),
    )
  }, [columnWidths, columns])

  const calcResults: CalcResults = useMemo(
    () =>
      renderedColumns.map(({ usefulDef: { key }, getTableFooterCalcs }) => {
        if (!getTableFooterCalcs) return

        const { calc } = columnCalcs.find(c => c.columnKey === key) ?? {}
        if (!calc) return

        const values = renderedRows.map(r => r.row[key])
        const { label, getResult } = getTableFooterCalcs()[calc]
        return { calc, label, result: getResult(values) }
      }),
    [columnCalcs, renderedColumns, renderedRows],
  )

  return {
    renderedColumns,
    hiddenColumns,
    columnSizeVars,
    handleColumnDragEnd,

    renderedRows,
    selectedRows,
    allRowKeys: validation.keys,
    filteredRowKeys,

    calcResults,
  }
}
