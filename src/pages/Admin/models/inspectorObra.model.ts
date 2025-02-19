import {
  ObraModel,
  InspectorModel,
  TipoInspectorModel,
  TipoProfesionModel,
} from '.'
import { RefProp, Scheme } from '../services/config'
import { InspectorObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  obra: ObraModel.RawRef
  inspector: InspectorModel.RawRef
  tipoInspector: TipoInspectorModel.RawRef
  tipoProfesion: TipoProfesionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number

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
  obraId: number
  inspectorId: number
  tipoInspectorId: number
  tipoProfesionId: number
}

export interface CreateBody {
  obraId: number
  inspectorId: number
  tipoInspectorId: number
  tipoProfesionId: number
}

export const scheme: Scheme<Entity> = {
  key: 'inspectorObra',
  service: InspectorObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },

  groups: [
    {
      props: {
        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),
        inspector: new RefProp('inspector', {
          getScheme: () => InspectorModel.scheme,
        }),
        tipoInspector: new RefProp('tipoInspector', {
          getScheme: () => TipoInspectorModel.scheme,
        }),
        tipoProfesion: new RefProp('tipoProfesion', {
          getScheme: () => TipoProfesionModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
