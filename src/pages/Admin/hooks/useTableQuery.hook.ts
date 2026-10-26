import { useTableDef } from './useTableDef.hook'
import { useConfigs } from '@/shared/contexts/Configs/useConfigs.hook'
import { useAppStore } from '@/store/config'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { LooseEntity } from '@/infra/http/entity.types'
import { ServiceData } from '@/infra/http/service.type'

// TODO: que si dado el TableDef de Obra, pueda identificar los retornos

export const useTableQuery = () => {
  const toasting = useAppStore(s => s.toasting)
  const getSelectedConfig = useConfigs(s => s.getSelectedConfig)

  const {
    tableDef: { key, services },
  } = useTableDef()

  const {
    states: { columnFetch },
  } = getSelectedConfig()

  const queryKey = [key]

  const query = useQuery({
    queryKey,
    queryFn: async () => await services.getAll(columnFetch),
    retry: false,
    enabled: false,
    gcTime: 0,
  })

  const queryClient = useQueryClient()

  const refetch = () => query.refetch()

  const resetQuery = () => queryClient.resetQueries({ queryKey, exact: true })

  const createItem = async (data: ServiceData) => {
    const newItem = await services.create(data, columnFetch)

    queryClient.setQueryData<LooseEntity[]>(
      queryKey,
      prev => {
        if (prev) return [newItem, ...prev]
      },
      {},
    )

    toasting('success', 'Agregado con éxito')
  }

  const updateItem = async (id: number, data: ServiceData) => {
    const updatedItem = await services.updateOne(id, data, columnFetch)

    queryClient.setQueryData<LooseEntity[]>(queryKey, prev =>
      prev?.map(item => (item.id === id ? updatedItem : item)),
    )

    toasting('success', 'Cambios aplicados con éxito')
  }

  const deleteManyItems = async (ids: number[]) => {
    await services.deleteMany(ids)

    const deletedIds = new Set(ids)
    queryClient.setQueryData<LooseEntity[]>(queryKey, prev =>
      prev?.filter(item => !deletedIds.has(item.id)),
    )

    const pluralLetter = ids.length === 1 ? '' : 's'

    toasting(
      'success',
      `${ids.length} registro${pluralLetter} eliminado${pluralLetter} con éxito`,
    )
  }

  return { query, refetch, resetQuery, createItem, updateItem, deleteManyItems }
}
