import {
  TipoParalizacionModel,
  ObraModel,
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
import { ParalizacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

export interface OwnFields {
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string
}

export interface RelationFields {
  direccion: DireccionModel.Ref
  departamento: DepartamentoModel.Ref
  obra: ObraModel.Ref
  tipoParalizacion: TipoParalizacionModel.Ref
}

export interface Entity extends BaseEntity, OwnFields, RelationFields {}

export type CreateEntity = OwnFields &
  Record<
    'ireccionId' | 'provinciaId' | 'obraId' | 'tipoParalizacionId ',
    number
  >

export type UpdateEntity = Partial<CreateEntity>

export type Ref = BaseRef<OwnFields, 'numero' | 'numeroExpediente'>

export const scheme = new MetaModel<Entity>({
  key: 'paralizacion',
  service: ParalizacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Paralización',
    plural: 'Paralizaciones',
  },

  anchorField: 'numeroExpediente',
  props: {
    obra: new RefProp({
      getScheme: () => ObraModel.scheme,
      field: {
        required: true,
      },
    }),
    numero: new NumberProp('Número de Paralización', {
      field: {
        required: true,
      },
    }),
    numeroExpediente: new TextProp('Número De Expediente', {
      field: {
        required: true,
      },
    }),
    fechaReinicio: new DateProp('Fecha Reinicio', {}),
    nuevaFechaFinObra: new DateProp('Nueva Fecha Fin de Obra', {}),
    fecha: new DateProp('Fecha'),
    tipoParalizacion: new RefProp({
      getScheme: () => TipoParalizacionModel.scheme,
    }),
    direccion: new RefProp({
      getScheme: () => DireccionModel.scheme,
    }),
    departamento: new RefProp({
      getScheme: () => DepartamentoModel.scheme,
    }),
    observaciones: new TextLongProp('Observaciones'),
    ...COMMON_PROPS,
  },
})
