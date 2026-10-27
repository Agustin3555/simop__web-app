import { createTableDef } from '@/shared/core/table.helper'
import { RescisionColumns } from './rescision.columns'
import { RescisionService } from './rescision.service'

export const RescisionTable = createTableDef({
  key: 'rescision',
  title: {
    singular: 'Rescisión',
    plural: 'Rescisiones',
  },
  classIcon: 'fa-solid fa-ban',
  columnDefs: RescisionColumns,
  anchorColumnKey: 'numeroExpediente',
  services: RescisionService,
})
