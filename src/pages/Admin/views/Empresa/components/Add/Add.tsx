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
          cuit: Number(formData.get('cuit')),
          nombre: formData.get('nombre') as string,
          direccion: formData.get('direccion') as string,
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
      <Input name="cuit" title="CUIT" type="number" required />
      <Input name="nombre" title="Nombre Empresa" required />
      <Input name="direccion" title="Dirección Declarada" required />
      <Combobox
        name="PaisId"
        title="Pais"
        getForConnectProvider={PaisService.getForConnect}
      />
      <Combobox
        name="provinciaId"
        title="Provincia"
        getForConnectProvider={ProvinciaService.getForConnect}
      />
      <Combobox
        name="localidadId"
        title="Localidad"
        getForConnectProvider={LocalidadService.getForConnect}
      />
      <Combobox
        name="tipoRepresentanteEmpresaId"
        title="Tipo Representante Empresa"
        getForConnectProvider={RepresentanteEmpresaService.getForConnect}
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
