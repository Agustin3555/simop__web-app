import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoTematicaObraModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoTematicaObraProps =
  defineProps<TipoTematicaObraModel.Entity>(TIPO_PROPS)
