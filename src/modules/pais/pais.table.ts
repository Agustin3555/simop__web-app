import { PaisService } from './pais.service'
import { PaisColumns } from './pais.columns'
import { createTableDef } from '@/shared/core/table.helper'

export const PaisTable = createTableDef({
  key: 'pais',
  title: {
    singular: 'País',
    plural: 'Países',
  },
  classIcon: 'fa-solid fa-earth-americas',
  columnDefs: PaisColumns,
  anchorColumnKey: 'nombre',
  services: PaisService,
})
