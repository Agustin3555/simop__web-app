import { toColumnDefsWithShared } from '@/shared/core/column.helper'
import { ProvinciaModel } from '.'

export const ProvinciaColumns = toColumnDefsWithShared<ProvinciaModel.Entity>({
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
  pais: {
    type: 'ref',
    tableRefKey: 'pais',
    inputConfig: {
      isRequired: true,
    },
  },
})
