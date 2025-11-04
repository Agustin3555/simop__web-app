import { COMMON_PROPS } from '../consts/commonProps.const'
import { RepresentanteObraModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'

export const RepresentanteObraProps =
  defineProps<RepresentanteObraModel.Entity>({
    obra: createRefProp({
      metaModelRef: 'obra',
      config: {
        field: {
          isRequired: true,
        },
      },
    }),
    representante: createRefProp({
      metaModelRef: 'representante',
    }),
    tipoRepresentante: createRefProp({
      metaModelRef: 'tipoRepresentante',
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
