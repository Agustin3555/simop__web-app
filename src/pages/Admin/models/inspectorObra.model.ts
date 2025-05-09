import {
  ObraModel,
  InspectorModel,
  TipoInspectorModel,
  TipoProfesionModel,
} from '.'
import { RefProp, MetaModel, BooleanProp, DateProp } from '../services/config'
import { InspectorObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  vigencia: boolean
  fecha: string
}

export interface RelationFields {
  obra: ObraModel.Ref
  inspector: InspectorModel.Ref
  tipoInspector: TipoInspectorModel.Ref
  tipoProfesion: TipoProfesionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'obraId' | 'inspectorId' | 'tipoInspectorId' | 'tipoProfesionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'fecha'>

export const scheme = new MetaModel<Entity>({
  key: 'inspectorObra',
  service: InspectorObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Inspector de Obra',
    plural: 'Inspectores de Obra',
  },

  anchorField: 'id',
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
})
