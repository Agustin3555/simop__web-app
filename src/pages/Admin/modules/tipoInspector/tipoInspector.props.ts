import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoInspectorModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoInspectorProps =
  defineProps<TipoInspectorModel.Entity>(TIPO_PROPS)
