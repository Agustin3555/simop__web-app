import { PropScheme } from '@/models/config'

interface CommonFields {
  id: unknown
  creado: unknown
  modificado: unknown
}

export const COMMON_PROPS: Record<
  keyof CommonFields,
  PropScheme<CommonFields>
> = {
  id: {
    accessorKey: 'id',
    title: 'ID',
    type: 'number',

    field: false,
  },
  creado: {
    accessorKey: 'creado',
    title: 'Creación del recurso',
    type: 'dateTime',

    field: false,
  },
  modificado: {
    accessorKey: 'modificado',
    title: 'Modificación del recurso',
    type: 'dateTime',

    field: false,
  },
}
