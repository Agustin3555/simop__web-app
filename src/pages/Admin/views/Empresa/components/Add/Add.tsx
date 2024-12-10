import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import {
  EmpresaService,
  LocalidadService,
  PaisService,
  ProvinciaService,
  RepresentanteEmpresaService,
} from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await EmpresaService.create({
          cuitEmpresa: Number(formData.get('cuitEmpresa')),
          nombreEmpresa: formData.get('nombreEmpresa') as string,
          direccionDeclarada: formData.get('direccionDeclarada') as string,
          paisId: Number(formData.get('paisId')),
          provinciaId: Number(formData.get('provinciaId')),
          localidadId: Number(formData.get('localidadId')),
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
      <Input name="cuitEmpresa" title="CUIT" type="number" required />
      <Input name="nombreEmpresa" title="Nombre Empresa" required />
      <Input name="direccionDeclarada" title="Dirección Declarada" required />
      <Combobox
        name="PaisId"
        title="Pais"
        provider={PaisService.getForConnect}
      />
      <Combobox
        name="provinciaId"
        title="Provincia"
        provider={ProvinciaService.getForConnect}
      />
      <Combobox
        name="localidadId"
        title="Localidad"
        provider={LocalidadService.getForConnect}
      />
      <Combobox
        name="tipoRepresentanteEmpresaId"
        title="Tipo Representante Empresa"
        provider={RepresentanteEmpresaService.getForConnect}
      />

      <Input name="email" title="Email" required />
      <Input
        name="numeroContacto"
        title="Número Contacto"
        type="number"
        required
      />
    </LocalAdd>
  )
}

export default Add
