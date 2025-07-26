import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoRecepcionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoRecepcionProps =
  defineProps<TipoRecepcionModel.Entity>(TIPO_PROPS)
