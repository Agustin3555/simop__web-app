import { Input } from '@/components'
import {
  Combobox,
  InputArea,
  Checkbox,
  LocalAdd,
  FieldGenerator,
} from '@/pages/Admin/components'
import {
  ObraService,
  LocalidadService,
  EstadoObraService,
  EmpresaService,
  TipoTematicaObraService,
  ProgramaObraService,
  FinanciamientoService,
  TipoContratacionObraService,
  RepresentanteEmpresaService,
  TipoRepresentanteEmpresaService,
  TipoProfesionService,
  InspectorService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd
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
            accessorKey: 'empresaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Empresa"
                getForConnectProvider={EmpresaService.getForConnect}
              />
            ),
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
              <Input title="Número de Resolución" type="number" required />
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
            accessorKey: 'tipoContratacionObraId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Tipo de Contratación"
                getForConnectProvider={
                  TipoContratacionObraService.getForConnect
                }
              />
            ),
          },
          {
            accessorKey: 'tipoFinanciamientoObraId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Financiamiento"
                getForConnectProvider={FinanciamientoService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'tipoProgramaObraId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Programa"
                getForConnectProvider={ProgramaObraService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'tipoTematicaObraId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Temática"
                getForConnectProvider={TipoTematicaObraService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'tipoEstadoObraId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Estado"
                getForConnectProvider={EstadoObraService.getForConnect}
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
        fields: [
          // {
          //   accessorKey: 'representantes',
          //   component: (
          //     <FieldGenerator title="Representantes">
          //       <Combobox
          //         title="Representante"
          //         getForConnectProvider={
          //           RepresentanteEmpresaService.getForConnect
          //         }
          //       />
          //       <Combobox
          //         title="Tipo de Representante"
          //         getForConnectProvider={
          //           TipoRepresentanteEmpresaService.getForConnect
          //         }
          //       />
          //     </FieldGenerator>
          //   ),
          // },
          // {
          //   accessorKey: 'inspectores',
          //   component: (
          //     <FieldGenerator title="Inspectores">
          //       <Combobox
          //         title="Inspector"
          //         getForConnectProvider={InspectorService.getForConnect}
          //       />
          //       <Combobox
          //         title="Profesión"
          //         getForConnectProvider={TipoProfesionService.getForConnect}
          //       />
          //     </FieldGenerator>
          //   ),
          // },
        ],
      },
    ]}
  />
)

export default Add
