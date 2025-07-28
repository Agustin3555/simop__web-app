import { COMMON_PROPS } from '../consts/commonProps.const'
import { ProvinciaModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const ProvinciaProps = defineProps<ProvinciaModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  pais: createRefProp({
    metaModelRef: 'pais',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ...COMMON_PROPS,
})
