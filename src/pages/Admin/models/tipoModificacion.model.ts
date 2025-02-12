import { Scheme } from '../services/config'
import { TipoModificacionService } from '../services'
import { TIPO_PROPS } from '../constants/commonProps.const'

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
  key: 'tipoModificacion',
  service: TipoModificacionService,
  title: {
    singular: 'Tipo de Modificación',
    plural: 'Tipos de Modificaciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
