import { createTableDef } from '@/shared/core/table.helper'
import { ParalizacionColumns } from './paralizacion.columns'
import { ParalizacionService } from './paralizacion.service'

export const ParalizacionTable = createTableDef({
  key: 'paralizacion',
  title: {
    singular: 'Paralización',
    plural: 'Paralizaciones',
  },
  classIcon: 'fa-solid fa-circle-stop',
  columnDefs: ParalizacionColumns,
  anchorColumnKey: 'numeroExpediente',
  services: ParalizacionService,
})
