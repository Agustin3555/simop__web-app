import { createTableDef } from '@/shared/core/table.helper'
import { RepresentanteColumns } from './representante.columns'
import { RepresentanteService } from './representante.service'

export const RepresentanteTable = createTableDef({
  key: 'representante',
  title: {
    singular: 'Representante',
    plural: 'Representantes',
  },
  classIcon: 'fa-solid fa-user-tie',
  columnDefs: RepresentanteColumns,
  anchorColumnKey: 'nombre',
  services: RepresentanteService,
})
