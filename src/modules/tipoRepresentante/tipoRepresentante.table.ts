import { TipoColumns } from '@/modules/tipo/tipo.columns'
import { createTableDef } from '@/shared/core/table.helper'
import { TipoRepresentanteService } from './tipoRepresentante.service'

export const TipoRepresentanteTable = createTableDef({
  key: 'tipoRepresentante',
  title: {
    singular: 'Tipo de Representante',
    plural: 'Tipos de Representantes',
  },
  classIcon: 'fa-solid fa-shapes',
  columnDefs: TipoColumns,
  anchorColumnKey: 'nombre',
  services: TipoRepresentanteService,
})
