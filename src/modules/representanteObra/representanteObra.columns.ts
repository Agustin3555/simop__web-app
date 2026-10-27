import { RepresentanteObraModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RepresentanteObraColumns =
  toColumnDefsWithShared<RepresentanteObraModel.Entity>({
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    representante: {
      type: 'ref',
      tableRefKey: 'representante',
    },
    tipoRepresentante: {
      type: 'ref',
      tableRefKey: 'tipoRepresentante',
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha',
    },
  })
