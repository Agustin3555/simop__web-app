import { createTableDef } from '@/shared/core/table.helper'
import { FojaMedicionColumns } from './fojaMedicion.columns'
import { FojaMedicionService } from './fojaMedicion.service'

export const FojaMedicionTable = createTableDef({
  key: 'fojaMedicion',
  title: {
    singular: 'Foja de Medición',
    plural: 'Fojas de Mediciones',
  },
  classIcon: 'fa-solid fa-clipboard-list',
  columnDefs: FojaMedicionColumns,
  anchorColumnKey: 'numeroExpediente',
  services: FojaMedicionService,
})
