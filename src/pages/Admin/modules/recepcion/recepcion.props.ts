import { COMMON_PROPS } from '../consts/commonProps.const'
import { RecepcionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const RecepcionProps = defineProps<RecepcionModel.Entity>({
  obra: createRefProp({
    metaModelKey: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroActa: createNumberProp({
    title: 'Número De Acta',
    config: {
      field: {
        required: true,
      },
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoRecepcion: createRefProp({
    metaModelKey: 'tipoRecepcion',
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
