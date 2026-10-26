import { buildBooleanColumnBehavior } from './columns/boolean'
import { buildDatetimeColumnBehavior } from './columns/datetime'
import { buildNumberColumnBehavior } from './columns/number'
import { buildRefColumnBehavior } from './columns/ref'
import { buildTextColumnBehavior } from './columns/text'
import { ColumnBehavior, ColumnDef } from './types'

export const COLUMN_BEHAVIOR_BUILDERS: Partial<
  Record<ColumnDef['type'], (def: any) => ColumnBehavior>
> = {
  boolean: buildBooleanColumnBehavior,
  datetime: buildDatetimeColumnBehavior,
  text: buildTextColumnBehavior,
  number: buildNumberColumnBehavior,
  ref: buildRefColumnBehavior,
}

export const SHARED_COLUMNS: ColumnDef[] = [
  {
    type: 'number',
    key: 'id',
    title: 'ID',
    inputConfig: {
      isHidden: true,
    },
  },
  {
    type: 'datetime',
    key: 'creado',
    title: 'Creación del recurso',
    withTime: true,
    inputConfig: {
      isHidden: true,
    },
  },
  {
    type: 'datetime',
    key: 'modificado',
    title: 'Modificación del recurso',
    withTime: true,
    inputConfig: {
      isHidden: true,
    },
  },
]
