import { createTableDef } from '@/shared/core/table.helper'
import { DepartamentoColumns } from './departamento.columns'
import { DepartamentoService } from './departamento.service'

export const DepartamentoTable = createTableDef({
  key: 'departamento',
  title: {
    singular: 'Departamento',
    plural: 'Departamentos',
  },
  classIcon: 'fa-solid fa-vector-square',
  columnDefs: DepartamentoColumns,
  anchorColumnKey: 'nombre',
  services: DepartamentoService,
})
