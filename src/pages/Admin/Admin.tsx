import { Content, Nav, ViewActiveProvider } from './components'
import { EmpresaModel } from './models'

/*
  TODO: en un futuro se podría obtener por local storage o por la cuenta la
  última view visitada
*/
const Admin = () => (
  <ViewActiveProvider initView={EmpresaModel.scheme.accessorKey}>
    <Nav />
    <Content />
  </ViewActiveProvider>
)

export default Admin
