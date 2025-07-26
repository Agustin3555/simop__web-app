import { COMMON_PROPS } from '../consts/commonProps.const'
import { InspectorObraModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'

export const InspectorObraProps = defineProps<InspectorObraModel.Entity>({
  obra: createRefProp({
    metaModelKey: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  inspector: createRefProp({
    metaModelKey: 'inspector',
    config: {
      field: {
        required: true,
      },
    },
  }),
  tipoInspector: createRefProp({
    metaModelKey: 'tipoInspector',
  }),
  tipoProfesion: createRefProp({
    metaModelKey: 'tipoProfesion',
  }),
  vigencia: createBooleanProp({
    title: 'Vigencia',
    config: {
      falseText: 'No Vigente',
      trueText: 'Vigente',
    },
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  ...COMMON_PROPS,
})
