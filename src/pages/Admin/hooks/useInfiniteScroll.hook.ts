import { UIEventHandler, useCallback, useEffect, useState } from 'react'

export const useInfiniteScroll = (
  itemsLength: number,
  offset = 600,
  initCount = 20,
) => {
  const [visibleCount, setVisibleCount] = useState(initCount)

  const hasMore = visibleCount < itemsLength

  const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>(
    e => {
      if (!hasMore) return

      const { scrollTop, clientHeight, scrollHeight } =
        e.target as HTMLDivElement

      if (scrollHeight - scrollTop - clientHeight <= offset)
        setVisibleCount(prev => Math.min(prev + 10, itemsLength))
    },
    [hasMore, offset, itemsLength],
  )

  useEffect(() => {
    if (visibleCount !== initCount) setVisibleCount(initCount)
  }, [itemsLength, initCount])

  return { visibleCount, handleScroll }
}
