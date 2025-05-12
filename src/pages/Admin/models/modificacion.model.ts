import {
  ObraModel,
  TipoModificacionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  MetaModel,
  TextProp,
} from '../services/config'
import { ModificacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numeroExpediente: string
  numeroResolucion: string
  monto: number
  nuevoMontoObra: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoModificacion: TipoModificacionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | 'tipoModificacionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroExpediente'>

export const metaModel = new MetaModel<Entity>({
  key: 'modificacion',
  service: ModificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },

  anchorField: 'numeroExpediente',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
      field: {
        required: true,
      },
    }),
    numeroExpediente: new TextProp('Número De Expediente', {
      field: {
        required: true,
      },
    }),
    numeroResolucion: new TextProp('Número De Resolución'),
    monto: new NumberProp('Monto', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    nuevoMontoObra: new NumberProp('Nuevo Monto', {
      decimal: true,
      isMoney: true,
      big: true,
      sum: true,
      pre: '$',
    }),
    fecha: new DateProp('Fecha'),
    tipoModificacion: new RefProp({
      getMetaModel: () => TipoModificacionModel.metaModel,
    }),
    direccion: new RefProp({
      getMetaModel: () => DireccionModel.metaModel,
    }),
    departamento: new RefProp({
      getMetaModel: () => DepartamentoModel.metaModel,
    }),
    observaciones: new TextLongProp('Observaciones'),
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
