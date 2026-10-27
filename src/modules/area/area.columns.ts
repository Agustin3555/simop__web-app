import { AreaModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const AreaColumns = toColumnDefsWithShared<AreaModel.Entity>({
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
  tipoNivelArea: {
    type: 'ref',
    tableRefKey: 'tipoNivelArea',
  },
  area: {
    type: 'ref',
    tableRefKey: 'area',
  },
})
