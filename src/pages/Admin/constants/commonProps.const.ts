import {
  createDateProp,
  createNumberProp,
  createTextProp,
  PropFactory,
} from '../meta'

type ScalarProps<T> = Record<keyof T, PropFactory>

export interface CommonFields {
  id: unknown
  creado: unknown
  modificado: unknown
}

export const COMMON_PROPS: ScalarProps<CommonFields> = {
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

interface TipoFields extends CommonFields {
  nombre: unknown
}

export const TIPO_PROPS: ScalarProps<TipoFields> = {
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
