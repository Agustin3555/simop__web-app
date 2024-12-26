import { LocalQuery } from '@/pages/Admin/components'
import {
  PagoCertificacionService,
  CertificacionService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={PagoCertificacionService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number',
        },
        {
          header: 'Número Expediente',
          key: 'numeroExpediente',
          type: 'text',
        },
        {
          header: 'Certificacón',
          key: 'id',
          type: 'number',
          ref: {
            field: 'numeroExpediente',
            getOneProvider: CertificacionService.getOne,
          },
        },
        {
          header: 'Número Resolución',
          key: 'numeroResolucion',
          type: 'text',
        },
        {
          header: 'Monto',
          key: 'monto',
          type: 'number',
        },
        {
          header: 'Observaciones',
          key: 'observaciones',
          type: 'text',
        },
        {
          header: 'Fecha',
          key: 'fecha',
          type: 'dateTime',
        },
        {
          header: 'Creación del recurso',
          key: 'creado',
          type: 'dateTime',
        },
        {
          header: 'Modificación del recurso',
          key: 'modificado',
          type: 'dateTime',
        },
      ]}
    />
  )
}

export default Query
