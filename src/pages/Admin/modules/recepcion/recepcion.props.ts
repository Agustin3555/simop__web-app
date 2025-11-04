import { COMMON_PROPS } from '../consts/commonProps.const'
import { RecepcionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const RecepcionProps = defineProps<RecepcionModel.Entity>({
  obra: createRefProp({
    metaModelRef: 'obra',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  numeroActa: createNumberProp({
    title: 'Número De Acta',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoRecepcion: createRefProp({
    metaModelRef: 'tipoRecepcion',
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
