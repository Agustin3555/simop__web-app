import { createDateProp } from '../../meta/date'
import { createNumberProp } from '../../meta/number'
import { createTextProp } from '../../meta/text'

export const COMMON_PROPS = {
  id: createNumberProp({
    title: 'ID',
    config: {
      field: {
        hidden: true,
      },
    },
  }),
  creado: createDateProp({
    title: 'Creación del recurso',
    config: {
      withTime: true,
      field: {
        hidden: true,
      },
    },
  }),
  modificado: createDateProp({
    title: 'Modificación del recurso',
    config: {
      withTime: true,
      field: {
        hidden: true,
      },
    },
  }),
}

export const TIPO_PROPS = {
  nombre: createTextProp({
    title: 'Nombre',
    config: {
      field: {
        required: true,
      },
    },
  }),
  ...COMMON_PROPS,
}
