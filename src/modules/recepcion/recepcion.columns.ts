import { RecepcionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RecepcionColumns = toColumnDefsWithShared<RecepcionModel.Entity>({
  obra: {
    type: 'ref',
    tableRefKey: 'obra',
    inputConfig: {
      isRequired: true,
    },
  },
  numeroActa: {
    type: 'number',
    title: 'Número De Acta',
    inputConfig: {
      isRequired: true,
    },
  },
  fecha: {
    type: 'datetime',
    title: 'Fecha',
  },
  tipoRecepcion: {
    type: 'ref',
    tableRefKey: 'tipoRecepcion',
  },
  area: {
    type: 'ref',
    tableRefKey: 'area',
  },
  observaciones: {
    type: 'text',
    title: 'Observaciones',
    domain: 'longText',
  },
})
