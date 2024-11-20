import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd } from '@/pages/Admin/components'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setLoading, setError, setSuccess }) => {}
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input id="nombre" title="Nombre" required />
    </LocalAdd>
  )
}

export default Add
