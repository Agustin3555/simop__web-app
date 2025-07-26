import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoFinanciamientoObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoFinanciamientoObraProps =
  defineProps<TipoFinanciamientoObraModel.Entity>(TIPO_PROPS)
