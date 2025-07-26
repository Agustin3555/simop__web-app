import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoContratacionObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoContratacionObraProps =
  defineProps<TipoContratacionObraModel.Entity>(TIPO_PROPS)
