import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoProgramaObraService } from './tipoProgramaObra.service'

export const TipoProgramaObraTable = createTableDef({
  key: 'tipoProgramaObra',
  title: {
    singular: 'Programa de Obra',
    plural: 'Programas de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoProgramaObraService,
})
