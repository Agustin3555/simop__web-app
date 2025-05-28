import { RefreshRate } from '../meta'

const minToMs = (minutes: number) => 1000 * 60 * minutes

export const REFETCH_INTERVALS: Record<RefreshRate, number> = {
  high: minToMs(2),
  medium: minToMs(10),
  low: minToMs(60),
}
