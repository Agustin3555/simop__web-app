import './LocalEdit.css'
import { FormEventHandler, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/config'
import { useMutationActionState } from '@/hooks'
import {
  useEntities,
  useRowSelection,
  useMetaModel,
  useLocalView,
} from '../../hooks'
import { Button } from '@/components'
import { useMutation } from '@tanstack/react-query'
import { Method } from '@/services/config'

const LocalEdit = () => {
  const metaModel = useMetaModel()
  const { key, service, title, anchorField, getPropGroups } = metaModel

  const toasting = useAppStore(store => store.toasting)
  const { setLocalView } = useLocalView()
  const { selectedRowIds, deselectRows } = useRowSelection()

  const { query } = useEntities([key], service.getAll)
  const { data, refetch } = query

  const isEditing = useMemo(
    () => selectedRowIds.length === 1,
    [selectedRowIds.length],
  )

  const selectedEntity = useMemo(
    () => data?.find(entity => entity.id === selectedRowIds[0]),
    [data, selectedRowIds],
  )

  const editPropGroups = useMemo(() => getPropGroups(Method.UpdateOne), [])

  const componentGroups = useMemo(() => {
    if (!isEditing) return

    return editPropGroups?.map(({ props, ...rest }) => ({
      fields: props.map(({ key, getFieldComponent }) =>
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
        Object.values(props).forEach(({ key, verboseKey, getFieldValue }) => {
          const value = getFieldValue(formData, form, true)

          if (value !== undefined) updateData[verboseKey || key] = value
        }),
      )

      await service.updateOne!(id, updateData)
      await refetch()
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
          <form onSubmit={handleSubmit}>
            <div className="field-groups">
              {componentGroups?.map(({ key, title, fields }) => (
                <div key={key} className="group">
                  {title && <small>{title}</small>}
                  <div className="fields">{fields}</div>
                </div>
              ))}
            </div>
            <div className="actions">
              <Button
                text="Confirmar"
                faIcon="fa-solid fa-check"
                submit
                {...{ actionState }}
              />
            </div>
          </form>
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
