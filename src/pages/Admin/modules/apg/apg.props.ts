import { COMMON_PROPS } from '../consts/commonProps.const'
import { APGModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createTextProp } from '../../meta/text'

export const APGProps = defineProps<APGModel.Entity>({
  numero: createNumberProp({
    title: 'Número',
    config: {
      field: {
        required: true,
      },
    },
  }),
  color: createTextProp({
    title: 'Color',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ...COMMON_PROPS,
})
