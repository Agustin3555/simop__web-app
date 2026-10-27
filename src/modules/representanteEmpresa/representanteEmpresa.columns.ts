import { RepresentanteEmpresaModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const RepresentanteEmpresaColumns =
  toColumnDefsWithShared<RepresentanteEmpresaModel.Entity>({
    empresa: {
      type: 'ref',
      tableRefKey: 'empresa',
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
