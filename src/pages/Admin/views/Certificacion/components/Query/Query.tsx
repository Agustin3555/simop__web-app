import { LocalQuery } from '@/pages/Admin/components'
import {
  CertificacionService,
  FojaMedicionService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={CertificacionService.getAll}
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
          header: 'Foja Medición',
          key: 'fojaMedicionId',
          type: 'number',
          ref: {
            field: 'numeroExpediente',
            getOneProvider: FojaMedicionService.getOne,
          },
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
