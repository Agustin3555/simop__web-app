import { MetaModel } from '../services/config'
import { TipoContratacionObraService } from '../services'
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

export interface CreateEntity {
  nombre: string
}

export interface CreateBody {
  nombre: string
}

export type UpdateEntity = Partial<CreateEntity>

export type UpdateBody = Partial<CreateBody>

export const scheme: MetaModel<Entity> = {
  key: 'tipoContratacionObra',
  service: TipoContratacionObraService,
  title: {
    singular: 'Tipo de Contratación de Obra',
    plural: 'Tipos de Contrataciones de Obra',
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
