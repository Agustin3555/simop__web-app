import './Table.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
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
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import { Cell, Footer, Header, RowSelectorCell, Toolbar } from './components'
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

const SELECT_COLUMN = 'select'
const STEP_WIDTH = 32

const Table = ({ data, methods }: TableProps) => {
  const { forGetAll } = methods ?? {}

  const { title, getFields, getPropFields, getPropFieldsRecord } =
    useMetaModel()

  const [toggleStates, setToggleStates] = useState({
    filters: true,
    simplifyMatches: true,
    columnControl: false,
    stickHead: false,
    stickFoot: false,
  })

  const { setTable, isReadyToRender, states } = useTable()
  const {
    columnVisibility,
    setColumnVisibility,

    columnFilters,
    setColumnFilters,

    columnOrder,
    setColumnOrder,

    rowSelection,
    setRowSelection,
    selectedRowIds,

    sorting,
    setSorting,
  } = states

  const getAllFields = useMemo(
    () => getFields(forGetAll ?? Method.GetAll) ?? [],
    [],
  )

  const allColumnsVisible = useMemo(
    () => Object.fromEntries(getAllFields.map(key => [key, true]) ?? []),
    [],
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

  useEffect(() => {
    setColumnVisibility(() => {
      const metaModelColumnVisibility = getFields('columnVisibility')

      return metaModelColumnVisibility
        ? {
            ...Object.fromEntries(getAllFields.map(key => [key, false]) ?? []),
            ...Object.fromEntries(
              metaModelColumnVisibility.map(key => [key, true]),
            ),
          }
        : allColumnsVisible
    })

    setColumnOrder([SELECT_COLUMN, ...getAllFields])
  }, [])

  const columns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...getAllProps.map<ColumnDef<LooseEntity>>(
        ({ key, minSize, accessorFn, filterFn, sortingFn, footer }) => {
          const size = minSize * STEP_WIDTH

          return {
            id: key,
            accessorKey: key,
            header: key,
            minSize: 2 * STEP_WIDTH,
            size,
            ...(accessorFn && { accessorFn }),
            ...(filterFn && { filterFn }),
            ...(sortingFn && { sortingFn }),
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
      columnFilters,
      columnOrder,
      rowSelection,
      sorting,
    },

    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,

    getRowId: row => String(row.id),

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
  }, [setTable, table])

  const handleExportClick = useCallback(() => {
    if (!data) return

    const selectedData =
      selectedRowIds.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds.includes(id))

    const convertedData = selectedData.map(row =>
      Object.fromEntries(
        getAllProps.map(({ title, getExcelTableCell }) => [
          title,
          getExcelTableCell(row),
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
    isReadyToRender && (
      <div
        className={classList('cmp-table', {
          'enable-filters': toggleStates['filters'],
        })}
      >
        <Toolbar
          {...{ toggleStates, setToggleStates }}
          comboboxProps={{
            selected: visibleKeys,
            setSelected: setVisibleKeys,
            options: columnOptions,
          }}
          onExportClick={handleExportClick}
        />
        <div className="table">
          <div
            className={classList(
              'head',
              { 'enable-stick': toggleStates['stickHead'] },
              { 'enable-column-control': toggleStates['columnControl'] },
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
                      <Cell key={cell.id} {...{ getAllPropsRecord, cell }} />
                    ),
                  )}
              </div>
            ))}
          </div>
          <div
            className={classList('foot', {
              'enable-stick': toggleStates['stickFoot'],
            })}
          >
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
  )
}

export default Table
