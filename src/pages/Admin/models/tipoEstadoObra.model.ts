import { TIPO_PROPS } from '../constants/commonProps.const'
import { TipoEstadoObraService } from '../services'
import { Scheme } from '../services/config'

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
  key: 'tipoEstadoObra',
  service: TipoEstadoObraService,
  title: {
    singular: 'Tipo de Estado de Obra',
    plural: 'Tipos de Estados de Obra',
  },

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}