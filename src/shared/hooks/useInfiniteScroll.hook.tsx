import { useEffect, useRef, useState } from 'react'

const ITEMS_PER_LOAD = 20
const OBSERVER_ROOT_MARGIN = '500px'

export const useInfiniteScroll = <
  T,
  Container extends HTMLElement = HTMLElement,
>(
  items: T[],
) => {
  const containerRef = useRef<Container>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const [pagination, setPagination] = useState<{
    items: T[]
    count: number
  }>({ items: [], count: ITEMS_PER_LOAD })

  const visibleItemsCount =
    pagination.items === items ? pagination.count : ITEMS_PER_LOAD

  useEffect(() => {
    const root = containerRef.current
    const sentinel = sentinelRef.current

    if (
      !root ||
      !sentinel ||
      visibleItemsCount >= items.length ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPagination(current => {
            const currentCount =
              current.items === items ? current.count : ITEMS_PER_LOAD

            return {
              items,
              count: Math.min(currentCount + ITEMS_PER_LOAD, items.length),
            }
          })
        }
      },
      { root, rootMargin: OBSERVER_ROOT_MARGIN },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [items, visibleItemsCount])

  const visibleItems = items.slice(0, visibleItemsCount)

  const loadMoreTrigger =
    visibleItemsCount < items.length ? (
      <div ref={sentinelRef} style={{ minHeight: 1 }} aria-hidden="true" />
    ) : null

  return { containerRef, visibleItems, loadMoreTrigger }
}
