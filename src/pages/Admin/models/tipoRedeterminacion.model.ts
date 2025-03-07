import { Scheme } from '../services/config'
import { TipoRedeterminacionService } from '../services'
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

export interface Ref {
  id: number
  nombre: string
}

export interface CreateData {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export interface UpdateData {
  nombre?: string
}

export interface UpdateBody {
  nombre?: string
}

export const scheme: Scheme<Entity> = {
  key: 'tipoRedeterminacion',
  service: TipoRedeterminacionService,
  title: {
    singular: 'Tipo Redeterminación',
    plural: 'Tipos de Redeterminación',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        ...TIPO_PROPS,
      },
    },
  ],
}
