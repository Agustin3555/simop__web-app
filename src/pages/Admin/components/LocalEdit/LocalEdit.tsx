import './LocalEdit.css'
import {
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useAppStore } from '@/store/config'
import { useMutationActionState } from '@/hooks'
import {
  useMetaModel,
  useLocalView,
  useTable,
  useConfigModule,
} from '../../hooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Loader } from '@/components'
import { FallbackBanner, Form } from '..'
import { LooseEntity } from '@/models/config'
import { buildConfigKey } from '../../helpers'

interface LocalEditBodyProps {
  editId: number
}

const LocalEditBody = ({ editId }: LocalEditBodyProps) => {
  const { key, title, service, anchorField, editProps } = useMetaModel()
  const { groups } = editProps

  const toasting = useAppStore(store => store.toasting)
  const { selectedConfig } = useConfigModule()
  const { deselectRows } = useTable().states
  const queryClient = useQueryClient()

  const { data: selectedEntity } = useQuery({
    queryKey: [key, 'one', editId],
    queryFn: () => service.getOne(editId),
  })

  const fieldGroups = useMemo(() => {
    if (!selectedEntity) return

    return groups.map(({ props, ...rest }) => ({
      fields: props.map(({ key, getFormField }) =>
        getFormField(selectedEntity![key], true),
      ),
      ...rest,
    }))
  }, [selectedEntity])

  const mutationFn = useCallback(
    async (form: HTMLFormElement) => {
      const formData = new FormData(form)

      const updateData: Record<string, unknown> = {}

      groups.forEach(({ props }) =>
        Object.values(props).forEach(
          ({ key, verboseKey, getFormFieldValue: getFieldValue }) => {
            const value = getFieldValue(formData, form, true)

            if (value !== undefined) updateData[verboseKey || key] = value
          },
        ),
      )

      const editEntity = await service.updateOne!(editId, updateData)

      queryClient.setQueryData<LooseEntity[]>(
        buildConfigKey(key, selectedConfig),
        oldData => {
          if (!oldData) return

          const index = oldData.findIndex(item => item.id === editId)
          if (index === -1) return

          const newData = [...oldData]
          newData[index] = editEntity
          return newData
        },
      )
    },
    [editId],
  )

  const onSuccess = useCallback(() => {
    toasting('success', 'Cambios aplicados con éxito')
    deselectRows()

    queryClient.invalidateQueries({ queryKey: [key, 'one', editId] })
  }, [editId])

  const { status, isPending, mutate } = useMutation({ mutationFn, onSuccess })
  const actionState = useMutationActionState({ status, isPending })

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()

    mutate(event.currentTarget)
  }

  return selectedEntity ? (
    <>
      <h2>
        Editando:
        <strong className="button-look s">{selectedEntity[anchorField]}</strong>
      </h2>
      <Form {...{ actionState, handleSubmit, fieldGroups }} />
    </>
  ) : (
    <FallbackBanner>
      <Loader />
      Cargando datos de el/la <strong>{title.singular}</strong>
    </FallbackBanner>
  )
}

const LocalEdit = () => {
  const [editId, setEditId] = useState<number>()

  const { title } = useMetaModel()
  const { localView, setLocalView } = useLocalView()
  const { selectedRowIds } = useTable().states

  const selectedId = selectedRowIds.length === 1 ? selectedRowIds[0] : undefined

  const handleClick = useCallback(() => setLocalView('query'), [])

  useEffect(() => {
    if (selectedId === undefined) setEditId(undefined)
    // Se congela selectedId mientras no se está en 'edit'
    if (localView === 'edit' && selectedId !== undefined) setEditId(selectedId)
  }, [localView, selectedId])

  return (
    <div className="cmp-local-edit">
      {editId === undefined ? (
        <FallbackBanner>
          Seleccione un/a <strong>{title.singular}</strong> a editar en{' '}
          <Button
            text="Consultar"
            faIcon="fa-solid fa-search"
            size="m"
            type="secondary"
            inverted
            onAction={handleClick}
          />
        </FallbackBanner>
      ) : (
        <LocalEditBody {...{ editId }} />
      )}
    </div>
  )
}

export default LocalEdit
