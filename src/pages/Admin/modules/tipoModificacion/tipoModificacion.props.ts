import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoModificacionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoModificacionProps =
  defineProps<TipoModificacionModel.Entity>(TIPO_PROPS)
