import { ObraModel, DireccionModel, DepartamentoModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../services/config'
import { AmpliacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
}

interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<'direccionId' | 'departamentoId' | 'obraId', number>

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero' | 'numeroResolucion'>

export const metaModel = new MetaModel<Entity>({
  key: 'ampliacion',
  service: AmpliacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Ampliación',
    plural: 'Ampliaciones',
  },

  anchorField: 'numeroExpedienteSolicitud',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
      field: {
        required: true,
      },
    }),
    numero: new NumberProp('Número De Ampliación', {
      field: {
        required: true,
      },
    }),
    numeroResolucion: new TextProp('Número De Resolución'),
    numeroExpedienteSolicitud: new TextProp(
      'Número de Expediente de Solicitud',
    ),
    plazoMesesSolicitado: new NumberProp('Plazo de Meses Solicitado '),
    plazoMesesOtorgado: new NumberProp('Plazo de Meses Otorgado'),
    nuevaFechaFinObra: new DateProp('Nueva Fecha Fin De Obra'),
    fecha: new DateProp('Fecha'),
    observaciones: new TextLongProp('Observaciones'),
    direccion: new RefProp({
      getMetaModel: () => DireccionModel.metaModel,
    }),
    departamento: new RefProp({
      getMetaModel: () => DepartamentoModel.metaModel,
    }),
    ...COMMON_PROPS,
  },
})

metaModel.fieldsByService = [
  {
    methods: [Method.GetAll, Method.GetOne],
    fields: metaModel.allFields,
  },
  {
    methods: [Method.Create, Method.UpdateOne],
    groups: [{ key: '', fields: omitBaseEntity(metaModel.allFields) }],
  },
]
