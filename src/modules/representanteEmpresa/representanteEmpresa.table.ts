import { createTableDef } from '@/shared/core/table.helper'
import { RepresentanteEmpresaColumns } from './representanteEmpresa.columns'
import { RepresentanteEmpresaService } from './representanteEmpresa.service'

export const RepresentanteEmpresaTable = createTableDef({
  key: 'representanteEmpresa',
  title: {
    singular: 'Representante de Empresa',
    plural: 'Representantes de Empresa',
  },
  classIcon: 'fa-solid fa-user-tie',
  columnDefs: RepresentanteEmpresaColumns,
  anchorColumnKey: 'id',
  services: RepresentanteEmpresaService,
})
