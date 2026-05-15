import './UpdateAmounts.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useHandleAction } from '@/hooks'
import { Button, Toggle } from '@/components'
import { StaticTable } from '@/pages/Admin/components'
import { ObraService } from '@/pages/Admin/modules/obra/obra.service'
import { formatter } from '@/pages/Admin/meta/date'
import { useAppStore } from '@/store/config'
import { apiUrl } from '@/env'

const getUpdateAmounts = async () => {
  const rowData = await ObraService.getUpdateAmounts()
  return rowData.map(({ createdAt, ...rest }) => ({
    createdAt: formatter(createdAt, true),
    ...rest,
  }))
}

export const UpdateAmounts = () => {
  const [progress, setProgress] = useState(0)
  const toasting = useAppStore(s => s.toasting)

  const { data, refetch } = useQuery({
    queryKey: ['getUpdateAmounts'],
    queryFn: getUpdateAmounts,
    retry: false,
  })

  const updateAction = useHandleAction(async ({ setSuccess, setError }) => {
    try {
      const progressEvent = new EventSource(
        `${apiUrl}/obras/update-amounts/progress`,
      )

      progressEvent.onmessage = event => {
        const { progress }: { progress: number } = JSON.parse(event.data)
        setProgress(progress)
        if (progress === 100) progressEvent.close()
      }

      await ObraService.updateAmounts()

      await refetch()
      await setSuccess()
      toasting('success', 'Montos de obras actualizados con éxito')
    } catch (error) {
      await setError()
    } finally {
      setProgress(0)
    }
  })

  if (!data) return

  return (
    <div className="cmp-update-amounts">
      <header>
        <Button
          text="Actualizar"
          title="Actualizar montos"
          faIcon="fa-solid fa-arrows-rotate"
          hold
          {...{ ...updateAction, progress }}
        />
        {/* <Toggle
          title="Actualizar solo los faltantes"
          faIcon="fa-solid fa-magnifying-glass-dollar"
          size="l"
        /> */}
        <small className="text">
          Esta acción actualizará los montos de contratación de todas las obras
          que cuenten con dicho monto y una fecha de contratación. Se basa en el
          último índice extraído del CAC (Cámara de Argentina de la
          Construcción).
        </small>
      </header>
      <StaticTable
        columns={{
          createdAt: {
            title: 'Fecha',
            size: 13,
          },
          periodoNombre: {
            title: 'Periodo',
            size: 7,
          },
          actualizados: {
            title: 'Actualizados',
            size: 10,
          },
          id: {
            title: 'ID',
          },
        }}
        {...{ data }}
      />
    </div>
  )
}
