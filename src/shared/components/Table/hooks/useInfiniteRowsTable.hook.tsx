import { useEffect, useRef, useState } from 'react'

const ROWS_PER_LOAD = 20
const OBSERVER_ROOT_MARGIN = '500px'

export const useInfiniteRows = <T,>(rows: T[]) => {
  const containerRef = useRef<HTMLOListElement>(null)
  const sentinelRef = useRef<HTMLLIElement>(null)

  const [pagination, setPagination] = useState<{
    rows: T[]
    count: number
  }>({ rows: [], count: ROWS_PER_LOAD })

  const visibleRowsCount =
    pagination.rows === rows ? pagination.count : ROWS_PER_LOAD

  useEffect(() => {
    const root = containerRef.current
    const sentinel = sentinelRef.current

    if (
      !root ||
      !sentinel ||
      visibleRowsCount >= rows.length ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPagination(current => {
            const currentCount =
              current.rows === rows ? current.count : ROWS_PER_LOAD

            return {
              rows,
              count: Math.min(currentCount + ROWS_PER_LOAD, rows.length),
            }
          })
        }
      },
      { root, rootMargin: OBSERVER_ROOT_MARGIN },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [rows, visibleRowsCount])

  return {
    containerRef,
    visibleRows: rows.slice(0, visibleRowsCount),
    loadMoreTrigger:
      visibleRowsCount < rows.length ? (
        <li ref={sentinelRef} aria-hidden="true" />
      ) : null,
  }
}
