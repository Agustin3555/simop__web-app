import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DireccionService, SubSecretariaService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await DireccionService.create({
          nombre: formData.get('nombre') as string,
          subSecretariaId: Number(formData.get('subSecretariaId')),
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
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
