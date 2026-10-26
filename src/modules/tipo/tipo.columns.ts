import { toColumnDefsWithShared } from '@/shared/core/column.helper'
import { Entity } from './tipo.model'

export const TipoColumns = toColumnDefsWithShared<Entity>({
  nombre: {
    type: 'text',
    title: 'Nombre',
    inputConfig: {
      isRequired: true,
    },
  },
})
