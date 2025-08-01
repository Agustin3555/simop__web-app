import './Table.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  useRowSelection,
  useMetaModel,
  useDerivedState,
  DerivedToState,
  StateToDerived,
  useTable,
} from '@/pages/Admin/hooks'
import {
  ColumnDef,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnOrderState,
  VisibilityState,
} from '@tanstack/react-table'
import { Button, Toggle } from '@/components'
import { Cell, Footer, Header, RowSelectorCell } from './components'
import { Combobox, Value } from '..'
import { LooseEntity } from '@/models/config'
import { classList } from '@/helpers'
import { format } from '@formkit/tempo'
import { utils, writeFile } from 'xlsx'
import { Method } from '@/services/config'

export interface TableProps {
  data: LooseEntity[]
  methods?: {
    forGetAll?: string
  }
}

export type AccessorKeys = Record<string, string>

const SELECT_COLUMN = 'select'
const STEP_WIDTH = 32

const Table = ({ data, methods }: TableProps) => {
  const { forGetAll } = methods ?? {}

  const { key, title, getFields, getPropFields, getPropFieldsRecord } =
    useMetaModel()

  const [enableFilters, setEnableFilters] = useState(true)
  const [enableColumnControl, setEnableColumnControl] = useState(false)
  const [enableSimplifyMatches, setEnableSimplifyMatches] = useState(true)
  const [enableStickHead, setEnableStickHead] = useState(false)
  const [enableStickFoot, setEnableStickFoot] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])

  const { setTable, columnFilters } = useTable() ?? {}

  const { rowSelection, setRowSelection, selectedRowIds } =
    useRowSelection() ?? {}

  const getAllFields = useMemo(
    () => getFields(forGetAll ?? Method.GetAll) ?? [],
    [],
  )

  const allColumnsVisible = useMemo(
    () => Object.fromEntries(getAllFields?.map(key => [key, true]) ?? []),
    [],
  )

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const metaModelColumnVisibility = getFields('columnVisibility')

      return metaModelColumnVisibility
        ? {
            ...Object.fromEntries(getAllFields?.map(key => [key, false]) ?? []),
            ...Object.fromEntries(
              metaModelColumnVisibility.map(key => [key, true]),
            ),
          }
        : allColumnsVisible
    },
  )

  const fromVisibilityToKeys = useCallback<
    StateToDerived<VisibilityState, string[]>
  >(
    visibility =>
      Object.entries(visibility)
        .filter(([, value]) => value)
        .map(([key]) => key),
    [],
  )

  const fromKeysToVisibility = useCallback<
    DerivedToState<VisibilityState, string[]>
  >((keys, prev) => {
    const newVisibility: VisibilityState = {}

    for (const key of Object.keys(prev)) newVisibility[key] = keys.includes(key)

    return newVisibility
  }, [])

  const [visibleKeys, setVisibleKeys] = useDerivedState(
    columnVisibility,
    setColumnVisibility,
    fromVisibilityToKeys,
    fromKeysToVisibility,
  )

  const columnOptions = useMemo(
    () =>
      getPropFields(forGetAll ?? Method.GetAll)?.map(({ key, title }) => ({
        id: key,
        title,
      })) ?? [],
    [],
  )

  const getAllProps = useMemo(
    () => getPropFields(forGetAll ?? Method.GetAll) ?? [],
    [],
  )

  const getAllPropsRecord = useMemo(
    () => getPropFieldsRecord(forGetAll ?? Method.GetAll),
    [],
  )

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([
    SELECT_COLUMN,
    ...getAllFields,
  ])

  const [accessorKeys, setAccessorKeys] = useState<AccessorKeys>({})

  const columns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...getAllProps.map<ColumnDef<LooseEntity>>(
        ({ key, minSize, accessorFn, filterFn, footer }) => {
          const size = minSize * STEP_WIDTH

          return {
            id: key,
            accessorKey: key,
            header: key,
            minSize: size,
            size,
            ...(accessorFn && { accessorFn }),
            ...(filterFn && { filterFn }),
            ...(footer && { footer }),
          }
        },
      ),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      columnFilters: columnFilters?.state ?? undefined,
      columnOrder,
      rowSelection,
      sorting,
    },
    getRowId: row => String(row.id),

    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: columnFilters?.setState ?? undefined,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),

    enableRowSelection: true,
    enableMultiSort: true,
    enableSortingRemoval: false,
    columnResizeMode: 'onEnd',
  })

  useEffect(() => {
    setTable && setTable(table)
  }, [])

  const exportHandleClick = useCallback(() => {
    if (!data) return

    const selectedData =
      selectedRowIds?.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds?.includes(id))

    const convertedData = selectedData.map(row =>
      Object.fromEntries(
        getAllProps.map(({ title, getExcelTableCell: getExcelValue }) => [
          title,
          getExcelValue(row),
        ]),
      ),
    )

    const worksheet = utils.json_to_sheet(convertedData)

    // Calcular el ancho óptimo por columna
    const colWidths = getAllProps.map(({ title }) => {
      const maxLength = Math.max(
        title.length,
        ...convertedData.map(row => String(row[title] ?? '').length),
      )

      return { wch: maxLength + 1 }
    })

    worksheet['!cols'] = colWidths

    // Crea el libro de trabajo y agrega una hoja
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Datos')

    const date = format('', { date: 'short' }).replaceAll('/', '-')
    const fileName = `${title.plural} (${date}).xlsx`

    writeFile(workbook, fileName)
  }, [data, selectedRowIds])

  return (
    <div
      className={classList('cmp-table', { 'enable-filters': enableFilters })}
    >
      {/* <pre>{JSON.stringify(columnFilters, undefined, 2)}</pre> */}
      <div className="actions">
        <div className="main-bar">
          <div className="left">
            <Toggle
              title="Filtrar"
              faIcon="fa-solid fa-filter"
              value={enableFilters}
              setValue={setEnableFilters}
            />
            <Toggle
              title="Simplificar coincidencias"
              faIcon="fa-solid fa-down-left-and-up-right-to-center fa-rotate-by"
              value={enableSimplifyMatches}
              setValue={setEnableSimplifyMatches}
            />
            <Toggle
              title="Controlar columnas"
              faIcon="fa-solid fa-table-columns"
              value={enableColumnControl}
              setValue={setEnableColumnControl}
            />
            <Toggle
              title="Fijar cabecera de tabla"
              faIcon="fa-regular fa-window-maximize"
              value={enableStickHead}
              setValue={setEnableStickHead}
            />
            <Toggle
              title="Fijar pie de tabla"
              faIcon="fa-regular fa-window-maximize fa-rotate-180"
              value={enableStickFoot}
              setValue={setEnableStickFoot}
            />
          </div>
          <div className="center">
            {table.getFilteredRowModel().rows.length !== data.length && (
              <Value
                text={table.getFilteredRowModel().rows.length}
                faIcon="fa-solid fa-filter"
                size="s"
                type="secondary"
                pill
              />
            )}
            <Value
              text={data.length}
              faIcon="fa-solid fa-cubes-stacked"
              size="s"
              type="secondary"
              pill
            />
          </div>
          <div className="right">
            <Button
              text="Excel"
              title={`Descargar Excel (${
                selectedRowIds?.length ? 'seleccionados' : 'todo'
              })`}
              faIcon="fa-solid fa-file-arrow-down"
              size="s"
              type="secondary"
              onAction={exportHandleClick}
            />
          </div>
        </div>
        {enableColumnControl && (
          <Combobox
            keyName={`visibility-${key}`}
            title="Columnas activas"
            hideLabel
            multiple
            reduceHeader
            selected={visibleKeys}
            setSelected={setVisibleKeys}
            options={columnOptions}
          />
        )}
      </div>
      <div className="table">
        {/* <pre>{JSON.stringify(data, undefined, 1)}</pre> */}
        <div
          className={classList(
            'head',
            { 'enable-stick': enableStickHead },
            { 'enable-column-control': enableColumnControl },
          )}
        >
          {table.getHeaderGroups().map(headerGroup => (
            <div className="row" key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                header.id === SELECT_COLUMN ? (
                  selectedRowIds && (
                    <RowSelectorCell
                      key={header.id}
                      checked={table.getIsAllRowsSelected()}
                      indeterminate={table.getIsSomeRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      asHeader
                      selectionCounter={selectedRowIds.length}
                    />
                  )
                ) : (
                  <Header
                    key={header.id}
                    {...{
                      getAllPropsRecord,
                      header,
                      sorting,
                      setSorting,
                      columnOrder,
                      setColumnOrder,
                      setAccessorKeys,
                    }}
                  />
                ),
              )}
            </div>
          ))}
        </div>
        <div className="body">
          {table.getRowModel().rows.map(row => (
            <div className="row" key={row.id}>
              {row
                .getVisibleCells()
                .map(cell =>
                  cell.column.columnDef.id === SELECT_COLUMN ? (
                    selectedRowIds && (
                      <RowSelectorCell
                        key={cell.id}
                        checked={row.getIsSelected()}
                        disabled={!row.getCanSelect()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                      />
                    )
                  ) : (
                    <Cell
                      key={cell.id}
                      {...{ getAllPropsRecord, cell, accessorKeys }}
                    />
                  ),
                )}
            </div>
          ))}
        </div>
        <div className={classList('foot', { 'enable-stick': enableStickFoot })}>
          {table.getFooterGroups().map(footerGroup => (
            <div className="row" key={footerGroup.id}>
              {footerGroup.headers.map(header =>
                header.id === SELECT_COLUMN ? (
                  selectedRowIds && (
                    <RowSelectorCell
                      key={header.id}
                      checked={table.getIsAllRowsSelected()}
                      indeterminate={table.getIsSomeRowsSelected()}
                      onChange={table.getToggleAllRowsSelectedHandler()}
                      asHeader
                      selectionCounter={selectedRowIds.length}
                    />
                  )
                ) : (
                  <Footer
                    key={header.id}
                    column={header.column}
                    getContext={header.getContext}
                  />
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Table
