const STEP = 2 * 16

export const steppedSizes = (min: number, size: number) => {
  const lower = Math.floor((size - min) / STEP) * STEP + min
  const upper = lower + STEP

  return size - lower < upper - size ? lower : upper
}
