import { TableEntity } from '@/infra/http/entity.types'
import { COLUMN_BEHAVIOR_BUILDERS, SHARED_COLUMNS } from './consts'
import { ColumnDef } from './types'

type ColumnDefConfig<D extends ColumnDef = ColumnDef> = D extends ColumnDef
  ? Omit<D, 'key'>
  : never

export const toColumnDefs = <E extends object>(
  defs: Partial<Record<keyof E, ColumnDefConfig>>,
): ColumnDef[] => {
  return Object.entries(defs).map(([key, def]) =>
    Object.assign({}, def, { key }),
  ) as ColumnDef[]
}

export const toColumnDefsWithShared = <E extends TableEntity = TableEntity>(
  defs: Record<Exclude<keyof E, keyof TableEntity>, ColumnDefConfig>,
): ColumnDef[] => [...toColumnDefs<E>(defs), ...SHARED_COLUMNS]

export const createColumnBehaviors = (columnDefs: ColumnDef[]) =>
  columnDefs.map(cd => {
    const buildBehavior = COLUMN_BEHAVIOR_BUILDERS[cd.type]

    if (!buildBehavior) {
      throw new Error(`No column behavior builder registered for "${cd.type}".`)
    }

    return buildBehavior(cd)
  })
