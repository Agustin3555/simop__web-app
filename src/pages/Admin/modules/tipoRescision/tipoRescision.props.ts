import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoRescisionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoRescisionProps =
  defineProps<TipoRescisionModel.Entity>(TIPO_PROPS)
