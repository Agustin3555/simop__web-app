import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoInspectorService } from './tipoInspector.service'

export const TipoInspectorTable = createTableDef({
  key: 'tipoInspector',
  title: {
    singular: 'Tipo de Inspector',
    plural: 'Tipos de Inspectores',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoInspectorService,
})
