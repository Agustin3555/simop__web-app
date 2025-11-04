import { COMMON_PROPS } from '../consts/commonProps.const'
import { ParalizacionModel } from '.'
import { createDateProp } from '../../meta/date'
import { defineProps } from '../../meta/metaModel'
import { createNumberProp } from '../../meta/number'
import { createRefProp } from '../../meta/ref'
import { createTextProp } from '../../meta/text'

export const ParalizacionProps = defineProps<ParalizacionModel.Entity>({
  obra: createRefProp({
    metaModelRef: 'obra',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  numero: createNumberProp({
    title: 'Número de Paralización',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  numeroExpediente: createTextProp({
    title: 'Número De Expediente',
    config: {
      field: {
        isRequired: true,
      },
    },
  }),
  fechaReinicio: createDateProp({
    title: 'Fecha Reinicio',
  }),
  nuevaFechaFinObra: createDateProp({
    title: 'Nueva Fecha Fin de Obra',
  }),
  fecha: createDateProp({
    title: 'Fecha',
  }),
  tipoParalizacion: createRefProp({
    metaModelRef: 'tipoParalizacion',
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
