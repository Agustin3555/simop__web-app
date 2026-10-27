import { createTableDef } from '@/shared/core/table.helper'
import { InspectorObraColumns } from './inspectorObra.columns'
import { InspectorObraService } from './inspectorObra.service'

export const InspectorObraTable = createTableDef({
  key: 'inspectorObra',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },
  classIcon: 'fa-solid fa-helmet-safety',
  columnDefs: InspectorObraColumns,
  anchorColumnKey: 'id',
  services: InspectorObraService,
})
