import { Input } from '@/components'
import { Combobox, LocalAdd2 } from '@/pages/Admin/components'
import {
  EmpresaService,
  LocalidadService,
  PaisService,
  ProvinciaService,
  RepresentanteEmpresaService,
} from '@/pages/Admin/services'

const Add = () => (
  <LocalAdd2
    createProvider={EmpresaService.create}
    fieldGroups={[
      {
        fields: [
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
                title="provincia"
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
            accessorKey: 'nombre',
            getValue: data => data.get.string,
            component: <Input title="Nombre" required />,
          },
          {
            accessorKey: 'direccion',
            getValue: data => data.get.string,
            component: <Input title="Dirección Declarada" required />,
          },
          {
            accessorKey: 'email',
            getValue: data => data.get.string,
            component: <Input title="Email" required />,
          },
          {
            accessorKey: 'cuit',
            getValue: data => data.get.number,
            component: <Input title="CUIT" required />,
          },
          {
            accessorKey: 'numeroContacto',
            getValue: data => data.get.number,
            component: <Input title="Número De Contacto" required />,
          },
        ],
      },
    ]}
  />
)

export default Add
