export const baseSorter = <T>(
  search: string,
  options: T[],
  accessorFn?: (option: T) => number | string,
) => {
  // Si la búsqueda está vacía, no modifica el orden
  if (!search) return options

  return options.toSorted((optionA, optionB) => {
    const a = String(accessorFn ? accessorFn(optionA) : optionA).toLowerCase()
    const b = String(accessorFn ? accessorFn(optionB) : optionB).toLowerCase()

    if (a === search && b !== search) return -1
    if (b === search && a !== search) return 1

    if (a.startsWith(search) && !b.startsWith(search)) return -1
    if (b.startsWith(search) && !a.startsWith(search)) return 1

    if (a.includes(search) && !b.includes(search)) return -1
    if (b.includes(search) && !a.includes(search)) return 1

    return 0
  })
}
