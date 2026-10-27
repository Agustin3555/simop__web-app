import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoContratacionObraService } from './tipoContratacionObra.service'

export const TipoContratacionObraTable = createTableDef({
  key: 'tipoContratacionObra',
  title: {
    singular: 'Tipo de Contratación de Obra',
    plural: 'Tipos de Contrataciones de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoContratacionObraService,
})
