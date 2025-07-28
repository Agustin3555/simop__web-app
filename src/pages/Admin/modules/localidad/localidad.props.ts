import { COMMON_PROPS } from '../consts/commonProps.const'
import { LocalidadModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const LocalidadProps = defineProps<LocalidadModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  departamento: createRefProp({
    metaModelRef: 'departamento',
  }),
  osmId: createNumberProp({
    title: 'OSM ID',
    config: {
      isBig: true,
    },
  }),
  ...COMMON_PROPS,
})
