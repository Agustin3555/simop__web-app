import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoParalizacionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoParalizacionProps =
  defineProps<TipoParalizacionModel.Entity>(TIPO_PROPS)
