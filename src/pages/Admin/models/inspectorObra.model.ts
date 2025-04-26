import {
  ObraModel,
  InspectorModel,
  TipoInspectorModel,
  TipoProfesionModel,
} from '.'
import { RefProp, Scheme, BooleanProp, DateProp } from '../services/config'
import { InspectorObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  vigencia: boolean
  fecha?: string

  obra: ObraModel.RawRef
  inspector: InspectorModel.RawRef
  tipoInspector: TipoInspectorModel.RawRef
  tipoProfesion: TipoProfesionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  vigencia: boolean
  fecha?: string

  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
  tipoInspector: TipoInspectorModel.Ref
  tipoProfesion: TipoProfesionModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
}

export interface Ref {
  id: number
}

export interface CreateData {
  fecha?: string
  vigencia: boolean

  obraId: number
  inspectorId: number
  tipoInspectorId: number
  tipoProfesionId: number
}

export interface CreateBody {
  fecha?: string
  vigencia: boolean

  obraId: number
  inspectorId: number
  tipoInspectorId: number
  tipoProfesionId: number
}

export type UpdateData = Partial<CreateData>

export type UpdateBody = Partial<CreateBody>

export const scheme: Scheme<Entity> = {
  key: 'inspectorObra',
  service: InspectorObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },
  anchorField: 'id',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
          field: {
            required: true,
          },
        }),
        inspector: new RefProp({
          getScheme: () => InspectorModel.scheme,
          field: {
            required: true,
          },
        }),
        tipoInspector: new RefProp({
          getScheme: () => TipoInspectorModel.scheme,
        }),
        tipoProfesion: new RefProp({
          getScheme: () => TipoProfesionModel.scheme,
        }),
        vigencia: new BooleanProp('Vigencia', {
          falseText: 'No Vigente',
          trueText: 'Vigente',
        }),
        fecha: new DateProp('Fecha'),
        ...COMMON_PROPS,
      },
    },
  ],
}
