import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoRescisionService } from './tipoRescision.service'

export const TipoRescisionTable = createTableDef({
  key: 'tipoRescision',
  title: {
    singular: 'Rescisión',
    plural: 'Tipos de Rescisión',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoRescisionService,
})
