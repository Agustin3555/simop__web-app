import { RedeterminacionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RedeterminacionColumns =
  toColumnDefsWithShared<RedeterminacionModel.Entity>({
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    numeroExpedienteSolicitud: {
      type: 'text',
      title: 'Número de Expediente de Solicitud',
      inputConfig: {
        isRequired: true,
      },
    },
    numeroExpediente: {
      type: 'text',
      title: 'Número De Expediente de Redeterminación',
    },
    numeroResolucion: {
      type: 'text',
      title: 'Número De Resolución',
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
    fechaRedeterminacion: {
      type: 'datetime',
      title: 'Fecha de Solicitud',
    },
    fechaCertificacion: {
      type: 'datetime',
      title: 'Fecha Certificación',
    },
    tieneHijas: {
      type: 'boolean',
      title: 'AE Acum.',
    },
    tipoRedeterminacion: {
      type: 'ref',
      tableRefKey: 'tipoRedeterminacion',
    },
    area: {
      type: 'ref',
      tableRefKey: 'area',
    },
    redeterminacionesHijas: {
      type: 'ref',
      tableRefKey: 'redeterminacion',
      isMultiple: true,
    },
    observaciones: {
      type: 'text',
      title: 'Observaciones',
      domain: 'longText',
    },
  })
