import { LocalidadModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const LocalidadColumns = toColumnDefsWithShared<LocalidadModel.Entity>({
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
  departamento: {
    type: 'ref',
    tableRefKey: 'departamento',
  },
  osmId: {
    type: 'number',
    title: 'OSM ID',
    isBig: true,
  },
})
