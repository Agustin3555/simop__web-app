import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { EstadoObraService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      try {
        await EstadoObraService.create({
          nombre: formData.get('nombre') as string,
        })

        resetForm()
        await setSuccess()
      } catch (error) {
        setError()
      }
    }
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input name="nombre" title="Estado De Obra" required />
    </LocalAdd>
  )
}

export default Add

