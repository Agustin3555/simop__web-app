import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoRecepcionService } from './tipoRecepcion.service'

export const TipoRecepcionTable = createTableDef({
  key: 'tipoRecepcion',
  title: {
    singular: 'Recepción',
    plural: 'Tipos de Recepción',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoRecepcionService,
})
