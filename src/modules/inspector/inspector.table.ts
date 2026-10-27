import { createTableDef } from '@/shared/core/table.helper'
import { InspectorColumns } from './inspector.columns'
import { InspectorService } from './inspector.service'

export const InspectorTable = createTableDef({
  key: 'inspector',
  title: {
    singular: 'Inspector',
    plural: 'Inspectores',
  },
  classIcon: 'fa-solid fa-helmet-safety',
  columnDefs: InspectorColumns,
  anchorColumnKey: 'nombre',
  services: InspectorService,
})
