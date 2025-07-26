import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoEstadoObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoEstadoObraProps =
  defineProps<TipoEstadoObraModel.Entity>(TIPO_PROPS)
