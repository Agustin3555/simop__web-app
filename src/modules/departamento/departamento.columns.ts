import { DepartamentoModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const DepartamentoColumns =
  toColumnDefsWithShared<DepartamentoModel.Entity>({
    nombre: {
      type: 'text',
      title: 'Nombre',
      inputConfig: {
        isRequired: true,
      },
    },
    osmId: {
      type: 'number',
      title: 'OSM ID',
      isBig: true,
    },
    provincia: {
      type: 'ref',
      tableRefKey: 'provincia',
    },
    apg: {
      type: 'ref',
      tableRefKey: 'apg',
    },
  })
