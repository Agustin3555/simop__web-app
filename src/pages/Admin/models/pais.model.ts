import { Scheme } from '@/models/config'
import { PaisService } from '../services'
import { COMMON_PROPS } from '@/constants'

export interface RawEntity {
  id: number
  nombre: string
  creado: string
  modificado: string
}

export interface Entity {
  id: number
  nombre: string
  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export const scheme: Scheme<Entity> = {
  accessorKey: 'pais',
  service: PaisService,
  title: {
    singular: 'País',
    plural: 'Países',
  },

  groups: [
    {
      props: {
        ...COMMON_PROPS,
        nombre: {
          accessorKey: 'nombre',
          title: 'Nombre',
          type: 'text',
        },
      },
    },
  ],
}
