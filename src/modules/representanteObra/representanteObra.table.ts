import { createTableDef } from '@/shared/core/table.helper'
import { RepresentanteObraColumns } from './representanteObra.columns'
import { RepresentanteObraService } from './representanteObra.service'

export const RepresentanteObraTable = createTableDef({
  key: 'representanteObra',
  title: {
    singular: 'Representante de Obra',
    plural: 'Representantes de Obra',
  },
  classIcon: 'fa-solid fa-user-tie',
  columnDefs: RepresentanteObraColumns,
  anchorColumnKey: 'id',
  services: RepresentanteObraService,
})
