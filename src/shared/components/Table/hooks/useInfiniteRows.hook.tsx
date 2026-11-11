import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll.hook'

export const useInfiniteRows = <T,>(rows: T[]) => {
  const {
    containerRef,
    visibleItems: visibleRows,
    loadMoreTrigger,
  } = useInfiniteScroll<T, HTMLElement>(rows)

  return { containerRef, visibleRows, loadMoreTrigger }
}
