import { InspectorModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const InspectorColumns = toColumnDefsWithShared<InspectorModel.Entity>({
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
  profesiones: {
    type: 'ref',
    tableRefKey: 'tipoProfesion',
    isMultiple: true,
  },
})
