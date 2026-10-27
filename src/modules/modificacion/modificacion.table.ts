import { createTableDef } from '@/shared/core/table.helper'
import { ModificacionColumns } from './modificacion.columns'
import { ModificacionService } from './modificacion.service'

export const ModificacionTable = createTableDef({
  key: 'modificacion',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },
  classIcon: 'fa-solid fa-file-pen',
  columnDefs: ModificacionColumns,
  anchorColumnKey: 'numeroExpediente',
  services: ModificacionService,
})
