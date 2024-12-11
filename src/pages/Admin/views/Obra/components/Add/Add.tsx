import { useSubmitAction } from '@/hooks'
import { Input } from '@/components'
import { LocalAdd, Combobox, InputArea } from '@/pages/Admin/components'
import {
  ObraService,
  PaisService,
  ProvinciaService,
  LocalidadService,
  EstadoObraService,
  EmpresaService,
} from '@/pages/Admin/services'

const Add = () => {
  const submitActionResult = useSubmitAction(
    async ({ formData, setError, setSuccess }) => {
      try {
        await ObraService.create({
          empresaId: Number(formData.get('empresaId')),
          nombre: formData.get('nombre') as string,
          paisId: Number(formData.get('paisId')),
          provinciaId: Number(formData.get('provinciaId')),
          localidadId: Number(formData.get('localidadId')),
          id: Number(formData.get('Id')),
          numeroResolucion: Number(formData.get('numeroResolucion')),
          anioResolucion: Number(formData.get('anioResolucion')),
          numeroContratacion: Number(formData.get('numeroContratacion')),
          anioContratacion: Number(formData.get('anioContratacion')),
          montoContratacion: Number(formData.get('montoContratacion')),
          numeroExpediente: Number(formData.get('numeroExpediente')),
          nomenclaturaCatastral: formData.get(
            'nomenclaturaCatastral',
          ) as string,
          plazoMeses: Number(formData.get('plazoMeses')),
          plazoDias: Number(formData.get('plazoDias')),
          fechaInicio: formData.get('fechaInicio') as string,
          fechaFin: formData.get('fechaFin') as string,
          observaciones: formData.get('observaciones') as string,
          creado: formData.get('creado') as string,
          modificado: formData.get('modificado') as string,
          estadoObraId: Number(formData.get('estadoObraId')),
          financiamientoId: Number(formData.get('financiamientoId')),
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
        name="empresaId"
        title="Empresa"
        provider={EmpresaService.getForConnect}
      />
      <Input
        name="numeroResolucion"
        title="Numero de Resolución"
        type="number"
        required
      />
      <Input
        name="anioResolucion"
        title="Año de Resolución"
        type="number"
        required
      />
      <Input name="nombre" title="Nombre" required />
      <Combobox
        name="financiamientoId"
        title="Financiamiento"
        provider={LocalidadService.getForConnect}
      />
      <Input
        name="nomenclaturaCatastral"
        title="Nomenclatura Catastral"
        required
      />
      <Input name="fechaInicio" title="Fecha de Inicio" type="date" required />
      <Input name="fechaFin" title="Fecha de Fin" type="date" required />
      <Input
        name="numeroContratacion"
        title="Número de Contratacion"
        type="number"
        required
      />
      <Input
        name="montoContratacion"
        title="Monto de Contratacion"
        type="number"
        required
      />
      <Input
        name="numeroExpediente"
        title="Número de Expediente"
        type="number"
        required
      />
      <Input name="plazoMeses" title="Plazo en Meses" type="number" required />
      <Input name="plazoDias" title="Plazo en Días" type="number" required />
      <Combobox
        name="PaisId"
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
        name="estadoObraId"
        title="Estado de Obra"
        provider={EstadoObraService.getForConnect}
      />
      <InputArea name="observaciones" title="Observaciones" />
    </LocalAdd>
  )
}

export default Add
