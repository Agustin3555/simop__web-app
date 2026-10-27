import { createTableDef } from '@/shared/core/table.helper'
import { AmpliacionColumns } from './ampliacion.columns'
import { AmpliacionService } from './ampliacion.service'

export const AmpliacionTable = createTableDef({
  key: 'ampliacion',
  title: {
    singular: 'Ampliación',
    plural: 'Ampliaciones',
  },
  classIcon: 'fa-solid fa-expand',
  columnDefs: AmpliacionColumns,
  anchorColumnKey: 'numeroExpedienteSolicitud',
  services: AmpliacionService,
})
