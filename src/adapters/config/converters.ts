export const convert = <T, K extends keyof T, R>(
  obj: T,
  keys: K[],
  transform: (acc: T) => R,
) => {
  const newObj = { ...obj }

  for (const key of keys) delete newObj[key]

  return { ...newObj, ...(transform ? transform(obj) : {}) } as unknown as Omit<
    T,
    K
  > &
    R
}

export const convertList = <T, K extends keyof T, R>(
  arr: T[],
  keys: K[],
  transform: (acc: T) => R,
) => arr.map(item => convert(item, keys, transform))
