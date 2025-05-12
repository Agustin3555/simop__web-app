import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Service } from '@/services/config'

export const useEntities = (queryKey: string[], queryFn: Service['getAll']) => {
  const [enabled, setEnabled] = useState(false)

  const enableQuery = useCallback(() => {
    !enabled && setEnabled(true)
  }, [enabled])

  const query = useQuery({
    queryKey,
    queryFn,
    retry: false,
    enabled,
  })

  return { query, enableQuery }
}

export type UseEntitiesData = NonNullable<
  ReturnType<typeof useEntities>['query']['data']
>
