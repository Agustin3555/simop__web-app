import { select } from '../helpers'
import { CommonFields } from './commonProps.const'

export const omitBaseEntity = <T>(source: T[]) => {
  const targets: (keyof CommonFields)[] = ['id', 'creado', 'modificado']

  return select(source, 'except', targets as T[])
}
