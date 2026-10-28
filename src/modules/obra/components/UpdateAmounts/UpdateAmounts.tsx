import './UpdateAmounts.css'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useHandleAction } from '@/hooks'
import { Button, Toggle } from '@/components'
import { useAppStore } from '@/store/config'
import { apiUrl } from '@/env'
import { TableProvider } from '@/shared/components/Table/contexts/Table/Table.context'
import { NewTable } from '@/shared/components'
import {
  createColumnBehaviors,
  toColumnDefs,
} from '@/shared/core/column.helper'
import { MontosActualizadosObra } from '../../obra.model'
import { ObraServiceExtension } from '../../obra.service'

const columns = createColumnBehaviors(
  toColumnDefs<MontosActualizadosObra>({
    createdAt: {
      type: 'datetime',
      title: 'Fecha',
      withTime: true,
    },
    periodoNombre: {
      type: 'text',
      title: 'Periodo',
      columnConfig: {
        size: 6,
      },
    },
    actualizados: {
      type: 'number',
      title: 'Actualizados',
      columnConfig: {
        size: 10,
      },
    },
    id: {
      type: 'number',
      title: 'ID',
    },
  }),
)

export const UpdateAmounts = () => {
  const [progress, setProgress] = useState(0)
  const toasting = useAppStore(s => s.toasting)

  const { data, refetch } = useQuery({
    queryKey: ['getUpdateAmounts'],
    queryFn: ObraServiceExtension.getUpdateAmounts,
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

      await ObraServiceExtension.updateAmounts()

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
      <TableProvider>
        <NewTable {...{ columns, data }} />
      </TableProvider>
    </div>
  )
}
