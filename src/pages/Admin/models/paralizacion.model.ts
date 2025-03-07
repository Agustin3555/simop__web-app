import { TipoParalizacionModel, ObraModel } from '.'
import {
  DateProp,
  NumberProp,
  TextLongProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { ParalizacionService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obra?: ObraModel.RawRef
  tipoParalizacion?: TipoParalizacionModel.RawRef

  creado: string
  modificado: string
}

export interface Entity {
  id: number
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obra?: ObraModel.Ref
  tipoParalizacion?: TipoParalizacionModel.Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number

  numeroExpediente: string
  numero: number
}

export interface Ref {
  id: number

  numeroExpediente: string
  numero: number
}

export interface CreateData {
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obraId: number
  tipoParalizacionId: number
}

export interface CreateBody {
  numero: number
  numeroExpediente: string
  fechaReinicio: string
  nuevaFechaFinObra: string
  fecha: string
  observaciones: string

  obraId: number
  tipoParalizacionId: number
}
export interface UpdateData {
  numero?: number
  numeroExpediente?: string
  fechaReinicio?: string
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoParalizacionId?: number
}

export interface UpdateBody {
  numero?: number
  numeroExpediente?: string
  fechaReinicio?: string
  nuevaFechaFinObra?: string
  fecha?: string
  observaciones?: string

  obraId?: number
  tipoParalizacionId?: number
}

export const scheme: Scheme<Entity> = {
  key: 'paralizacion',
  service: ParalizacionService,
  refreshRate: 'medium',
  title: {
    singular: 'Paralización',
    plural: 'Paralizaciones',
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
        observaciones: new TextLongProp('Observaciones'),
        ...COMMON_PROPS,
      },
    },
  ],
}
