import { createTableDef } from '@/shared/core/table.helper'
import { PagoCertificacionColumns } from './pagoCertificacion.columns'
import { PagoCertificacionService } from './pagoCertificacion.service'

export const PagoCertificacionTable = createTableDef({
  key: 'pagoCertificacion',
  title: {
    singular: 'Pago de Certificación',
    plural: 'Pagos de Certificación',
  },
  classIcon: 'fa-solid fa-file-invoice-dollar',
  columnDefs: PagoCertificacionColumns,
  anchorColumnKey: 'numero',
  services: PagoCertificacionService,
})
