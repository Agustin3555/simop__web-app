import { COMMON_PROPS } from '../consts/commonProps.const'
import { RepresentanteEmpresaModel } from '.'
import { createBooleanProp } from '../../meta/boolean'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createRefProp } from '../../meta/ref'

export const RepresentanteEmpresaProps =
  defineProps<RepresentanteEmpresaModel.Entity>({
    empresa: createRefProp({
      metaModelRef: 'empresa',
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
