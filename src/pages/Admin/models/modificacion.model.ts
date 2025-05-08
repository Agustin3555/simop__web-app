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
  Scheme,
  TextProp,
} from '../services/config'
import { ModificacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

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

export const scheme: Scheme<Entity> = {
  key: 'modificacion',
  service: ModificacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Modificación',
    plural: 'Modificaciones',
  },
  anchorField: 'numeroExpediente',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
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
          getScheme: () => TipoModificacionModel.scheme,
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
    },
  ],
}
