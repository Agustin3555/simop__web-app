import { Input } from '@/components'
import { Checkbox, Combobox, LocalAdd2 } from '@/pages/Admin/components'
import {
  RepresentanteEmpresaService,
  PaisService,
  ProvinciaService,
  LocalidadService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={RepresentanteEmpresaService.create}
    fieldGroups={[
      {
        fields: [
          {
            accessorKey: 'cuit',
            getValue: data => data.get.number,
            component: <Input title="CUIT" required />,
          },
          {
            accessorKey: 'apellido',
            getValue: data => data.get.string,
            component: <Input title="Apellido" required />,
          },
          {
            accessorKey: 'nombre',
            getValue: data => data.get.string,
            component: <Input title="Nombre" required />,
          },
          {
            accessorKey: 'direccion',
            getValue: data => data.get.string,
            component: <Input title="Dirección" required />,
          },
          {
            accessorKey: 'numeroMatricula',
            getValue: data => data.get.string,
            component: <Input title="Número de Matrícula" required />,
          },
          {
            accessorKey: 'vigencia',
            getValue: data => data.get.boolean,
            component: <Checkbox title="Vigencia" />,
          },
          {
            accessorKey: 'paisId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="País"
                getForConnectProvider={PaisService.getForConnect}
              />
            ),
          },
          {
            accessorKey: 'provinciaId',
            getValue: data => data.get.number,
            component: (
              <Combobox
                title="Provincia"
                getForConnectProvider={ProvinciaService.getForConnect}
              />
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
            accessorKey: 'tipoRepresentanteEmpresaId',
            getValue: data => data.get.number,
            component: <Input title="Tipo Representante Empresa" />,
          },
        ],
      },
    ]}
  />
)

export default Add
