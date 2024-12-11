import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { LocalidadService, ProvinciaService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await LocalidadService.create({
          nombre: formData.get('nombre') as string,
          provinciaId: Number(formData.get('provinciaId')),
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Combobox
        name="provinciaId"
        title="Provincia"
        provider={ProvinciaService.getForConnect}
      />
      <Input name="nombre" title="Nombre" required />
    </LocalAdd>
  )
}

export default Add
