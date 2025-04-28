import './LocalEdit.css'
import { FormEventHandler, useCallback, useMemo } from 'react'
import { useAppStore } from '@/store/config'
import { useMutationActionState } from '@/hooks'
import {
  useEntities,
  useRowSelection,
  useScheme,
  useLocalView,
} from '../../hooks'
import { Button } from '@/components'
import { useMutation } from '@tanstack/react-query'

const LocalEdit = () => {
  const { scheme } = useScheme()
  const { service, title, anchorField, groups } = scheme

  const toasting = useAppStore(store => store.toasting)
  const { setLocalView } = useLocalView()
  const { selectedRowIds, deselectRows } = useRowSelection()

  const { query } = useEntities(scheme)
  const { data, refetch } = query

  const isEditing = useMemo(
    () => selectedRowIds.length === 1,
    [selectedRowIds.length],
  )

  const selectedEntity = useMemo(
    () => data?.find(entity => entity.id === selectedRowIds[0]),
    [data, selectedRowIds],
  )

  const fieldGroups = useMemo(() => {
    if (!isEditing) return

    return groups.map(({ title, props }) => ({
      title,
      fields: Object.entries(props).map(([key, { getFieldComponent }]) =>
        getFieldComponent(selectedEntity![key], true),
      ),
    }))
  }, [isEditing, selectedEntity])

  const mutationFn = useCallback(
    async (form: HTMLFormElement) => {
      const id = selectedRowIds[0]
      const formData = new FormData(form)

      const updateData = groups.reduce((acc, { props }) => {
        Object.values(props).forEach(({ key, verboseKey, getFieldValue }) => {
          const value = getFieldValue(formData, form, true)

          if (value !== undefined) acc[verboseKey || key] = value
        })

        return acc
      }, {} as Record<string, unknown>)

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
              {fieldGroups?.map(({ title, fields }, index) => (
                <div key={index} className="group">
                  {title && <small>{title}</small>}
                  <div className="fields">{fields.map(item => item)}</div>
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
