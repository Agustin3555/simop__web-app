import './Table.css'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useRowSelection, useScheme } from '@/pages/Admin/hooks'
import {
  ColumnDef,
  ColumnFiltersState,
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
import { Button2, Toggle } from '@/components'
import { Cell, Footer, Header, RowSelectorCell } from './components'
import { Value } from '../../..'
import { Entity } from '@/services/config'
import { MinSize, PropScheme } from '@/pages/Admin/services/config'
import { classList } from '@/helpers'
import { format } from '@formkit/tempo'
import { utils, writeFile } from 'xlsx'

export type GetHeaderResult = ReturnType<NonNullable<PropScheme['getHeader']>>

interface TableProps {
  data: Entity[]
  columnVisibility: VisibilityState
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>
  setQuickFilters: Dispatch<SetStateAction<GetHeaderResult[] | undefined>>
}

const SELECT_COLUMN = 'select'
const STEP_WIDTH = 32

const Table = ({
  data,
  columnVisibility,
  setColumnVisibility,
  setQuickFilters,
}: TableProps) => {
  const { scheme, flatProps } = useScheme()
  const { title, quickFilters, groups } = scheme

  const { rowSelection, setRowSelection, selectedRowIds } = useRowSelection()
  const [filters, setFilters] = useState(true)
  const [simplifyMatches, setSimplifyMatches] = useState(true)
  const [stickHead, setStickHead] = useState(false)
  const [stickFoot, setStickFoot] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    // Inicializar el orden de columnas
    [SELECT_COLUMN, ...groups.flatMap(({ props }) => Object.keys(props))],
  )

  const columns = useMemo(
    () => [
      { id: SELECT_COLUMN },
      ...groups.flatMap<ColumnDef<Entity>>(({ props }) =>
        Object.values(props).map(
          ({ key, minSize, accessorFn, filterFn, footer }) => ({
            id: key,
            accessorKey: key,
            header: key,
            minSize: MinSize.xs * STEP_WIDTH,
            size: minSize * STEP_WIDTH,
            ...(accessorFn && { accessorFn }),
            ...(filterFn && { filterFn }),
            ...(footer && { footer }),
          }),
        ),
      ),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnFilters,
      sorting,
      columnOrder,
      columnVisibility,
    },
    getRowId: row => String(row.id),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,

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
    if (!quickFilters) return

    let results: GetHeaderResult[] = []

    quickFilters.forEach(key => {
      const { getHeader } = flatProps[key]

      if (!getHeader) return

      const { column } =
        table.getHeaderGroups()[0].headers.find(({ id }) => id === key) ?? {}

      if (!column) return

      results = [...results, getHeader(column)]
    })

    setQuickFilters(results)
  }, [])

  const exportHandleClick = useCallback(() => {
    if (!data) return

    const selectedData =
      selectedRowIds.length === 0
        ? data
        : data.filter(({ id }) => selectedRowIds.includes(id))

    const convertedData = selectedData.map(row =>
      Object.fromEntries(
        Object.keys(flatProps).map(key => [
          flatProps[key].title,
          flatProps[key].getExcelValue(row),
        ]),
      ),
    )

    const worksheet = utils.json_to_sheet(convertedData)

    // Calcular el ancho óptimo por columna
    const colWidths = Object.keys(flatProps).map(key => {
      const header = flatProps[key].title

      const maxLength = Math.max(
        header.length,
        ...convertedData.map(
          row => String(row[flatProps[key].title] ?? '').length,
        ),
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
    <div className={classList('cmp-table', { ['show-filters']: filters })}>
      <div className="actions">
        <div className="group">
          <Toggle
            title="Filtros"
            faIcon="fa-solid fa-filter"
            value={filters}
            setValue={setFilters}
          />
          <Toggle
            title="Simplificar coincidencias"
            faIcon="fa-solid fa-down-left-and-up-right-to-center fa-rotate-by"
            value={simplifyMatches}
            setValue={setSimplifyMatches}
          />
          <Toggle
            title="Fijar cabecera de tabla"
            faIcon="fa-regular fa-window-maximize"
            value={stickHead}
            setValue={setStickHead}
          />
          <Toggle
            title="Fijar pie de tabla"
            faIcon="fa-regular fa-window-maximize fa-rotate-180"
            value={stickFoot}
            setValue={setStickFoot}
          />
        </div>
        <Value
          text={data.length}
          faIcon="fa-solid fa-cubes-stacked"
          size="s"
          type="secondary"
          pill
        />
        <div className="group">
          <Button2
            text="Excel"
            title={`Descargar Excel (${
              selectedRowIds.length ? 'seleccionados' : 'todo'
            })`}
            faIcon="fa-solid fa-file-arrow-down"
            size="s"
            type="secondary"
            onAction={exportHandleClick}
          />
        </div>
      </div>
      <div className="table">
        <div className={classList('head', { stick: stickHead })}>
          {table.getHeaderGroups().map(headerGroup => (
            <div className="row" key={headerGroup.id}>
              {headerGroup.headers.map(header =>
                header.id === SELECT_COLUMN ? (
                  <RowSelectorCell
                    key={header.id}
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    asHeader
                    selectionCounter={selectedRowIds.length}
                  />
                ) : (
                  <Header
                    key={header.id}
                    {...{
                      flatProps,
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
                    <RowSelectorCell
                      key={cell.id}
                      checked={row.getIsSelected()}
                      disabled={!row.getCanSelect()}
                      indeterminate={row.getIsSomeSelected()}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  ) : (
                    <Cell key={cell.id} {...{ flatProps, cell }} />
                  ),
                )}
            </div>
          ))}
        </div>
        <div className={classList('foot', { stick: stickFoot })}>
          {table.getFooterGroups().map(footerGroup => (
            <div className="row" key={footerGroup.id}>
              {footerGroup.headers.map(header =>
                header.id === SELECT_COLUMN ? (
                  <RowSelectorCell
                    key={header.id}
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                    asHeader
                    selectionCounter={selectedRowIds.length}
                  />
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
