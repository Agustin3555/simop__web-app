import { COMMON_PROPS } from '../consts/commonProps.const'
import { FojaMedicionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const FojaMedicionProps = defineProps<FojaMedicionModel.Entity>({
  obra: createRefProp({
    metaModelRef: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Numero de Expediente de Foja',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número de foja',
    config: {
      field: {
        required: true,
      },
    },
  }),
  avance: createNumberProp({
    title: 'Porcentaje de avance',
    config: {
      sub: '%',
      isDecimal: true,
    },
  }),
  fechaFoja: createDateProp({
    title: 'Fecha de Solicitud',
  }),
  fechaCertificacion: createDateProp({
    title: 'Fecha Certificación',
  }),
  montoTotal: createNumberProp({
    title: 'Monto Total',
    config: {
      pre: '$',
      isDecimal: true,
      isMoney: true,
      isBig: true,
      calculate: 'sum',
    },
  }),
  inspector: createRefProp({
    metaModelRef: 'inspector',
  }),
  area: createRefProp({
    metaModelRef: 'area',
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  ...COMMON_PROPS,
})
