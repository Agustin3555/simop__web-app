import { select } from '../helpers'
import { COMMON_PROPS } from '../modules/consts/commonProps.const'

export const omitBaseEntity = <T>(source: T[]) => {
  const targets: (keyof typeof COMMON_PROPS)[] = ['id', 'creado', 'modificado']

  return select(source, 'except', targets as T[])
}
