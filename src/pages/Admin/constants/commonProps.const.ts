import { DateTimeProp, NumberProp, PropScheme } from '../services/config'

type CommonFields = keyof {
  id: unknown
  creado: unknown
  modificado: unknown
}

export const COMMON_PROPS: Record<CommonFields, PropScheme<CommonFields>> = {
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
