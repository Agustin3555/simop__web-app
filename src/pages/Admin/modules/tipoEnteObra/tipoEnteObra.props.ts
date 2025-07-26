import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoEnteObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoEnteObraProps =
  defineProps<TipoEnteObraModel.Entity>(TIPO_PROPS)
