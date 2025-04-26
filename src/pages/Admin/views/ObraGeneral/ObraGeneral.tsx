import { Entity } from '@/services/config'
import { SchemeView } from '../../components'
import {
  EmpresaModel,
  LocalidadModel,
  TipoContratacionObraModel,
  TipoEstadoObraModel,
  TipoFinanciamientoObraModel,
  TipoProgramaObraModel,
  TipoTematicaObraModel,
} from '../../models'
import {
  BooleanProp,
  DateProp,
  NumberProp,
  RefProp,
  Scheme,
  TextLongProp,
  TextProp,
} from '../../services/config'
import { ObraService } from '../../services'
import { COMMON_PROPS } from '../../constants/commonProps.const'

const obraGeneralScheme: Scheme<Entity> = {
  key: 'obraGeneral',
  service: ObraService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra Básica General',
    plural: 'Obra Básica General',
  },
  anchorField: 'nombre',
  columnVisibility: [
    'numero',
    'nombre',
    'empresa',
    'numeroExpediente',
    'fechaContratacion',
    'montoContratacion',
    'tipoFinanciamientoObra',
    'tipoEstadoObra',
    'fechaInicio',
    'avanceTotal',
    'localidad',
  ],
  quickFilters: ['empresa', 'tipoEstadoObra', 'fechaInicio', 'localidad'],

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
    {
      title: 'Modalidad',
      props: {
        obraNueva: new BooleanProp('Obra nueva'),
        porcentajeObraNueva: new NumberProp('Porcentaje de obra nueva', {
          decimal: true,
          sub: '%',
        }),
        metrosCuadradosObraNueva: new NumberProp(
          'm² (metros cuadrados) de obra nueva',
          {
            decimal: true,
            sub: 'm²',
          },
        ),
        metrosLinealesObraNueva: new NumberProp(
          'm (metros lineales) de obra nueva',
          {
            decimal: true,
            sub: 'm',
          },
        ),
        observacionesObraNueva: new TextLongProp('Observaciones de obra nueva'),

        obraRefaccionada: new BooleanProp('Obra refaccionada'),
        porcentajeObraRefaccionada: new NumberProp(
          'Porcentaje de obra refaccionada',
          {
            decimal: true,
            sub: '%',
          },
        ),
        metrosCuadradosObraRefaccionada: new NumberProp(
          'm² (metros cuadrados) de obra refaccionada',
          {
            decimal: true,
            sub: 'm²',
          },
        ),
        metrosLinealesObraRefaccionada: new NumberProp(
          'm (metros lineales) de obra refaccionada',
          {
            decimal: true,
            sub: 'm',
          },
        ),
        observacionesObraRefaccionada: new TextLongProp(
          'Observaciones de obra refaccionada',
        ),
        ...COMMON_PROPS,
      },
    },
  ],
}

const ObraGeneral = () => (
  <SchemeView scheme={obraGeneralScheme} add={false} edit={false} />
)

export default ObraGeneral
