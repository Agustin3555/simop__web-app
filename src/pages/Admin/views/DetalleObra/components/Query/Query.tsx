import './Query.css'
import {
  FormEventHandler,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { useQueryActionState } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components'
import { AutoCombobox } from '@/pages/Admin/components'
import { ObraModel } from '@/pages/Admin/models'
import { ObraService } from '@/pages/Admin/services'
import { getFlatProps } from '@/pages/Admin/services/config'

const KEY_NAME = 'obra'

const Query = () => {
  const [enabled, setEnabled] = useState(false)
  const [id, setId] = useState<number>()

  const { data, status, isFetching, refetch } = useQuery({
    queryKey: ['obras', id, 'detail'],
    queryFn: () => ObraService.getOneDetail(id),
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

  const fields = useMemo(() => {
    if (!data) return

    const flatProps = getFlatProps(ObraModel.scheme)

    const acc: { title: string; value: ReactNode }[] = []

    Object.keys(data).forEach(key => {
      const prop = flatProps[key]

      if (prop === undefined) return

      const { title, getValueComponent } = prop

      acc.push({ title, value: getValueComponent(data) })
    })

    return acc
  }, [data])

  return (
    <div className="cmp-query">
      <header>
        <form onSubmit={handleSubmit}>
          <AutoCombobox
            keyName={KEY_NAME}
            title="Obra"
            scheme={ObraModel.scheme}
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
        <ul>
          {fields?.map(({ title, value }) => (
            <li>
              <strong>{title}</strong>
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Query
