import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoNivelAreaService } from './tipoNivelArea.service'

export const TipoNivelAreaTable = createTableDef({
  key: 'tipoNivelArea',
  title: {
    singular: 'Tipo de Nivel de Área',
    plural: 'Tipos de Niveles de Área',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoNivelAreaService,
})
