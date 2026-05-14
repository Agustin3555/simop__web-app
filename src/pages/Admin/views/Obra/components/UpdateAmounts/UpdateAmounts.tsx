import './UpdateAmounts.css'
import { useQuery } from '@tanstack/react-query'
import { useHandleAction } from '@/hooks'
import { Button } from '@/components'
import { StaticTable } from '@/pages/Admin/components'
import { ObraService } from '@/pages/Admin/modules/obra/obra.service'
import { formatter } from '@/pages/Admin/meta/date'

const getUpdateAmounts = async () => {
  const rowData = await ObraService.getUpdateAmounts()
  return rowData.map(({ createdAt, ...rest }) => ({
    createdAt: formatter(createdAt, true),
    ...rest,
  }))
}

export const UpdateAmounts = () => {
  const { data, refetch } = useQuery({
    queryKey: ['getUpdateAmounts'],
    queryFn: getUpdateAmounts,
    retry: false,
  })

  const updateAction = useHandleAction(async ({ setSuccess, setError }) => {
    try {
      await ObraService.updateAmounts()
      await setSuccess()
      await refetch()
    } catch (error) {
      await setError()
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
          {...updateAction}
        />
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
            size: 10,
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
