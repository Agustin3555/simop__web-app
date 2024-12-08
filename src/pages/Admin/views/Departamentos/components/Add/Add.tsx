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
      <Input name="nombre" title="Nombre" required />
      <Combobox
        name="direccionId"
        title="Dirección"
        provider={DireccionService.getForConnect}
      />
    </LocalAdd>
  )
}

export default Add
