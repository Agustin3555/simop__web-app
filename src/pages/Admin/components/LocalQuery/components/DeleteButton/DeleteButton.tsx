import { useCallback } from 'react'
import { useMutationActionState } from '@/hooks'
import { useConfigModule, useMetaModel, useTable } from '@/pages/Admin/hooks'
import { useAppStore } from '@/store/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LooseEntity } from '@/models/config'
import { Button } from '@/components'
import { buildConfigKey } from '@/pages/Admin/helpers'

const DeleteButton = () => {
  const toasting = useAppStore(store => store.toasting)
  const { key, service } = useMetaModel()
  const { selectedRowIds, deselectRows } = useTable().states
  const queryClient = useQueryClient()
  const { selectedConfig } = useConfigModule()

  const mutationFn = useCallback(
    async () => await service.deleteMany(selectedRowIds),
    [selectedRowIds],
  )

  const onSuccess = useCallback(() => {
    queryClient.setQueryData<LooseEntity[]>(
      buildConfigKey(key, selectedConfig),
      oldData => oldData?.filter(({ id }) => !selectedRowIds.includes(id)),
    )

    toasting('success', 'Eliminado con éxito')
    deselectRows()
  }, [selectedRowIds])

  const { status, isPending, mutate } = useMutation({ mutationFn, onSuccess })
  const actionState = useMutationActionState({ status, isPending })

  return (
    <Button
      text="Eliminar"
      title="Eliminar seleccionados"
      faIcon="fa-solid fa-trash"
      type="secondary"
      hold
      onAction={() => mutate()}
      {...{ actionState }}
    />
  )
}

export default DeleteButton
