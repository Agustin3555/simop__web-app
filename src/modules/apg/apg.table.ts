import { createTableDef } from '@/shared/core/table.helper'
import { APGColumns } from './apg.columns'
import { APGService } from './apg.service'

export const APGTable = createTableDef({
  key: 'apg',
  title: {
    singular: 'APG',
    plural: 'APGs',
  },
  classIcon: 'fa-solid fa-vector-square',
  columnDefs: APGColumns,
  anchorColumnKey: 'numero',
  services: APGService,
})
