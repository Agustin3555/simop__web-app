export const select = <T>(source: T[], mode: 'only' | 'except', targets: T[]) =>
  source.filter(key =>
    mode === 'only' ? targets.includes(key) : !targets.includes(key),
  )
