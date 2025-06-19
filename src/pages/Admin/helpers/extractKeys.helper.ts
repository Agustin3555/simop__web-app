export const extractKeys = <T extends object | undefined>(value: T | T[]) => {
  if (!Array.isArray(value)) {
    if (value === undefined) return
    return Object.keys(value)
  }

  if (!value?.length) return

  const firstValid = value.find(item => item !== undefined)

  if (!firstValid) return

  return Object.keys(firstValid)
}
