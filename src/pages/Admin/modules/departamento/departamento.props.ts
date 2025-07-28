import { COMMON_PROPS } from '../consts/commonProps.const'
import { DepartamentoModel } from '.'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const DepartamentoProps = defineProps<DepartamentoModel.Entity>({
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  osmId: createNumberProp({
    title: 'OSM ID',
    config: {
      isBig: true,
    },
  }),
  provincia: createRefProp({
    metaModelRef: 'provincia',
  }),
  apg: createRefProp({
    metaModelRef: 'apg',
  }),
  ...COMMON_PROPS,
})
