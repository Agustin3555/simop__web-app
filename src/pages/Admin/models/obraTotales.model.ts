import {
  LocalidadModel,
  EmpresaModel,
  TipoTematicaObraModel,
  TipoContratacionObraModel,
  TipoFinanciamientoObraModel,
  TipoProgramaObraModel,
  TipoEstadoObraModel,
} from '.'
import {
  DateProp,
  NumberProp,
  RefProp,
  Scheme,
  TextLongProp,
  TextProp,
} from '../services/config'
import { ObraService } from '../services'

export interface RawEntity {
  id: number

  numero: number
  nombre: string
  montoContratacion?: number
  avanceTotal?: number

  localidad?: LocalidadModel.RawRef
}

export interface Entity {
  id: number

  numero: number
  nombre: string
  montoContratacion?: number
  avanceTotal?: number

  localidad?: LocalidadModel.Ref
}

export const scheme: Scheme<Entity> = {
  key: 'obra',
  service: ObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Obras',
  },
  anchorField: 'nombre',

  groups: [
    {
      props: {
        numero: new NumberProp('Número De Obra', {
          big: true,
          field: {
            required: true,
          },
        }),
        nombre: new TextProp('Nombre', {
          field: {
            required: true,
          },
        }),
        empresa: new RefProp({
          getScheme: () => EmpresaModel.scheme,
        }),
        numeroExpediente: new TextProp('Número de Expediente de Contrato'),
        numeroResolucion: new TextProp('Número de Resolución'),
        anioResolucion: new NumberProp('Año de Resolución'),
        numeroContratacion: new TextProp('Número de Contratación'),
        fechaContratacion: new DateProp('Fecha de Contratación'),
        montoContratacion: new NumberProp('Monto de Contratación', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        tipoContratacionObra: new RefProp({
          getScheme: () => TipoContratacionObraModel.scheme,
        }),
        tipoFinanciamientoObra: new RefProp({
          getScheme: () => TipoFinanciamientoObraModel.scheme,
        }),
        tipoProgramaObra: new RefProp({
          getScheme: () => TipoProgramaObraModel.scheme,
        }),
        tipoTematicaObra: new RefProp({
          getScheme: () => TipoTematicaObraModel.scheme,
        }),
        tipoEstadoObra: new RefProp({
          getScheme: () => TipoEstadoObraModel.scheme,
        }),
        fechaInicio: new DateProp('Fecha de Inicio'),
        fechaFin: new DateProp('Fecha de Fin'),
        plazoMeses: new NumberProp('Plazo en Meses'),
        plazoDias: new NumberProp('Plazo en Días'),
        avanceTotal: new NumberProp('Porcentaje de Avance Total', {
          decimal: true,
          sub: '%',
        }),
        nomenclaturaCatastral: new TextProp('Nomenclatura Catastral'),
        localidad: new RefProp({
          getScheme: () => LocalidadModel.scheme,
        }),
        direccion: new TextProp('Dirección'),
        lugar: new TextLongProp('Lugar'),
        observaciones: new TextLongProp('Observaciones generales'),
      },
    },
  ],
}
