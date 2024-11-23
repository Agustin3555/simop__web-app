import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { SubSecretariaService } from '@/pages/Admin/services'
import { AppError } from '@/services/config'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      const createResponse = await SubSecretariaService.create({
        nombre: formData.get('nombre') as string,
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
    </LocalAdd>
  )
}

export default Add
