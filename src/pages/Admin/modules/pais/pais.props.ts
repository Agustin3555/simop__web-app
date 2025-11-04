import { COMMON_PROPS } from '../consts/commonProps.const'
import { PaisModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createTextProp } from '../../meta/text'

export const PaisProps = defineProps<PaisModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  ...COMMON_PROPS,
})
