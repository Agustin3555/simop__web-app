import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { PaisService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      try {
        await PaisService.create({
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
      <Input name="nombre" title="Pais" required />
    </LocalAdd>
  )
}

export default Add
