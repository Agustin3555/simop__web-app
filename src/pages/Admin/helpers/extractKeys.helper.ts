export const extractKeys = <T>(values: T[] | T[][]) => {
  if (!values?.length) return

  const firstValid = Array.isArray(values[0])
    ? values.flat().find(item => item !== undefined)
    : values.find(item => item !== undefined)

  if (!firstValid) return

  return Object.keys(firstValid)
}
