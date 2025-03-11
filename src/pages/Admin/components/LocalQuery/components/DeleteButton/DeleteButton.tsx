import { useCallback } from 'react'
import { useMutationActionState } from '@/hooks'
import {
  UseEntitiesData,
  useRowSelection,
  useScheme,
} from '@/pages/Admin/hooks'
import { useAppStore } from '@/store/config'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SecureHoldButton } from '../../..'

const DeleteButton = () => {
  const { scheme } = useScheme()
  const { key, service } = scheme

  const toasting = useAppStore(store => store.toasting)
  const { selectedRowIds, deselectRows } = useRowSelection()
  const queryClient = useQueryClient()

  const mutationFn = useCallback(
    async () => await service.deleteMany(selectedRowIds),
    [selectedRowIds],
  )

  const onSuccess = useCallback(() => {
    queryClient.setQueryData<UseEntitiesData>([key], oldData =>
      oldData?.filter(({ id }) => !selectedRowIds.includes(id)),
    )

    toasting('success', 'Eliminado con éxito')
    deselectRows()
  }, [selectedRowIds])

  const { status, isPending, mutate } = useMutation({ mutationFn, onSuccess })
  const actionState = useMutationActionState({ status, isPending })

  return (
    <SecureHoldButton
      text="Eliminar"
      title="Eliminar seleccionados"
      faIcon="fa-solid fa-trash"
      type="secondary"
      handleAction={mutate}
      {...{ actionState }}
    />
  )
}

export default DeleteButton
