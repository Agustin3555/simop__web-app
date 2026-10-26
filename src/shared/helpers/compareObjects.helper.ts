export const compareObjects = (
  first: unknown,
  second: unknown,
  orderedArrayKeys: readonly string[] = [],
): boolean => {
  const orderedKeys = new Set(orderedArrayKeys)

  const compare = (left: unknown, right: unknown, key?: string): boolean => {
    if (Object.is(left, right)) return true

    if (typeof left !== 'object' || left === null) return false
    if (typeof right !== 'object' || right === null) return false

    if (Array.isArray(left) || Array.isArray(right)) {
      if (!Array.isArray(left) || !Array.isArray(right)) return false
      if (left.length !== right.length) return false

      if (orderedKeys.has(key ?? '')) {
        return left.every((item, index) => compare(item, right[index], key))
      }

      if (left.every((item, index) => compare(item, right[index], key)))
        return true

      const matched = new Array(right.length).fill(false)

      return left.every(item => {
        const matchIndex = right.findIndex(
          (candidate, index) =>
            !matched[index] && compare(item, candidate, key),
        )

        if (matchIndex === -1) return false
        matched[matchIndex] = true
        return true
      })
    }

    const leftKeys = Object.keys(left)
    const rightKeys = Object.keys(right)

    if (leftKeys.length !== rightKeys.length) return false

    return leftKeys.every(
      childKey =>
        Object.prototype.hasOwnProperty.call(right, childKey) &&
        compare(
          (left as Record<string, unknown>)[childKey],
          (right as Record<string, unknown>)[childKey],
          childKey,
        ),
    )
  }

  return compare(first, second)
}
