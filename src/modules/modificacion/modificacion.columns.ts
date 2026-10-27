import { ModificacionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const ModificacionColumns =
  toColumnDefsWithShared<ModificacionModel.Entity>({
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
    monto: {
      type: 'number',
      title: 'Monto',
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      columnConfig: {
        calc: 'sum',
      },
    },
    nuevoMontoObra: {
      type: 'number',
      title: 'Nuevo Monto',
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      columnConfig: {
        calc: 'sum',
      },
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha',
    },
    tipoModificacion: {
      type: 'ref',
      tableRefKey: 'tipoModificacion',
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
