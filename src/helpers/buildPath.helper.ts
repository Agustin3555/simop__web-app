export const buildPath =
  (collection: string) =>
  (...args: (string | number)[]) =>
    ['', collection, ...args].join('/')

export const sendFields = (fields?: string[]) =>
  fields ? `?fields=${fields.join(',')}` : ''
