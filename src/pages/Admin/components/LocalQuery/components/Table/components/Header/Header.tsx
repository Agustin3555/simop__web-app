import './Header.css'
import {
  Dispatch,
  DragEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Icon } from '@/components'
import {
  ColumnOrderState,
  SortDirection,
  SortingState,
  Header as TsHeader,
} from '@tanstack/react-table'
import { GeneralEntity } from '@/models/config'
import { classList } from '@/helpers'
import { steppedSizes } from '../../helpers'
import { OptionSelectors } from '@/pages/Admin/components'
import { extractKeys } from '@/pages/Admin/helpers'
import { AccessorKeys, QuickFilters } from '../../Table'
import { PropScheme } from '@/pages/Admin/services/config'
import { Method } from '@/services/config'

const SORT_ICON_MATCHER: Record<SortDirection, string> = {
  asc: 'fa-solid fa-arrow-up-wide-short',
  desc: 'fa-solid fa-arrow-down-short-wide',
}

interface Props {
  getAllPropsRecord: Record<string, PropScheme<GeneralEntity>>
  header: TsHeader<GeneralEntity, unknown>
  sorting: SortingState
  setSorting: Dispatch<SetStateAction<SortingState>>
  columnOrder: ColumnOrderState
  setColumnOrder: Dispatch<SetStateAction<ColumnOrderState>>
  setAccessorKeys: Dispatch<SetStateAction<AccessorKeys>>
  quickFilterFields: string[] | undefined
  setQuickFilters: Dispatch<SetStateAction<QuickFilters>>
}

const Header = ({
  getAllPropsRecord,
  header,
  sorting,
  setSorting,
  columnOrder,
  setColumnOrder,
  setAccessorKeys,
  quickFilterFields,
  setQuickFilters,
}: Props) => {
  const { column, getContext, getResizeHandler, getSize } = header

  const {
    getIsSorted,
    getSortIndex,
    resetSize,
    getIsResizing,
    getFilterValue,
    getFacetedRowModel,
  } = column

  const { getHeader } = getAllPropsRecord[column.id] ?? {}

  const { title, metaModel, getFilter } = useMemo(() => getHeader(column), [])

  const [dragging, setDragging] = useState(false)

  const [selectedSearchMode, setSelectedSearchMode] = useState(
    metaModel?.anchorField,
  )

  useEffect(() => {
    setAccessorKeys(prev => ({ ...prev, [column.id]: selectedSearchMode! }))
  }, [selectedSearchMode])

  const options = useMemo(() => {
    const { rows } = getFacetedRowModel()

    const refs = rows
      .map(({ original }) => original[column.id])
      .filter(Boolean) as GeneralEntity[]

    const uniqueRefs = new Map<number, GeneralEntity>()

    refs.forEach(ref => {
      const { id } = ref

      if (!uniqueRefs.has(id)) uniqueRefs.set(id, ref)
    })

    return Array.from(uniqueRefs.values()).map(ref => {
      const { id } = ref

      return {
        id: String(id),
        title: String(ref[selectedSearchMode!]),
      }
    })
  }, [selectedSearchMode])

  const filterValue = getFilterValue()

  const filter = useMemo(() => {
    const filter = getFilter({ getFilterValue, options })

    if (quickFilterFields?.includes(column.id)) {
      const newQuickFilter = { [column.id]: { title, filter } }

      setQuickFilters(prev => ({ ...prev, ...newQuickFilter }))
    }

    return filter
  }, [options, filterValue])

  const getAllPropsRecordForSearchModes = useMemo(
    () => metaModel?.getPropFieldsRecord(Method.GetAll),
    [],
  )

  // TODO: actualizar si se actualiza la data
  const searchModes = useMemo(() => {
    if (!getAllPropsRecordForSearchModes) return

    const { rows } = getFacetedRowModel()

    const firstValid = rows.find(
      ({ original }) => original[column.id] !== undefined,
    )

    if (!firstValid) return

    const keys = extractKeys([firstValid.original[column.id]])

    return keys?.map(key => ({
      value: key,
      title: getAllPropsRecordForSearchModes[key].title,
    }))
  }, [])

  const sortValue = getIsSorted()

  const sortIcon = useMemo(
    () => (sortValue === false ? undefined : SORT_ICON_MATCHER[sortValue]),
    [sortValue],
  )

  const handleSortingClick = useCallback(() => {
    const isAlreadySorted = sorting.find(sort => sort.id === column.id)

    setSorting(prev => {
      if (isAlreadySorted) {
        if (isAlreadySorted.desc) {
          // Si está en descendente, lo elimina (sin pasar a ascendente)
          return prev.filter(sort => sort.id !== column.id)
        } else {
          // Alterna de ascendente a descendente
          return prev.map(sort =>
            sort.id === column.id ? { ...sort, desc: true } : sort,
          )
        }
      } else {
        // Agrega la columna al ordenamiento
        return [...prev, { id: column.id, desc: false }]
      }
    })
  }, [sorting])

  const handleDragStart = useCallback<DragEventHandler<HTMLDivElement>>(
    e => {
      setDragging(true)

      e.dataTransfer.setData('text/plain', column.id)
      e.dataTransfer.effectAllowed = 'move'

      const headerElement = e.currentTarget.closest('.cmp-header')

      if (headerElement) e.dataTransfer.setDragImage(headerElement, 0, 0)
    },
    [column.id],
  )

  const handleDragOver = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => e.preventDefault(),
    [],
  )

  const handleDragEnd = useCallback(() => setDragging(false), [])

  const handleDrop = useCallback<DragEventHandler<HTMLTableCellElement>>(
    e => {
      const draggedColumnId = e.dataTransfer.getData('text/plain')

      if (draggedColumnId && draggedColumnId !== column.id) {
        const newColumnOrder = [...columnOrder]
        const draggedIndex = newColumnOrder.indexOf(draggedColumnId)
        const targetIndex = newColumnOrder.indexOf(column.id)

        if (draggedIndex > -1 && targetIndex > -1) {
          newColumnOrder.splice(draggedIndex, 1)
          newColumnOrder.splice(targetIndex, 0, draggedColumnId)
          setColumnOrder(newColumnOrder)
        }
      }
    },
    [columnOrder],
  )

  const calculateTranslate = useCallback(() => {
    if (!getIsResizing()) return

    const { deltaOffset = 0 } = getContext().table.getState().columnSizingInfo

    return steppedSizes(column.columnDef.minSize!, deltaOffset ?? 0) + 'px'
  }, [])

  const width = steppedSizes(column.columnDef.minSize!, getSize())

  return (
    <div className={classList('cmp-header', { dragging })} style={{ width }}>
      <div className="content">
        <div
          className="grip-area"
          draggable
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
        >
          <span />
        </div>
        <div className="main">
          <button onClick={handleSortingClick}>
            <p className="text">{title}</p>
            {sortIcon && (
              <div className="sort">
                <Icon faIcon={sortIcon} />
                <small>{getSortIndex() + 1}</small>
              </div>
            )}
          </button>
          {searchModes && (
            <OptionSelectors
              name={`search-mode-header-${column.id}`}
              selected={selectedSearchMode}
              setSelected={setSelectedSearchMode}
              options={searchModes}
            />
          )}
        </div>
        <div className="filter-container">{filter}</div>
      </div>
      <div
        className={classList('resizer', { resizing: getIsResizing() })}
        style={{ translate: calculateTranslate() }}
        onDoubleClick={() => resetSize()}
        onMouseDown={getResizeHandler()}
        onTouchStart={getResizeHandler()}
      />
      <div className="ruler" />
    </div>
  )
}

export default Header
