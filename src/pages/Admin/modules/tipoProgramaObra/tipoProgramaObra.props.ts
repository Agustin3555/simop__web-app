import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoProgramaObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoProgramaObraProps =
  defineProps<TipoProgramaObraModel.Entity>(TIPO_PROPS)
