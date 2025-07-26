import { COMMON_PROPS } from '../consts/commonProps.const'
import { RescisionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const RescisionProps = defineProps<RescisionModel.Entity>({
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
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoRescision: createRefProp({
    metaModelKey: 'tipoRescision',
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
