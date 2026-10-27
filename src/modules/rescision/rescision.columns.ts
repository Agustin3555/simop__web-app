import { RescisionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RescisionColumns = toColumnDefsWithShared<RescisionModel.Entity>({
  obra: {
    type: 'ref',
    tableRefKey: 'obra',
    inputConfig: {
      isRequired: true,
    },
  },
  numeroExpediente: {
    type: 'text',
    title: 'Número De Expediente',
    inputConfig: {
      isRequired: true,
    },
  },
  numeroResolucion: {
    type: 'text',
    title: 'Número De Resolución',
  },
  fecha: {
    type: 'datetime',
    title: 'Fecha',
  },
  tipoRescision: {
    type: 'ref',
    tableRefKey: 'tipoRescision',
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
