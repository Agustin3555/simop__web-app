import { FojaMedicionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const FojaMedicionColumns =
  toColumnDefsWithShared<FojaMedicionModel.Entity>({
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    numeroExpediente: {
      type: 'text',
      title: 'Numero de Expediente de Foja',
      inputConfig: {
        isRequired: true,
      },
    },
    numero: {
      type: 'number',
      title: 'Número de foja',
      inputConfig: {
        isRequired: true,
      },
    },
    avance: {
      type: 'number',
      title: 'Porcentaje de avance',
      sub: '%',
      isDecimal: true,
    },
    fechaFoja: {
      type: 'datetime',
      title: 'Fecha de Solicitud',
    },
    fechaCertificacion: {
      type: 'datetime',
      title: 'Fecha Certificación',
    },
    montoTotal: {
      type: 'number',
      title: 'Monto Total',
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      columnConfig: {
        calc: 'sum',
      },
    },
    inspector: {
      type: 'ref',
      tableRefKey: 'inspector',
      inputConfig: {
        isRequired: true,
      },
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
