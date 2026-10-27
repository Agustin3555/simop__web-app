import { createTableDef } from '@/shared/core/table.helper'
import { RedeterminacionColumns } from './redeterminacion.columns'
import { RedeterminacionService } from './redeterminacion.service'

export const RedeterminacionTable = createTableDef({
  key: 'redeterminacion',
  title: {
    singular: 'Redeterminación',
    plural: 'Redeterminaciones',
  },
  classIcon: 'fa-solid fa-calculator',
  columnDefs: RedeterminacionColumns,
  anchorColumnKey: 'numeroExpedienteSolicitud',
  services: RedeterminacionService,
})
