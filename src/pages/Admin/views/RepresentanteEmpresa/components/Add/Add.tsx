import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Combobox, LocalAdd } from '@/pages/Admin/components'
import {
  RepresentanteEmpresaService,
  PaisService,
  TipoRepresentanteEmpresaService,
  ProvinciaService,
  LocalidadService,
} from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await RepresentanteEmpresaService.create({
          nombre: formData.get('nombre') as string,
          paisId: Number(formData.get('paisId')),
          provinciaId: Number(formData.get('provinciaId')),
          localidadId: Number(formData.get('localidadId')),
          tipoRepresentanteEmpresaId: Number(
            formData.get('tipoRepresentanteEmpresaId'),
          ),
        })

        await setSuccess()
      } catch (error) {
        await setError()
      }
    },
  )

  return (
    <LocalAdd {...submitActionResult}>
      <Input
        name="cuitRepresentante"
        title="CUIT Representante"
        type="number"
        required
      />
      <Input name="cuitEmpresa" title="CUIT Empresa" type="number" required />
      <Input name="nombre" title="Nombre" required />
      <Input name="direccionDeclarada" title="Direccion Declarada" required />
      <Input name="direccionDeclarada" title="Direccion Declarada" required />
      <Combobox
        name="paisId"
        title="País"
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
      <Input
        name="numeroMatricula"
        title="Numero Matrícula"
        type="number"
        required
      />
    </LocalAdd>
  )
}

export default Add
