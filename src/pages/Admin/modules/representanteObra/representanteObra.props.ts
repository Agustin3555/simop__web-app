import { COMMON_PROPS } from '../consts/commonProps.const'
import { RepresentanteObraModel } from '.'
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
    fecha: createDateProp({
      title: 'Fecha',
    }),
    ...COMMON_PROPS,
  })
