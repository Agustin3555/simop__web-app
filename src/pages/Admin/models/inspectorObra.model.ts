import {
  ObraModel,
  InspectorModel,
  TipoInspectorModel,
  TipoProfesionModel,
} from '.'
import { Ref } from '@/types'
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

  obra: Ref
  inspector: Ref
  tipoInspector: Ref
  tipoProfesion: Ref

  creado: string
  modificado: string
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
