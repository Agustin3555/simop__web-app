import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoRedeterminacionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoRedeterminacionProps =
  defineProps<TipoRedeterminacionModel.Entity>(TIPO_PROPS)
