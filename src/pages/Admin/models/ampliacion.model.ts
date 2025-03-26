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
  numeroResolucion?: string
  numeroExpedienteSolicitud?: string
  plazoMesesSolicitado?: number
  plazoMesesOtorgado?: number
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obra?: ObraModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroResolucion?: string
  numeroExpedienteSolicitud?: string
  plazoMesesSolicitado?: number
  plazoMesesOtorgado?: number
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obra?: ObraModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
  numero: number
}

export interface Ref {
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

export interface UpdateData {
  numero?: number
  numeroResolucion?: string
  numeroExpedienteSolicitud?: string
  plazoMesesSolicitado?: number
  plazoMesesOtorgado?: number
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obraId?: number
}

export interface UpdateBody {
  numero?: number
  numeroResolucion?: string
  numeroExpedienteSolicitud?: string
  plazoMesesSolicitado?: number
  plazoMesesOtorgado?: number
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obraId?: number
}

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
          'Número De Expediente Solicitud',
        ),
        plazoMesesSolicitado: new NumberProp('Plazo de Meses Solicitado '),
        plazoMesesOtorgado: new NumberProp('Plazo de Meses Otorgado'),
        nuevaFechaFinObra: new DateProp('Nueva Fecha Fin De Obra'),
        fecha: new DateProp('Fecha'),
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
