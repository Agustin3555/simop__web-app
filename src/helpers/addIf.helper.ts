export const addIf = <T>(items: (T | boolean)[]) => items.filter(Boolean) as T[]

export const addIfExist = <T>(items: (T | '' | null)[]) =>
  items.filter(Boolean) as T[]
