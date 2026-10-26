import { ColumnDef, PartialTableDef, TableDef } from './types'

export const createTableDef = <const C extends readonly ColumnDef[]>(
  def: PartialTableDef<C>,
): TableDef<C> => {
  const {
    classIcon = '',
    columnDefs,
    mutationColumnGroups: baseMutationColumnGroups,
    ...rest
  } = def

  const hiddenColumnKeys = new Set(
    columnDefs
      .filter(({ inputConfig }) => inputConfig?.isHidden === true)
      .map(({ key }) => key),
  )

  let mutationColumnGroups = baseMutationColumnGroups ?? [
    { columnKeys: columnDefs.map(({ key }) => key) },
  ]

  mutationColumnGroups = mutationColumnGroups
    .map(group => ({
      ...group,
      columnKeys: group.columnKeys.filter(key => !hiddenColumnKeys.has(key)),
    }))
    .filter(({ columnKeys }) => columnKeys.length > 0)

  return {
    ...rest,
    classIcon,
    columnDefs,
    mutationColumns: mutationColumnGroups.flatMap(g => g.columnKeys),
    mutationColumnGroups,
  }
}
