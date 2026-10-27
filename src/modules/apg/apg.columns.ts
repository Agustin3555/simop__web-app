import { APGModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const APGColumns = toColumnDefsWithShared<APGModel.Entity>({
  numero: {
    type: 'number',
    title: 'Número',
    inputConfig: {
      isRequired: true,
    },
  },
  color: {
    type: 'text',
    title: 'Color',
    inputConfig: {
      isRequired: true,
    },
  },
})
