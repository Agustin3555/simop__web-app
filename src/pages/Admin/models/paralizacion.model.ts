import { Ref } from '@/types'
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

  obra?: Ref
  tipoParalizacion?: Ref

  creado: string
  modificado: string
}

export interface RawRef {
  id: number
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

export const scheme: Scheme<Entity> = {
  key: 'paralizacion',
  service: ParalizacionService,
  title: {
    singular: 'Paralización',
    plural: 'Paralizaciones',
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
        numeroExpediente: new TextProp(
          'numeroExpediente',
          'Número De Expediente',
          {
            field: {
              required: true,
            },
          },
        ),
        fechaReinicio: new DateProp('fechaReinicio', 'Fecha Reinicio', {
          field: { required: true },
        }),
        nuevaFechaFinObra: new DateProp(
          'nuevaFechaFinObra',
          'Nueva Fecha Fin de Obra',
          { field: { required: true } },
        ),
        fecha: new DateProp('fecha', 'Fecha', { field: { required: true } }),

        observaciones: new TextLongProp('observaciones', 'Observaciones'),

        obra: new RefProp('obra', {
          getScheme: () => ObraModel.scheme,
        }),

        tipoParalizacion: new RefProp('tipoParalizacion', {
          getScheme: () => TipoParalizacionModel.scheme,
        }),

        ...COMMON_PROPS,
      },
    },
  ],
}
