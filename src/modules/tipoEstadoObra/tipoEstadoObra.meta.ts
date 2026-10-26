import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoEstadoObraService } from './tipoEstadoObra.service'

export const TipoEstadoObraTable = createTableDef({
  key: 'tipoEstadoObra',
  title: {
    singular: 'Estado',
    plural: 'Tipos de Estados de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoEstadoObraService,
})
