import { PagoCertificacionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const PagoCertificacionColumns =
  toColumnDefsWithShared<PagoCertificacionModel.Entity>({
    numero: {
      type: 'number',
      title: 'Número de Pago',
      inputConfig: {
        isRequired: true,
      },
    },
    ordenPago: {
      type: 'text',
      title: 'Orden de pago',
      inputConfig: {
        isRequired: true,
      },
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha de Pago',
    },
    monto: {
      type: 'number',
      title: 'Monto orden de pago',
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      columnConfig: {
        calc: 'sum',
      },
    },
    fojaMedicion: {
      type: 'ref',
      tableRefKey: 'fojaMedicion',
    },
    redeterminacion: {
      type: 'ref',
      tableRefKey: 'redeterminacion',
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
