import { EmpresaModel, LocalidadModel } from '.'
import {
  DateProp,
  NumberProp,
  RefProp,
  Scheme,
  TextProp,
} from '../services/config'
import { ObraTotalesService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  numero: string
  nombre: string
  montoContratacion?: string
  fechaInicio?: string
  avanceTotal?: number

  nuevoMonto?: string

  totalCertificadoFojaMedicion?: string
  totalOrdenPagoFojaMedicion?: string
  totalPagadoFojaMedicion?: string
  totalPendientePagoFojaMedicion?: string

  totalCertificadoRedeterminacion?: string
  totalOrdenPagoRedeterminacion?: string
  totalPagadoRedeterminacion?: string
  totalPendientePagoRedeterminacion?: string

  porcentajePendienteCertificar?: number
  montoPendienteCertificar?: string

  empresa?: EmpresaModel.RawRef
  localidad?: LocalidadModel.RawRef
}

export interface Entity {
  id: number

  numero: string
  nombre: string
  montoContratacion?: string
  fechaInicio?: string
  avanceTotal?: number

  nuevoMonto?: string

  totalCertificadoFojaMedicion?: string
  totalOrdenPagoFojaMedicion?: string
  totalPagadoFojaMedicion?: string
  totalPendientePagoFojaMedicion?: string

  totalCertificadoRedeterminacion?: string
  totalOrdenPagoRedeterminacion?: string
  totalPagadoRedeterminacion?: string
  totalPendientePagoRedeterminacion?: string

  porcentajePendienteCertificar?: number
  montoPendienteCertificar?: string

  empresa?: EmpresaModel.Ref
  localidad?: LocalidadModel.Ref
}

export const scheme: Scheme<Entity> = {
  key: 'obraTotales',
  service: ObraTotalesService,
  refreshRate: 'medium',
  title: {
    singular: 'Obra',
    plural: 'Totales de Obra',
  },
  anchorField: 'nombre',
  quickFilters: ['empresa', 'fechaInicio', 'localidad'],

  groups: [
    {
      props: {
        numero: new NumberProp('Número De Obra', {
          big: true,
        }),
        nombre: new TextProp('Nombre'),
        empresa: new RefProp({
          getScheme: () => EmpresaModel.scheme,
        }),
        localidad: new RefProp({
          getScheme: () => LocalidadModel.scheme,
        }),
        fechaInicio: new DateProp('Fecha de Inicio'),
        avanceTotal: new NumberProp('Porcentaje de Avance Total', {
          decimal: true,
          sub: '%',
        }),
        montoContratacion: new NumberProp('Monto de Contratación', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        nuevoMonto: new NumberProp('Nuevo Monto', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        totalCertificadoFojaMedicion: new NumberProp(
          'Total Certificado de Fojas',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalOrdenPagoFojaMedicion: new NumberProp(
          'Total Orden de Pago de Fojas',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalPagadoFojaMedicion: new NumberProp('Total Pagado de Fojas', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        totalPendientePagoFojaMedicion: new NumberProp(
          'Total Pendiente de Pago de Fojas',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalCertificadoRedeterminacion: new NumberProp(
          'Total Certificado de Redeterminaciones',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalOrdenPagoRedeterminacion: new NumberProp(
          'Total Orden de Pago de Redeterminaciones',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalPagadoRedeterminacion: new NumberProp(
          'Total Pagado de Redeterminaciones',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        totalPendientePagoRedeterminacion: new NumberProp(
          'Total Pendiente de Pago de Redeterminaciones',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        porcentajePendienteCertificar: new NumberProp(
          'Porcentaje Pendiente a Certificar',
          {
            decimal: true,
            sub: '%',
          },
        ),
        montoPendienteCertificar: new NumberProp(
          'Monto Pendiente a Certificar',
          {
            decimal: true,
            isMoney: true,
            big: true,
            sum: true,
            pre: '$',
          },
        ),
        id: COMMON_PROPS.id,
      },
    },
  ],
}
