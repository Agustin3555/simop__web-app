import { useCallback, useState } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'

type AnyFn = (...args: any[]) => Promise<any>

export const useLazyQuery = <F extends AnyFn>(
  queryKey: (number | string)[],
  queryFn: F,
) => {
  const [enabled, setEnabled] = useState(false)

  const query = useQuery({
    queryKey,
    queryFn,
    enabled,
    retry: false,
    gcTime: 0,
  }) as UseQueryResult<Awaited<ReturnType<F>>>

  const { refetch } = query

  const handleClick = useCallback(() => {
    enabled ? refetch() : setEnabled(true)
  }, [enabled, refetch])

  return { query, handleClick }
}
