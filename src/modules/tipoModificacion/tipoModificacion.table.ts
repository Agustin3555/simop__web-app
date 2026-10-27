import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoModificacionService } from './tipoModificacion.service'

export const TipoModificacionTable = createTableDef({
  key: 'tipoModificacion',
  title: {
    singular: 'Tipo de Modificación',
    plural: 'Tipos de Modificaciones',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoModificacionService,
})
