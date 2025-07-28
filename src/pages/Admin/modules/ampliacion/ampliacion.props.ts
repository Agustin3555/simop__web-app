import { AmpliacionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'
import { COMMON_PROPS } from '../consts/commonProps.const'

export const AmpliacionProps = defineProps<AmpliacionModel.Entity>({
  obra: createRefProp({
    metaModelRef: 'obra',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número De Ampliación',
    config: {
      field: {
        required: true,
      },
    },
  }),
  numeroResolucion: createTextProp({
    title: 'Número De Resolución',
  }),
  numeroExpedienteSolicitud: createTextProp({
    title: 'Número de Expediente de Solicitud',
  }),
  plazoMesesSolicitado: createNumberProp({
    title: 'Plazo de Meses Solicitado',
  }),
  plazoMesesOtorgado: createNumberProp({
    title: 'Plazo de Meses Otorgado',
  }),
  nuevaFechaFinObra: createDateProp({
    title: 'Nueva Fecha Fin De Obra',
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  observaciones: createTextProp({
    title: 'Observaciones',
    config: {
      isLong: true,
    },
  }),
  area: createRefProp({
    metaModelRef: 'area',
  }),
  ...COMMON_PROPS,
})
