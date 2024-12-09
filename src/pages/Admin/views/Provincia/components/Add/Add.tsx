import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { ProvinciaService, PaisService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await ProvinciaService.create({
          nombre: formData.get('nombre') as string,
          paisId: Number(formData.get('paisId')),
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
        name="paisId"
        title="País"
        provider={PaisService.getForConnect}
      />
    </LocalAdd>
  )
}

export default Add
