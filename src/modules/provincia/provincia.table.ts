import { ProvinciaService } from './provincia.service'
import { ProvinciaColumns } from './provincia.columns'
import { createTableDef } from '@/shared/core/table.helper'

export const ProvinciaTable = createTableDef({
  key: 'provincia',
  title: {
    singular: 'Provincia',
    plural: 'Provincias',
  },
  classIcon: 'fa-solid fa-vector-square',
  columnDefs: ProvinciaColumns,
  anchorColumnKey: 'nombre',
  services: ProvinciaService,
})
