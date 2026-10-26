import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { TipoTematicaObraService } from './tipoTematicaObra.service'
import { createTableDef } from '@/shared/core/table.helper'

export const TipoTematicaObraTable = createTableDef({
  key: 'tipoTematicaObra',
  title: {
    singular: 'Tipo de Temática de Obra',
    plural: 'Tipos de Temáticas de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoTematicaObraService,
})
