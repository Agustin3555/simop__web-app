export const convert = <T extends Record<string, any>, R>(
  input: T,
  transform?: (acc: T) => Partial<R>,
) => {
  const transformed = transform ? transform(input) : {}
  const transformedKeys = new Set(Object.keys(transformed))

  return Object.keys(input).reduce(
    (acc, key) => {
      if (!transformedKeys.has(key)) acc[key as keyof R] = input[key]

      return acc
    },
    { ...transformed } as T & R,
  )
}

export const convertList = <T extends Record<string, any>, R>(
  input: T[],
  transform?: (acc: T) => Partial<R>,
) => input.map(item => convert(item, transform))
