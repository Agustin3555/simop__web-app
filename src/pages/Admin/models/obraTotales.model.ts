import { EmpresaModel, LocalidadModel } from '.'
import { NumberProp, RefProp, Scheme, TextProp } from '../services/config'
import { ObraService } from '../services'
import { COMMON_PROPS } from '../constants/commonProps.const'

export interface RawEntity {
  id: number

  numero: number
  nombre: string
  montoContratacion?: number
  nuevoMonto?: number
  avanceTotal?: number
  totalMontoCertificado?: number
  totalOrdenPago?: number
  totalPagado?: number
  montoPendientePago?: number
  totalMontoRedeterminacion?: number
  totalPagadoRedeterminacion?: number
  montoPendientePagoRedeterminacion?: number
  porcentajePendienteCertificar?: number
  montoPendienteCertificar?: number

  empresa?: EmpresaModel.RawRef
  localidad?: LocalidadModel.RawRef
}

export interface Entity {
  id: number

  numero: number
  nombre: string
  montoContratacion?: number
  nuevoMonto?: number
  avanceTotal?: number
  totalMontoCertificado?: number
  totalOrdenPago?: number
  totalPagado?: number
  montoPendientePago?: number
  totalMontoRedeterminacion?: number
  totalPagadoRedeterminacion?: number
  montoPendientePagoRedeterminacion?: number
  porcentajePendienteCertificar?: number
  montoPendienteCertificar?: number

  empresa?: EmpresaModel.Ref
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
        }),
        nombre: new TextProp('Nombre', {}),
        empresa: new RefProp({
          getScheme: () => EmpresaModel.scheme,
        }),
        localidad: new RefProp({
          getScheme: () => LocalidadModel.scheme,
        }),
        montoContratacion: new NumberProp('Monto de Contratación', {
          decimal: true,
          isMoney: true,
          big: true,
          sum: true,
          pre: '$',
        }),
        avanceTotal: new NumberProp('Porcentaje de Avance Total', {
          decimal: true,
          sub: '%',
        }),
        id: COMMON_PROPS.id,
      },
    },
  ],
}
