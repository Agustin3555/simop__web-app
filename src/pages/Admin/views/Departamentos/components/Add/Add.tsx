import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await DepartamentoService.create({
          nombre: formData.get('nombre') as string,
          direccionId: Number(formData.get('direccionId')),
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Combobox
        name="direccionId"
        title="Dirección"
        getForConnectProvider={DireccionService.getForConnect}
      />
      <Input name="nombre" title="Nombre" required />
    </LocalAdd>
  )
}

export default Add
