// v2

const toKebab = (str: string) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

type ClassMap = Record<string, boolean>

export const clsx = (...classes: (undefined | string | ClassMap)[]) =>
  classes
    .filter(Boolean)
    .map(item => {
      if (typeof item === 'string') return item

      return Object.entries(item as ClassMap)
        .filter(([, value]) => value)
        .map(([key]) => toKebab(key))
        .join(' ')
    })
    .join(' ')
