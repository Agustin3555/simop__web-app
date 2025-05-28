import { DateTimeProp } from '../meta/dateTime'
import { NumberProp } from '../meta/number'
import { TextProp } from '../meta/text'
import { PropScheme } from '../meta/utils'

type ScalarProps<T> = Record<keyof T, PropScheme>

export interface CommonFields {
  id: unknown
  creado: unknown
  modificado: unknown
}

export const COMMON_PROPS: ScalarProps<CommonFields> = {
  id: new NumberProp('ID', {
    field: {
      hidden: true,
    },
  }),
  creado: new DateTimeProp('Creación del recurso', {
    field: {
      hidden: true,
    },
  }),
  modificado: new DateTimeProp('Modificación del recurso', {
    field: {
      hidden: true,
    },
  }),
}

interface TipoFields extends CommonFields {
  nombre: unknown
}

export const TIPO_PROPS: ScalarProps<TipoFields> = {
  nombre: new TextProp('Nombre', {
    field: {
      required: true,
    },
  }),
  ...COMMON_PROPS,
}
