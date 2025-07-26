import { COMMON_PROPS } from '../consts/commonProps.const'
import { RedeterminacionModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createRefListProp } from '../../meta/refList'
import { createTextProp } from '../../meta/text'

export const RedeterminacionProps = defineProps<RedeterminacionModel.Entity>({
  obra: createRefProp({
    metaModelKey: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpedienteSolicitud: createTextProp({
    title: 'Número de Expediente de Solicitud',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente de Redeterminación',
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
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
  fechaRedeterminacion: createDateProp({
    title: 'Fecha de Solicitud',
  }),
  fechaCertificacion: createDateProp({
    title: 'Fecha Certificación',
  }),
  tieneHijas: createBooleanProp({
    title: 'AE Acum.',
  }),
  tipoRedeterminacion: createRefProp({
    metaModelKey: 'tipoRedeterminacion',
  }),
  area: createRefProp({
    metaModelKey: 'area',
  }),
  redeterminacionesHijas: createRefListProp({
    metaModelKey: 'SELF',
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  ...COMMON_PROPS,
})
