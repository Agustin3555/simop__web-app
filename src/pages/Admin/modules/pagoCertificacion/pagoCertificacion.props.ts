import { COMMON_PROPS } from '../consts/commonProps.const'
import { PagoCertificacionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const PagoCertificacionProps =
  defineProps<PagoCertificacionModel.Entity>({
    numero: createNumberProp({
      title: 'Número de Pago',
      config: {
        field: {
          isRequired: true,
        },
      },
    }),
    ordenPago: createTextProp({
      title: 'Orden de pago',
      config: {
        field: {
          isRequired: true,
        },
      },
    }),
    fecha: createDateProp({
      title: 'Fecha de Pago',
    }),
    monto: createNumberProp({
      title: 'Monto orden de pago',
      config: {
        pre: '$',
        isDecimal: true,
        isMoney: true,
        isBig: true,
        calculate: 'sum',
      },
    }),
    fojaMedicion: createRefProp({
      metaModelRef: 'fojaMedicion',
    }),
    redeterminacion: createRefProp({
      metaModelRef: 'redeterminacion',
    }),
    area: createRefProp({
      metaModelRef: 'area',
    }),
    observaciones: createTextProp({
      title: 'Observaciones',
      config: {
        isLong: true,
      },
    }),
    ...COMMON_PROPS,
  })
