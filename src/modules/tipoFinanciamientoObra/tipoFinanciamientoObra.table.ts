import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoFinanciamientoObraService } from './tipoFinanciamientoObra.service'

export const TipoFinanciamientoObraTable = createTableDef({
  key: 'tipoFinanciamientoObra',
  title: {
    singular: 'Tipo de Financiamiento de Obra',
    plural: 'Tipos de Financiamientos de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoFinanciamientoObraService,
})
