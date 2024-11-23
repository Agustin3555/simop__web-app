import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DepartamentoService, DireccionService } from '@/pages/Admin/services'
import { AppError } from '@/services/config'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      const createResponse = await DepartamentoService.create({
        nombre: formData.get('nombre') as string,
        direccionId: Number(formData.get('direccionId')),
      })

      if (!createResponse || createResponse instanceof AppError) {
        setError()
      } else {
        setSuccess()
        resetForm()
      }
    }
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
