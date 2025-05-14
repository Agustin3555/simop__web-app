import './Query.css'
import { FormEventHandler, useCallback, useMemo, useRef, useState } from 'react'
import { useQueryActionState } from '@/hooks'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components'
import { AutoCombobox, Report, ReportButton } from '@/pages/Admin/components'
import { ObraModel } from '@/pages/Admin/models'
import { ObraService } from '@/pages/Admin/services'
import { Service } from '@/services/config'
import { Image } from '@react-pdf/renderer'
import { captureElementImage } from '@/pages/Admin/helpers'

const KEY_NAME = 'obra'

const Query = () => {
  const [enabled, setEnabled] = useState(false)
  const [id, setId] = useState<number>()
  const contentRef = useRef<HTMLDivElement | null>(null)

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
        {data && <ReportButton onGenerate={handleReportGenerate} />}
      </header>
      {data && (
        <div className="content" ref={contentRef}>
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
