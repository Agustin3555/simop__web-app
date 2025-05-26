import {
  ObraModel,
  TipoRecepcionModel,
  DireccionModel,
  DepartamentoModel,
} from '.'
import {
  DateProp,
  TextLongProp,
  RefProp,
  MetaModel,
  NumberProp,
} from '../services/config'
import { RecepcionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'
import { Method } from '@/services/config'
import { omitBaseEntity } from '../constants/selectors.const'

export interface OwnFields {
  numeroActa: number
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoRecepcion: TipoRecepcionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'direccionId' | 'departamentoId' | 'obraId' | ' tipoRecepcionId',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numeroActa'>

export const metaModel = new MetaModel<Entity>({
  key: 'recepcion',
  service: RecepcionService,
  refreshRate: 'medium',
  title: {
    singular: 'Recepcion',
    plural: 'Recepciones',
  },
  faIcon: 'fa-solid fa-',

  anchorField: 'numeroActa',
  props: {
    obra: new RefProp({
      getMetaModel: () => ObraModel.metaModel,
      field: {
        required: true,
      },
    }),
    numeroActa: new NumberProp('Número De Acta', {
      field: {
        required: true,
      },
    }),
    fecha: new DateProp('Fecha'),
    tipoRecepcion: new RefProp({
      getMetaModel: () => TipoRecepcionModel.metaModel,
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
