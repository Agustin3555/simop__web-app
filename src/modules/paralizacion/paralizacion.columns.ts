import { ParalizacionModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const ParalizacionColumns =
  toColumnDefsWithShared<ParalizacionModel.Entity>({
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    numero: {
      type: 'number',
      title: 'Número de Paralización',
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
    fechaReinicio: {
      type: 'datetime',
      title: 'Fecha Reinicio',
    },
    nuevaFechaFinObra: {
      type: 'datetime',
      title: 'Nueva Fecha Fin de Obra',
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha',
    },
    tipoParalizacion: {
      type: 'ref',
      tableRefKey: 'tipoParalizacion',
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
