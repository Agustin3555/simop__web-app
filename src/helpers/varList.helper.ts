import { CSSProperties } from 'react'

type Vars = Record<string, string | number>

export const varList = (variables: Vars) =>
  Object.entries(variables).reduce<Vars>((acc, [key, value]) => {
    acc[`--${key}`] = value
    return acc
  }, {}) as CSSProperties
