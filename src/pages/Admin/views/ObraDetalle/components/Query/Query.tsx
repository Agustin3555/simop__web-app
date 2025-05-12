import './Query.css'
import { FormEventHandler, useCallback, useMemo, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components'
import { AutoCombobox } from '@/pages/Admin/components'
import { ObraModel } from '@/pages/Admin/models'
import { ObraService } from '@/pages/Admin/services'
import { Service } from '@/services/config'

const KEY_NAME = 'obra'

const Query = () => {
  const [enabled, setEnabled] = useState(false)
  const [id, setId] = useState<number>()

  const queryFn = useCallback(() => {
    if (id === undefined) return

    return (ObraService.getOneDetalle as Service['getOne'])(id)
  }, [id])

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: ['obras', id, 'detalle'],
    queryFn,
    retry: false,
    enabled,
  })

  const actionState = useQueryActionState({ status, isFetching })

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async event => {
      event.preventDefault()

      const formData = new FormData(event.currentTarget)
      setId(Number(formData.get(KEY_NAME)))

      enabled ? await refetch() : setEnabled(true)
    },
    [enabled],
  )

  const groups = useMemo(() => {
    if (!data) return

    const detallePropGroups = ObraModel.metaModel.getPropGroups('detalle')

    return detallePropGroups?.map(({ props, ...rest }) => ({
      components: props.map(({ title, getValueComponent }) => ({
        title,
        component: getValueComponent(data),
      })),
      ...rest,
    }))
  }, [data])

  return (
    <div className="cmp-query">
      <header>
        <form onSubmit={handleSubmit}>
          <AutoCombobox
            keyName={KEY_NAME}
            title="Obra"
            metaModel={ObraModel.metaModel}
            required
          />
          <Button
            title="Consultar datos"
            faIcon={`fa-solid ${
              data ? 'fa-arrows-rotate' : 'fa-cloud-arrow-down'
            }`}
            submit
            {...{ actionState }}
          />
        </form>
        {/* ReportButton */}
        {data && <></>}
      </header>
      {data && (
        <div className="content">
          {groups?.map(({ title, components }) => (
            <div className="section">
              {title && <small>{title}</small>}
              <ul>
                {components.map(({ title, component }) => (
                  <li>
                    <strong>{title}</strong>
                    <div className="value">{component}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Query
