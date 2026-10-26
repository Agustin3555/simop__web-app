import { toColumnDefsWithShared } from '@/shared/core/column.helper'
import { PaisModel } from '.'

export const PaisColumns = toColumnDefsWithShared<PaisModel.Entity>({
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
})
