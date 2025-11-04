export const baseSorter = <T>(
  search: string,
  options: T[],
  accessorFn?: (option: T) => undefined | number | string,
) => {
  if (!search) return options

  return options.toSorted((optionA, optionB) => {
    const valA = accessorFn ? accessorFn(optionA) : optionA
    const valB = accessorFn ? accessorFn(optionB) : optionB

    const isAUndefined = valA === undefined
    const isBUndefined = valB === undefined

    // Los undefined siempre al final
    if (isAUndefined && !isBUndefined) return 1
    if (isBUndefined && !isAUndefined) return -1
    if (isAUndefined && isBUndefined) return 0

    const a = String(valA).toLowerCase()
    const b = String(valB).toLowerCase()

    if (a === search && b !== search) return -1
    if (b === search && a !== search) return 1

    if (a.startsWith(search) && !b.startsWith(search)) return -1
    if (b.startsWith(search) && !a.startsWith(search)) return 1

    if (a.includes(search) && !b.includes(search)) return -1
    if (b.includes(search) && !a.includes(search)) return 1

    return 0
  })
}
