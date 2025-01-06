import {
  DateTimeProp,
  NumberProp,
  PropScheme,
  TextProp,
} from '../services/config'

type ScalarProps<T> = Record<keyof T, PropScheme<keyof T>>

interface CommonFields {
  id: unknown
  creado: unknown
  modificado: unknown
}

export const COMMON_PROPS: ScalarProps<CommonFields> = {
  id: new NumberProp('id', 'ID', {
    field: {
      hidden: true,
    },
  }),
  creado: new DateTimeProp('creado', 'Creación del recurso', {
    field: {
      hidden: true,
    },
  }),
  modificado: new DateTimeProp('modificado', 'Modificación del recurso', {
    field: {
      hidden: true,
    },
  }),
}

interface TipoFields extends CommonFields {
  nombre: unknown
}

export const TIPO_PROPS: ScalarProps<TipoFields> = {
  ...COMMON_PROPS,
  nombre: new TextProp('nombre', 'Nombre', {
    field: {
      required: true,
    },
  }),
}
