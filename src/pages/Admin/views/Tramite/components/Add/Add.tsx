import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { TramiteService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      try {
        await TramiteService.create({
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
      <Input name="nombre" title="Tramite" required />
    </LocalAdd>
  )
}

export default Add

