export const buildPath =
  (collection: string) =>
  (...args: (string | number)[]) =>
    '/' + [collection, args].join('/')
