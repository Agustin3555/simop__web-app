import { COMMON_PROPS } from '../consts/commonProps.const'
import { InspectorObraModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'

export const InspectorObraProps = defineProps<InspectorObraModel.Entity>({
  obra: createRefProp({
    metaModelRef: 'obra',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  inspector: createRefProp({
    metaModelRef: 'inspector',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  tipoInspector: createRefProp({
    metaModelRef: 'tipoInspector',
  }),
  tipoProfesion: createRefProp({
    metaModelRef: 'tipoProfesion',
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
