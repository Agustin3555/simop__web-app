import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { PaisService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await PaisService.create({
          nombre: formData.get('nombre') as string,
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input name="nombre" title="Pais" required />
    </LocalAdd>
  )
}

export default Add
