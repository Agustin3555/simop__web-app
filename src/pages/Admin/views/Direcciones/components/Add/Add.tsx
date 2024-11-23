import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DireccionService, SubSecretariaService } from '@/pages/Admin/services'
import { AppError } from '@/services/config'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      const createResponse = await DireccionService.create({
        nombre: formData.get('nombre') as string,
        subSecretariaId: Number(formData.get('subSecretariaId')),
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
        name="subSecretariaId"
        title="Subsecretaría"
        provider={SubSecretariaService.getForConnect}
      />
    </LocalAdd>
  )
}

export default Add
