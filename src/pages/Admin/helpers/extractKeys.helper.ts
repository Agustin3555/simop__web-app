export const extractKeys = <T>(array?: T[]) => {
  if (!array?.length) return

  const firstValid = array.find(item => item !== undefined)

  if (!firstValid) return

  return Object.keys(firstValid)
}
