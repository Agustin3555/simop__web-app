import { createTableDef } from '@/shared/core/table.helper'
import { RecepcionColumns } from './recepcion.columns'
import { RecepcionService } from './recepcion.service'

export const RecepcionTable = createTableDef({
  key: 'recepcion',
  title: {
    singular: 'Recepción',
    plural: 'Recepciones',
  },
  classIcon: 'fa-solid fa-handshake',
  columnDefs: RecepcionColumns,
  anchorColumnKey: 'numeroActa',
  services: RecepcionService,
})
