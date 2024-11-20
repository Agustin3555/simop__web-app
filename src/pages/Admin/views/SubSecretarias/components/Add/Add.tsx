import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'
import { SubSecretariaService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setLoading, setError, setSuccess }) => {
      setLoading()

      const response = await SubSecretariaService.create({
        nombre: formData.get('nombre') as string,
      })

      if (response) {
        setSuccess()
      } else {
        setError()
      }
    }
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input id="nombre" title="Nombre" required />
    </LocalAdd>
  )
}

export default Add
