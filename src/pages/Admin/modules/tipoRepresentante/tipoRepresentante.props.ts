import { TIPO_PROPS } from '../consts/commonProps.const'
import { TipoRepresentanteModel } from '.'
import { defineProps } from '../../meta/metaModel'

export const TipoRepresentanteProps =
  defineProps<TipoRepresentanteModel.Entity>(TIPO_PROPS)
