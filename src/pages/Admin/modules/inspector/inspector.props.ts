import { COMMON_PROPS } from '../consts/commonProps.const'
import { InspectorModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefListProp } from '../../meta/refList'
import { createTextProp } from '../../meta/text'

export const InspectorProps = defineProps<InspectorModel.Entity>({
  cuil: createNumberProp({
    title: 'CUIL',
    config: {
      isBig: true,
      field: {
        required: true,
      },
    },
  }),
  apellido: createTextProp({
    title: 'Apellido',
    config: {
      field: {
        required: true,
      },
    },
  }),
  nombre: createTextProp({
    title: 'Nombre',
  }),
  profesiones: createRefListProp({
    metaModelKey: 'tipoProfesion',
  }),
  ...COMMON_PROPS,
})
