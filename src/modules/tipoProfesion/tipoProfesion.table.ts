import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoProfesionService } from './tipoProfesion.service'

export const TipoProfesionTable = createTableDef({
  key: 'tipoProfesion',
  title: {
    singular: 'Profesión',
    plural: 'Profesiones',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoProfesionService,
})
