import './LocalEdit.css'
import { FormEventHandler, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/config'
import { useMutationActionState } from '@/hooks'
import {
  useEntities,
  useMetaModel,
  useLocalView,
  UseEntitiesData,
  useTable,
} from '../../hooks'
import { Button } from '@/components'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Method } from '@/services/config'
import { Form } from '..'

const LocalEdit = () => {
  const metaModel = useMetaModel()
  const { key, service, title, anchorField, getPropGroups } = metaModel
  const queryClient = useQueryClient()
  const toasting = useAppStore(store => store.toasting)
  const { setLocalView } = useLocalView()
  const { selectedRowIds, deselectRows } = useTable().states

  const { query } = useEntities([key], service.getAll)
  const { data } = query

  const isEditing = selectedRowIds.length === 1

  const selectedEntity = useMemo(
    () => data?.find(entity => entity.id === selectedRowIds[0]),
    [data, selectedRowIds],
  )

  const editPropGroups = useMemo(() => getPropGroups(Method.UpdateOne), [])

  const fieldGroups = useMemo(() => {
    if (!isEditing) return

    return editPropGroups?.map(({ props, ...rest }) => ({
      fields: props.map(({ key, getFormField: getFieldComponent }) =>
        getFieldComponent(selectedEntity![key], true),
      ),
      ...rest,
    }))
  }, [isEditing, selectedEntity])

  const mutationFn = useCallback(
    async (form: HTMLFormElement) => {
      const id = selectedRowIds[0]
      const formData = new FormData(form)

      const updateData: Record<string, unknown> = {}

      editPropGroups?.forEach(({ props }) =>
        Object.values(props).forEach(
          ({ key, verboseKey, getFormFieldValue: getFieldValue }) => {
            const value = getFieldValue(formData, form, true)

            if (value !== undefined) updateData[verboseKey || key] = value
          },
        ),
      )

      const editEntity = await service.updateOne!(id, updateData)

      queryClient.setQueryData<UseEntitiesData>([key], oldData => {
        if (!oldData) return

        const index = oldData.findIndex(item => item.id === id)
        if (index === -1) return

        const newData = [...oldData]
        newData[index] = editEntity
        return newData
      })
    },
    [selectedRowIds],
  )

  const { status, isPending, mutate } = useMutation({
    mutationFn,
    onSuccess: () => {
      toasting('success', 'Cambios aplicados con éxito')
      deselectRows()
    },
  })

  const actionState = useMutationActionState({ status, isPending })

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    mutate(event.currentTarget)
  }

  const handleClick = useCallback(() => setLocalView('query'), [])

  return (
    <div className="cmp-local-edit">
      {isEditing ? (
        <>
          <h2>
            Editando:
            <strong className="button-look s">
              {selectedEntity![anchorField]}
            </strong>
          </h2>
          <Form {...{ actionState, handleSubmit, fieldGroups }} />
        </>
      ) : (
        <div className="banner-container">
          <div className="banner">
            <p className="text">
              Seleccione un/a <strong>{title.singular}</strong> a editar en
            </p>
            <Button
              text="Consultar"
              faIcon="fa-solid fa-search"
              size="m"
              type="secondary"
              inverted
              onAction={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LocalEdit
