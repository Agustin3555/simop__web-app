import { Input } from '@/components'
import {
  Combobox,
  InputArea,
  Checkbox,
  LocalAdd2,
} from '@/pages/Admin/components'
import {
  ObraService,
  LocalidadService,
  EstadoObraService,
  EmpresaService,
  TipoTematicaObraService,
  ProgramaObraService,
  FinanciamientoService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={ObraService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'numero',
            getValue: data => data.get.number,
            component: <Input title="Número de Obra" type="number" required />,
          },
          {
            accessorKey: 'nombre',
            getValue: data => data.get.string,
            component: <Input title="Nombre de Obra" required />,
          },
          {
            accessorKey: 'numeroExpediente',
            getValue: data => data.get.number,
            component: (
              <Input title="Número de Expediente" type="number" required />
            ),
          },
          {
            accessorKey: 'numeroResolucion',
            getValue: data => data.get.number,
            component: (
              <Input title="Numero de Resolución" type="number" required />
            ),
          },
          {
            accessorKey: 'anioResolucion',
            getValue: data => data.get.number,
            component: (
              <Input
                title="Año de Resolución"
                type="number"
                required
                long="s"
              />
            ),
          },
          {
            accessorKey: 'numeroContratacion',
            getValue: data => data.get.number,
            component: (
              <Input title="Número de Contratación" type="number" required />
            ),
          },
          {
            accessorKey: 'anioContratacion',
            getValue: data => data.get.number,
            component: (
              <Input
                title="Año de Contratación"
                type="number"
                required
                long="s"
              />
            ),
          },
          {
            accessorKey: 'montoContratacion',
            getValue: data => data.get.number,
            component: (
              <Input title="Monto de Contratación" type="number" required />
            ),
          },
          {
            accessorKey: 'tipoContratacionId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Tipo de Contratación"
                getForConnectProvider={FinanciamientoService.getForConnect} // TODO
                required
              />
            ),
          },
          {
            accessorKey: 'tipoFinanciamientoId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Financiamiento"
                getForConnectProvider={FinanciamientoService.getForConnect}
                required
              />
            ),
          },
          {
            accessorKey: 'tipoProgramaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Programa"
                getForConnectProvider={ProgramaObraService.getForConnect}
                required
              />
            ),
          },
          {
            accessorKey: 'tipoTematicaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Temática"
                getForConnectProvider={TipoTematicaObraService.getForConnect}
                required
              />
            ),
          },
          {
            accessorKey: 'tipoEstadoId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Estado"
                getForConnectProvider={EstadoObraService.getForConnect}
                required
              />
            ),
          },
          {
            accessorKey: 'fechaInicio',
            getValue: data => data.get.string,
            component: <Input title="Fecha de Inicio" type="date" required />,
          },
          {
            accessorKey: 'fechaFin',
            getValue: data => data.get.string,
            component: <Input title="Fecha de Fin" type="date" required />,
          },
          {
            accessorKey: 'plazoMeses',
            getValue: data => data.get.number,
            component: (
              <Input title="Plazo en Meses" type="number" required long="s" />
            ),
          },
          {
            accessorKey: 'plazoDias',
            getValue: data => data.get.number,
            component: (
              <Input title="Plazo en Días" type="number" required long="s" />
            ),
          },
          {
            accessorKey: 'localidadId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Localidad"
                getForConnectProvider={LocalidadService.getForConnect}
                required
              />
            ),
          },
          {
            accessorKey: 'direccion',
            getValue: data => data.get.string,
            component: <Input title="Dirección" required />,
          },
          {
            accessorKey: 'lugar',
            getValue: data => data.get.string,
            component: <Input title="Lugar" required />,
          },
          {
            accessorKey: 'nomenclaturaCatastral',
            getValue: data => data.get.string,
            component: <Input title="Nomenclatura Catastral" required />,
          },
          {
            accessorKey: 'observaciones',
            getValue: data => data.get.string,
            component: <InputArea title="Observaciones generales" />,
          },
        ],
      },
      {
        title: 'Modalidad',
        fields: [
          {
            accessorKey: 'obraNueva',
            getValue: data => data.get.boolean,
            component: <Checkbox title="Obra nueva" />,
          },
          {
            accessorKey: 'porcentajeObraNueva',
            getValue: data => data.get.number,
            component: (
              <Input title="Porcentaje de obra nueva" type="number" long="s" />
            ),
          },
          {
            accessorKey: 'metrosCuadradosObraNueva',
            getValue: data => data.get.number,
            component: (
              <Input
                title="m² (metros cuadrados) de obra nueva"
                type="number"
                long="s"
              />
            ),
          },
          {
            accessorKey: 'metrosLinealesObraNueva',
            getValue: data => data.get.number,
            component: (
              <Input
                title="m (metros lineales) de obra nueva"
                type="number"
                long="s"
              />
            ),
          },
          {
            accessorKey: 'observacionesObraNueva',
            getValue: data => data.get.string,
            component: <InputArea title="Observaciones de obra nueva" />,
          },
          {
            accessorKey: 'obraRefaccionada',
            getValue: data => data.get.boolean,
            component: <Checkbox title="Obra refaccionada" />,
          },
          {
            accessorKey: 'porcentajeObraRefaccionada',
            getValue: data => data.get.number,
            component: (
              <Input
                title="Porcentaje de obra refaccionada"
                type="number"
                long="s"
              />
            ),
          },
          {
            accessorKey: 'metrosCuadradosObraRefaccionada',
            getValue: data => data.get.number,
            component: (
              <Input
                title="m² (metros cuadrados) de obra refaccionada"
                type="number"
                long="s"
              />
            ),
          },
          {
            accessorKey: 'metrosLinealesObraRefaccionada',
            getValue: data => data.get.number,
            component: (
              <Input
                title="m (metros lineales) de obra refaccionada"
                type="number"
                long="s"
              />
            ),
          },
          {
            accessorKey: 'observacionesObraRefaccionada',
            getValue: data => data.get.string,
            component: <InputArea title="Observaciones de obra refaccionada" />,
          },
        ],
      },
      {
        title: 'Profesionales',
        // TODO: Representantes
        // TODO: Inspectores
        fields: [],
      },
    ]}
  />
)

export default Add
