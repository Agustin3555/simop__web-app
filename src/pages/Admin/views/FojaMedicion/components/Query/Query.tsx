import { LocalQuery } from '@/pages/Admin/components'
import {
  FojaMedicionService,
  ObraService,
  InspectorService,
} from '@/pages/Admin/services'

const Query = () => {
  return (
    <LocalQuery
      getAllProvider={FojaMedicionService.getAll}
      columns={[
        {
          header: 'ID',
          key: 'id',
          type: 'number',
        },
        {
          header: 'Número',
          key: 'numero',
          type: 'number',
        },
        {
          header: 'Número Expediente',
          key: 'numeroExpediente',
          type: 'text',
        },
        {
          header: 'Avance',
          key: 'avance',
          type: 'text',
        },
        {
          header: 'Número de Obra',
          key: 'obraNumero',
          type: 'number',
          ref: {
            field: 'numero',
            getOneProvider: ObraService.getOne,
          },
        },
        {
          header: 'Inspector',
          key: 'inspectorId',
          type: 'number',
          ref: {
            field: 'nombre',
            getOneProvider: InspectorService.getOne,
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
