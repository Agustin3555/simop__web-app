import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import { DatosService, PaisService } from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await DatosService.create({
          cuit: Number(formData.get('cuit')),
          nombreEmpresa: formData.get('nombreEmpresa') as string,
          direccionDeclarada: formData.get('direccionDeclarada') as string,
          paisId: Number(formData.get('paisId')),
          numeroContacto: Number(formData.get('numeroContacto')),
          email: formData.get('email') as string,
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input name="cuit" title="CUIT" type="number" required />
      <Input name="nombreEmpresa" title="Nombre Empresa" required />
      <Input name="direccionDeclarada" title="Dirección Declarada" required />
      <Combobox
        name="PaisId"
        title="Pais"
        provider={PaisService.getForConnect}
      />
      <Input name="email" title="Email" required />
      <Input name="numeroContacto" title="Número Contacto" type="number" required />
    </LocalAdd>
  )
}

export default Add
