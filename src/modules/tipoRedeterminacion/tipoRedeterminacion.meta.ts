import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoRedeterminacionService } from './tipoRedeterminacion.service'

export const TipoRedeterminacionTable = createTableDef({
  key: 'tipoRedeterminacion',
  title: {
    singular: 'Redeterminación',
    plural: 'Tipos de Redeterminación',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoRedeterminacionService,
})
