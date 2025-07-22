import { useCallback, useState } from 'react'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { Service } from '@/services/config'

type AnyFn = (...args: any[]) => Promise<any>

export const useEntities = <F extends AnyFn>(
  queryKey: string[],
  queryFn: F,
) => {
  const [enabled, setEnabled] = useState(false)

  const enableQuery = useCallback(() => {
    !enabled && setEnabled(true)
  }, [enabled])

  const query = useQuery({
    queryKey,
    queryFn,
    retry: false,
    enabled,
  }) as UseQueryResult<Awaited<ReturnType<F>>, Error>

  return { query, enableQuery }
}

export type UseEntitiesResult<T extends AnyFn> = ReturnType<
  typeof useEntities<T>
>

export type UseEntitiesData<T = Service['getAll']> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : never
