import { useEntities } from './useEntities.hook'

type CombinedStatus = 'pending' | 'success' | 'error'

export const useCombinedQuery = (
  ...queries: NonNullable<ReturnType<typeof useEntities>>[]
) => {
  const allData = queries.map(q => q.query.data)
  const data = allData.some(d => d === undefined) ? undefined : allData

  const isFetching = queries.some(q => q.query.isFetching)

  const status: CombinedStatus = queries.some(q => q.query.status === 'error')
    ? 'error'
    : queries.every(q => q.query.status === 'success')
    ? 'success'
    : 'pending'

  const refetch = () => Promise.all(queries.map(q => q.query.refetch()))

  const enableQuery = () => queries.forEach(q => q.enableQuery?.())

  return {
    data,
    status,
    isFetching,
    refetch,
    enableQuery,
  }
}
