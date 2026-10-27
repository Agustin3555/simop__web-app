import { createTableDef } from '@/shared/core/table.helper'
import { LocalidadColumns } from './localidad.columns'
import { LocalidadService } from './localidad.service'

export const LocalidadTable = createTableDef({
  key: 'localidad',
  title: {
    singular: 'Localidad',
    plural: 'Localidades',
  },
  classIcon: 'fa-solid fa-location-dot',
  columnDefs: LocalidadColumns,
  anchorColumnKey: 'nombre',
  services: LocalidadService,
})
