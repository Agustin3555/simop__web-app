import './Query.css'
import { FormEventHandler, useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Button } from '@/components'
import { AutoCombobox, Report, ReportButton } from '@/pages/Admin/components'
import { Service } from '@/services/config'
import { Image } from '@react-pdf/renderer'
import { captureElementImage, newWindow } from '@/pages/Admin/helpers'
import { TableWindow } from './components'
import { TableWindowProps } from './components/TableWindow/TableWindow'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ObraService } from '@/pages/Admin/modules/obra/obra.service'
import { useMetaModels } from '@/pages/Admin/hooks'
import { MetaModel } from '@/pages/Admin/meta/metaModel'

const KEY_NAME = 'obra'

const Query = () => {
  const [enabled, setEnabled] = useState(false)
  const [id, setId] = useState<number>()
  const contentRef = useRef<HTMLDivElement | null>(null)

  const { getMetaModel } = useMetaModels()
  const ObraMeta = useMemo(() => getMetaModel('obra'), [])!

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

    const detallePropGroups = ObraMeta.getPropGroups('detalle')

    return detallePropGroups?.map(({ props, ...rest }) => ({
      components: props.map(({ key, title, getTableCell, metaModelRef }) => ({
        key,
        title,
        component: getTableCell(data),
        metaModel: metaModelRef && (getMetaModel(metaModelRef) as MetaModel),
      })),
      ...rest,
    }))
  }, [data])

  const handleReportGenerate = useCallback(async () => {
    if (!contentRef.current) return

    const contentElement = contentRef.current

    const { children } = contentElement

    const generators = Array.from(children).map(child => async () => {
      const clonedContent = child.cloneNode(true) as HTMLElement
      clonedContent.classList.add('for-capture')

      const container = document.createElement('div')
      container.classList.add('capture-container')

      container.appendChild(clonedContent)

      document.body.appendChild(container)

      const imageUrl = await captureElementImage(clonedContent)

      document.body.removeChild(container)

      return imageUrl
    })

    const imageUrls = await Promise.all(
      generators.map(generator => generator()),
    )

    return (
      <Report title="Detalle de Obra Básica">
        {imageUrls.map((src, i) => (
          <Image
            key={i}
            style={{ alignSelf: 'center' }}
            {...{ src }}
            break={i !== 0}
          />
        ))}
      </Report>
    )
  }, [])

  const handleOpen = useCallback(
    ({ metaModel, data }: TableWindowProps) =>
      () => {
        const client = new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
            },
          },
        })

        return newWindow({
          title: metaModel.title.plural,
          content: (
            <QueryClientProvider {...{ client }}>
              <TableWindow {...{ metaModel, data }} />
              <ReactQueryDevtools />
            </QueryClientProvider>
          ),
        })
      },
    [data],
  )

  return (
    <div className="cmp-query">
      <header>
        <form onSubmit={handleSubmit}>
          <AutoCombobox
            keyName={KEY_NAME}
            title="Obra"
            metaModel={ObraMeta}
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
        {data && <ReportButton onGenerate={handleReportGenerate} />}
      </header>
      {data && (
        <div className="content" ref={contentRef}>
          {groups?.map(({ key: groupKey, title, components }, i) => (
            <div key={groupKey ?? i} className="section">
              {title && <small>{title}</small>}
              <ul>
                {components.map(({ key, title, component, metaModel }) => (
                  <li key={key}>
                    <div className="group">
                      {groupKey === 'derivados' &&
                        (data[key] as [])?.length !== 0 && (
                          <Button
                            title="Ver tabla"
                            faIcon="fa-solid fa-table-list"
                            type="secondary"
                            size="m"
                            onAction={handleOpen({
                              metaModel: metaModel!,
                              data: data[key],
                            })}
                          />
                        )}
                      <strong>{title}:</strong>
                    </div>
                    {groupKey === 'derivados' ? (
                      <div className="value">{(component as []).length}</div>
                    ) : (
                      <div className="value">{component}</div>
                    )}
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
