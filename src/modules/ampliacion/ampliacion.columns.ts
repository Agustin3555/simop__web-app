import { AmpliacionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const AmpliacionColumns = toColumnDefsWithShared<AmpliacionModel.Entity>(
  {
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    numero: {
      type: 'number',
      title: 'Número De Ampliación',
      inputConfig: {
        isRequired: true,
      },
    },
    numeroResolucion: {
      type: 'text',
      title: 'Número De Resolución',
    },
    numeroExpedienteSolicitud: {
      type: 'text',
      title: 'Número de Expediente de Solicitud',
    },
    plazoMesesSolicitado: {
      type: 'number',
      title: 'Plazo de Meses Solicitado',
    },
    plazoMesesOtorgado: {
      type: 'number',
      title: 'Plazo de Meses Otorgado',
    },
    nuevaFechaFinObra: {
      type: 'datetime',
      title: 'Nueva Fecha Fin De Obra',
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha',
    },
    observaciones: {
      type: 'text',
      title: 'Observaciones',
      domain: 'longText',
    },
    area: {
      type: 'ref',
      tableRefKey: 'area',
    },
  },
)
