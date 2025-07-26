import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoProfesionModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoProfesionProps =
  defineProps<TipoProfesionModel.Entity>(TIPO_PROPS)
