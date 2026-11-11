import { useTable } from '@/shared/components/Table/contexts/Table/useTable.hook'
import { Button } from '@/shared/components/Button/Button'
import { ColumnBehavior } from '@/shared/core/types'
import { clsx } from '@/helpers'

const SORT_ICON: Record<'asc' | 'desc', string> = {
  asc: 'arrow-down-short-wide',
  desc: 'arrow-up-wide-short',
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
      handlingClass={clsx({ isActive: !!sort })}
      text={order !== undefined ? String(order + 1) : undefined}
      title="Ordenar"
      iconClass={`fa-solid fa-${sort ? SORT_ICON[sort] : 'sort'}`}
      size="s"
      iconPosition="start"
      border={!sort}
      onAction={() => setColumnSorting(key)}
    />
  )
}
