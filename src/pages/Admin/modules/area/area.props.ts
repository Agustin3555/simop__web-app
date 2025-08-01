import { COMMON_PROPS } from '../consts/commonProps.const'
import { AreaModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const AreaProps = defineProps<AreaModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  tipoNivelArea: createRefProp({
    metaModelRef: 'tipoNivelArea',
  }),
  area: createRefProp({
    metaModelRef: 'area',
  }),
  ...COMMON_PROPS,
})
