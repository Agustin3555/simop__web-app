import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { ParalizacionObraService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      try {
        await ParalizacionObraService.create({
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
      <Input name="nombre" title="Paralizacion de Obra" required />
    </LocalAdd>
  )
}

export default Add
