import { COMMON_PROPS } from '../consts/commonProps.const'
import { ObraModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createRefListProp } from '../../meta/refList'
import { createTextProp } from '../../meta/text'
import { MinSize } from '../../meta/utils'

export const ObraProps = defineProps<ObraModel.Entity>({
  numero: createNumberProp({
    title: 'Número De Obra',
    config: {
      isBig: true,
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  tipoEnteObra: createRefProp({
    metaModelRef: 'tipoEnteObra',
    minSize: 6,
  }),
  solicitante: createTextProp({
    title: 'Solicitante',
  }),
  fechaPedido: createDateProp({
    title: 'Fecha de Pedido',
  }),
  empresa: createRefProp({
    metaModelRef: 'empresa',
    minSize: 7,
  }),
  localidades: createRefListProp({
    metaModelRef: 'localidad',
    minSize: 6,
  }),
  apgs: createRefListProp({
    metaModelRef: 'apg',
    minSize: 6,
  }),
  tipoEstadoObra: createRefProp({
    metaModelRef: 'tipoEstadoObra',
    minSize: 6,
  }),
  avanceTotal: createNumberProp({
    title: 'Avance Acumulado',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  fechaContratacion: createDateProp({
    title: 'Fecha de Contratación',
  }),
  inaugurable: createBooleanProp({
    title: 'Inaugurable',
    config: {
      allowNull: true,
    },
  }),
  inaugurada: createBooleanProp({
    title: 'Inaugurada',
    config: {
      allowNull: true,
    },
  }),
  gestion2023: createBooleanProp({
    title: 'Gestión 2023 - 2027',
  }),
  montoContratacion: createNumberProp({
    title: 'Monto de Contratación',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  nuevoMonto: createNumberProp({
    title: 'Nuevo Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  porcentajePendienteCertificar: createNumberProp({
    title: 'Porcentaje Pendiente a Certificar',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  montoPendienteCertificarActualizado: createNumberProp({
    title: 'Monto Pendiente a Certificar Actualizado',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  tipoTematicaObra: createRefProp({
    metaModelRef: 'tipoTematicaObra',
    minSize: 7,
  }),
  tipoProgramaObra: createRefProp({
    metaModelRef: 'tipoProgramaObra',
  }),
  numeroExpediente: createTextProp({
    title: 'Número de Expediente de Contrato',
  }),
  numeroResolucion: createTextProp({
    title: 'Número de Resolución',
  }),
  anioResolucion: createNumberProp({
    title: 'Año de Resolución',
  }),
  numeroContratacion: createTextProp({
    title: 'Número de Contratación',
  }),
  tipoContratacionObra: createRefProp({
    metaModelRef: 'tipoContratacionObra',
  }),
  tipoOrigenFinanciamientoObra: createRefProp({
    metaModelRef: 'tipoOrigenFinanciamientoObra',
  }),
  tipoFinanciamientoObra: createRefProp({
    metaModelRef: 'tipoFinanciamientoObra',
  }),
  fechaInicio: createDateProp({
    title: 'Fecha de Inicio',
  }),
  fechaFin: createDateProp({
    title: 'Fecha de Fin',
  }),
  plazoMeses: createNumberProp({
    title: 'Plazo en Meses',
  }),
  plazoDias: createNumberProp({
    title: 'Plazo en Días',
  }),
  nomenclaturaCatastral: createTextProp({
    title: 'Nomenclatura Catastral',
  }),
  direccion: createTextProp({
    title: 'Dirección',
  }),
  lugar: createTextProp({
    title: 'Lugar',
    config: {
      isLong: true,
    },
  }),
  observaciones: createTextProp({
    title: 'Observaciones generales',
    config: {
      isLong: true,
    },
  }),
  obraNueva: createBooleanProp({
    title: 'Obra nueva',
  }),
  porcentajeObraNueva: createNumberProp({
    title: 'Porcentaje de obra nueva',
    config: {
      isDecimal: true,
      sub: '%',
    },
  }),
  metrosCuadradosObraNueva: createNumberProp({
    title: 'm² (metros cuadrados) de obra nueva',
    config: {
      isDecimal: true,
      sub: 'm²',
    },
  }),
  metrosLinealesObraNueva: createNumberProp({
    title: 'm (metros lineales) de obra nueva',
    config: {
      isDecimal: true,
      sub: 'm',
    },
  }),
  observacionesObraNueva: createTextProp({
    title: 'Observaciones de obra nueva',
    config: {
      isLong: true,
    },
  }),
  obraRefaccionada: createBooleanProp({
    title: 'Obra refaccionada',
  }),
  porcentajeObraRefaccionada: createNumberProp({
    title: 'Porcentaje de obra refaccionada',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  metrosCuadradosObraRefaccionada: createNumberProp({
    title: 'm² (metros cuadrados) de obra refaccionada',
    config: {
      sub: 'm²',
      isDecimal: true,
    },
  }),
  metrosLinealesObraRefaccionada: createNumberProp({
    title: 'm (metros lineales) de obra refaccionada',
    config: {
      sub: 'm',
      isDecimal: true,
    },
  }),
  observacionesObraRefaccionada: createTextProp({
    title: 'Observaciones de obra refaccionada',
    config: {
      isLong: true,
    },
  }),
  totalPendientePago: createNumberProp({
    title: 'Total Pendiente de Pago',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  ...COMMON_PROPS,
})
