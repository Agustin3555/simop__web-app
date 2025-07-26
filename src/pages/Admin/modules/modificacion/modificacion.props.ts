import { COMMON_PROPS } from '../consts/commonProps.const'
import { ModificacionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const ModificacionProps = defineProps<ModificacionModel.Entity>({
  obra: createRefProp({
    metaModelKey: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  monto: createNumberProp({
    title: 'Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  nuevoMontoObra: createNumberProp({
    title: 'Nuevo Monto',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoModificacion: createRefProp({
    metaModelKey: 'tipoModificacion',
  }),
  area: createRefProp({
    metaModelKey: 'area',
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  ...COMMON_PROPS,
})
