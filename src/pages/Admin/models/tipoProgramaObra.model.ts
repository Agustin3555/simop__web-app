import { MetaModel } from '../services/config'
import { TipoProgramaObraService } from '../services'
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
  key: 'tipoProgramaObra',
  service: TipoProgramaObraService,
  title: {
    singular: 'Obra Inaugurada',
    plural: 'Obra Inaugurada',
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
