import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoNivelAreaModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoNivelAreaProps =
  defineProps<TipoNivelAreaModel.Entity>(TIPO_PROPS)
