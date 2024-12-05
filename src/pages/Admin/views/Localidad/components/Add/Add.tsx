import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { LocalidadService, ProvinciaService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, resetForm, setError, setSuccess }) => {
      try {
        await LocalidadService.create({
          nombre: formData.get('nombre') as string,
          provinciaId: Number(formData.get('provinciaId')),
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
      <Input name="nombre" title="Nombre" required />
      <Combobox
        name="provinciaId"
        title="Dirección"
        provider={ProvinciaService.getForConnect}
      />
    </LocalAdd>
  )
}

export default Add
