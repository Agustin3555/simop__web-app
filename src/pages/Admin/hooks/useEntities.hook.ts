import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Scheme } from '../services/config'

export const useEntities = ({ key, service }: Scheme) => {
  const [enabled, setEnabled] = useState(false)

  const enableQuery = useCallback(() => {
    !enabled && setEnabled(true)
  }, [enabled])

  const query = useQuery({
    queryKey: [key],
    queryFn: service.getAll,
    retry: false,
    enabled,
  })

  return { query, enableQuery }
}

export type UseEntitiesData = NonNullable<
  ReturnType<typeof useEntities>['query']['data']
>
