import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoOrigenFinanciamientoObraService } from './tipoOrigenFinanciamientoObra.service'

export const TipoOrigenFinanciamientoObraTable = createTableDef({
  key: 'tipoOrigenFinanciamientoObra',
  title: {
    singular: 'Tipo de Origen de Financiamiento de Obra',
    plural: 'Tipos de Origen de Financiamiento de Obra',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoOrigenFinanciamientoObraService,
})
