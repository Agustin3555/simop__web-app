import { TIPO_PROPS } from '../constants/commonProps.const'
import { TipoInspectorService } from '../services'
import { MetaModel } from '../services/config'

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
  key: 'tipoInspector',
  service: TipoInspectorService,
  title: {
    singular: 'Tipo de Inspector',
    plural: 'Tipos de Inspectores',
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
