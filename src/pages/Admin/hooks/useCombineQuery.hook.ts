import { useCallback } from 'react'
import { UseEntitiesResult } from './useEntities.hook'

type CombinedStatus = 'pending' | 'success' | 'error'

// Extrae el tipo del data de cada query
type ExtractEntity<T> = T extends UseEntitiesResult<() => Promise<infer R>>
  ? R
  : never

export const useCombinedQuery = <
  T extends UseEntitiesResult<() => Promise<any>>[],
>(
  ...queries: [...T]
) => {
  const allData = queries.map(q => q.query.data) as {
    [K in keyof T]: ExtractEntity<T[K]>
  }

  const data = allData.some(d => d === undefined)
    ? undefined
    : (allData as {
        [K in keyof T]: ExtractEntity<T[K]>
      })

  const isFetching = queries.some(q => q.query.isFetching)

  const status: CombinedStatus = queries.some(q => q.query.status === 'error')
    ? 'error'
    : queries.every(q => q.query.status === 'success')
    ? 'success'
    : 'pending'

  const refetch = useCallback(
    () => Promise.all(queries.map(q => q.query.refetch())),
    [],
  )

  const enableQuery = useCallback(
    () => queries.forEach(q => q.enableQuery()),
    [],
  )

  return { data, status, isFetching, refetch, enableQuery }
}
