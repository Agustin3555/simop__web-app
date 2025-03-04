import { useQuery } from '@tanstack/react-query'
import { Scheme } from '../services/config'

export const useEntities = ({ key, service }: Scheme) => {
  const entitiesQuery = useQuery({
    queryKey: [key],
    queryFn: service.getAll,
    enabled: false,
  })

  return entitiesQuery
}
