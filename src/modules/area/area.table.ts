import { createTableDef } from '@/shared/core/table.helper'
import { AreaColumns } from './area.columns'
import { AreaService } from './area.service'

export const AreaTable = createTableDef({
  key: 'area',
  title: {
    singular: 'Área',
    plural: 'Áreas',
  },
  classIcon: 'fa-solid fa-network-wired',
  columnDefs: AreaColumns,
  anchorColumnKey: 'nombre',
  services: AreaService,
})
