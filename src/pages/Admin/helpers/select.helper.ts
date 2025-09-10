export const select = <T>(source: T[], mode: 'only' | 'except', targets: T[]) =>
  source.filter(k =>
    mode === 'only' ? targets.includes(k) : !targets.includes(k),
  )
