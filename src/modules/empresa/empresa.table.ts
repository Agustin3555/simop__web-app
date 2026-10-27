import { createTableDef } from '@/shared/core/table.helper'
import { EmpresaColumns } from './empresa.columns'
import { EmpresaService } from './empresa.service'

export const EmpresaTable = createTableDef({
  key: 'empresa',
  title: {
    singular: 'Empresa',
    plural: 'Empresas',
  },
  classIcon: 'fa-solid fa-industry',
  columnDefs: EmpresaColumns,
  anchorColumnKey: 'nombre',
  services: EmpresaService,
})
