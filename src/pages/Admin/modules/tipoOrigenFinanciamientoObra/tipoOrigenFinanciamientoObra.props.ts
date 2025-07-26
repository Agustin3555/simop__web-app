import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoOrigenFinanciamientoObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoOrigenFinanciamientoObraProps =
  defineProps<TipoOrigenFinanciamientoObraModel.Entity>(TIPO_PROPS)
