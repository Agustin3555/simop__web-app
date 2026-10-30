import { useCallback, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TABLE_DEFS } from '@/pages/Admin/constants/metaModelDefinitions.const'
import { TableKey } from '@/pages/Admin/constants/metaModelKey.const'

export const useRefs = (tableKey: TableKey) => {
  const {
    services: { getRefs },
  } = useMemo(() => TABLE_DEFS[tableKey], [tableKey])

  const query = useQuery({
    queryKey: [tableKey, 'refs'],
    queryFn: async () => await getRefs(),
    retry: false,
    enabled: false,
  })

  const { refetch: queryRefetch } = query
  const refetch = useCallback(() => queryRefetch(), [queryRefetch])

  return { query, refetch }
}
