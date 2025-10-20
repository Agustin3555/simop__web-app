export const safe = <T>(fn: () => T): { err?: Error; result?: T } => {
  try {
    const result = fn()
    return { result }
  } catch (err) {
    return { err: err as Error }
  }
}
