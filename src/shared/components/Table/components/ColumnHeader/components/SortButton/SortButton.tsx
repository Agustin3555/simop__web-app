import './SortButton.css'
import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Button } from '@/components'
import { ColumnBehavior } from '@/shared/core/types'
import { classList } from '@/helpers'

const SORT_ICON: Record<'asc' | 'desc', string> = {
  asc: 'arrow-up-wide-short',
  desc: 'arrow-down-short-wide',
}

interface SortButtonProps {
  propBuilders: ColumnBehavior
}

export const SortButton = ({
  propBuilders: {
    usefulDef: { key },
  },
}: SortButtonProps) => {
  const columnSorting = useTable(s => s.columnSorting)
  const setColumnSorting = useTable(s => s.setColumnSorting)

  const { sort, order } = columnSorting.find(s => s.columnKey === key) ?? {}

  return (
    <Button
      handlingClass={classList('cmp-sort-button', {
        sorting: sort !== undefined,
      })}
      title="Ordenar"
      text={order !== undefined ? String(order + 1) : undefined}
      faIcon={`fa-solid fa-${sort ? SORT_ICON[sort] : 'arrow-right-arrow-left fa-rotate-90'}`}
      size="s"
      type="secondary"
      inverted
      onAction={() => setColumnSorting(key)}
    />
  )
}
