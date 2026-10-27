import { RepresentanteModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RepresentanteColumns =
  toColumnDefsWithShared<RepresentanteModel.Entity>({
    cuil: {
      type: 'number',
      title: 'CUIL',
      isBig: true,
      inputConfig: {
        isRequired: true,
      },
    },
    nombre: {
      type: 'text',
      title: 'Nombre',
      inputConfig: {
        isRequired: true,
      },
    },
    direccion: {
      type: 'text',
      title: 'Dirección',
    },
    numeroMatricula: {
      type: 'text',
      title: 'Número de Matricula',
    },
    pais: {
      type: 'ref',
      tableRefKey: 'pais',
    },
    provincia: {
      type: 'ref',
      tableRefKey: 'provincia',
    },
    localidad: {
      type: 'ref',
      tableRefKey: 'localidad',
    },
  })
