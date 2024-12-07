import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { InspectorService, TipoProfesionService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await InspectorService.create({
          cuil: Number(formData.get('cuil')),
          apellido: formData.get('apellido') as string,
          nombre: formData.get('nombre') as string,
          tiposProfesiones: formData.getAll('tiposProfesiones').map(Number),
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input name="cuil" title="CUIL" type="number" required />
      <Input name="apellido" title="Apellido" required />
      <Input name="nombre" title="Nombre" required />
      <Combobox
        name="tiposProfesiones"
        title="Profesiones"
        multiple
        provider={TipoProfesionService.getForConnect}
      />
    </LocalAdd>
  )
}

export default Add
