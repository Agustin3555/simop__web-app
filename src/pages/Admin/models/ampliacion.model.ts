import { ObraModel, DireccionModel, DepartamentoModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { AmpliacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'
import { BaseEntity, BaseRef } from '@/models/config'

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

export const scheme: Scheme<Entity> = {
  key: 'ampliacion',
  service: AmpliacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Ampliación',
    plural: 'Ampliaciones',
  },
  anchorField: 'numeroExpedienteSolicitud',

  groups: [
    {
      props: {
        obra: new RefProp({
          getScheme: () => ObraModel.scheme,
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
          getScheme: () => DireccionModel.scheme,
        }),
        departamento: new RefProp({
          getScheme: () => DepartamentoModel.scheme,
        }),
        ...COMMON_PROPS,
      },
    },
  ],
}
