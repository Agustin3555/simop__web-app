import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { Checkbox, Combobox, LocalAdd } from '@/pages/Admin/components'
import {
  RepresentanteEmpresaService,
  PaisService,
  ProvinciaService,
  LocalidadService,
} from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await RepresentanteEmpresaService.create({
          cuit: Number(formData.get('cuit')),
          apellido: formData.get('apellido') as string,
          nombre: formData.get('nombre') as string,
          direccion: formData.get('direccion') as string,
          numeroMatricula: formData.get('numeroMatricula') as string,
          vigencia: formData.get('vigencia') === 'on',

          paisId: Number(formData.get('paisId')),
          provinciaId: Number(formData.get('provinciaId')),
          localidadId: Number(formData.get('localidadId')),
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
      <Input name="apellido" title="Apellido" required />
      <Input name="nombre" title="Nombre" required />
      <Input name="direccion" title="Dirección Declarada" required />
      <Combobox
        name="paisId"
        title="País"
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
      <Input name="numeroMatricula" title="Número de Matrícula" required />
      <Checkbox
        name="vigencia"
        title="Vigencia"
        falseText="No vigente"
        trueText="Vigente"
      />
    </LocalAdd>
  )
}

export default Add
