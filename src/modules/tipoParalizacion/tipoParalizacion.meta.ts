import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoParalizacionService } from './tipoParalizacion.service'

export const TipoParalizacionTable = createTableDef({
  key: 'tipoParalizacion',
  title: {
    singular: 'Tipo de Paralización',
    plural: 'Tipos de Paralización',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoParalizacionService,
})
