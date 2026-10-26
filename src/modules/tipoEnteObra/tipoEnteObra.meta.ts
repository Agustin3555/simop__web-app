import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoEnteObraService } from './tipoEnteObra.service'

export const TipoEnteObraTable = createTableDef({
  key: 'tipoEnteObra',
  title: {
    singular: 'Tipo de Ente de Obra',
    plural: 'Tipos de Entes de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoEnteObraService,
})
