import { InspectorObraModel } from '.'
import { toColumnDefsWithShared } from '@/shared/core/column.helper'

export const InspectorObraColumns =
  toColumnDefsWithShared<InspectorObraModel.Entity>({
    obra: {
      type: 'ref',
      tableRefKey: 'obra',
      inputConfig: {
        isRequired: true,
      },
    },
    inspector: {
      type: 'ref',
      tableRefKey: 'inspector',
      inputConfig: {
        isRequired: true,
      },
    },
    tipoInspector: {
      type: 'ref',
      tableRefKey: 'tipoInspector',
    },
    tipoProfesion: {
      type: 'ref',
      tableRefKey: 'tipoProfesion',
    },
    fecha: {
      type: 'datetime',
      title: 'Fecha',
    },
  })
