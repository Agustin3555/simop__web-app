import { Ref } from '@/types'
import { ObraModel } from '.'
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

export interface RawEntity {
  id: number
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obra?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numero: number
}

export interface CreateData {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obraId: number
}

export interface CreateBody {
  numero: number
  numeroResolucion: string
  numeroExpedienteSolicitud: string
  plazoMesesSolicitado: number
  plazoMesesOtorgado: number
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obraId: number
}

export const scheme: Scheme<Entity> = {
  key: 'ampliacion',
  service: AmpliacionService,
  title: {
    singular: 'Ampliación',
    plural: 'Ampliaciones',
  },
  refAnchorField: 'Nombre',

  groups: [
    {
      props: {
        numero: new NumberProp('numero', 'Número', {
          field: {
            required: true,
          },
        }),
        numeroResolucion: new TextProp(
          'numeroResolucion',
          'Número De Resolución',
          {
            field: {
              required: true,
            },
          },
        ),
        numeroExpedienteSolicitud: new TextProp(
          'numeroExpedienteSolicitud',
          'Número De Expediente Solicitud',
          {
            field: {
              required: true,
            },
          },
        ),

        plazoMesesSolicitado: new NumberProp(
          'plazoMesesSolicitado',
          'Plazo de Meses Solicitado ',
          {
            field: {
              required: true,
            },
          },
        ),

        plazoMesesOtorgado: new NumberProp(
          'plazoMesesOtorgado',
          'Plazo de Meses Otorgado',
          {
            field: {
              required: true,
            },
          },
        ),
        nuevaFechaFinObra: new DateProp(
          'nuevaFechaFinObra',
          'nuevaFechaFinObra',
          {
            field: {
              required: true,
            },
          },
        ),

        fecha: new DateProp('fecha', 'Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('observaciones', 'Observaciones'),

        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
