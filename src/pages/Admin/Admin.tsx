import { lastVisitedViewEntity } from '@/services/localStorage'
import { Content, Nav, ViewActiveProvider } from './components'
import { EmpresaModel } from './models'

const lastVisitedView = lastVisitedViewEntity.get()

const Admin = () => (
  <ViewActiveProvider initView={lastVisitedView || EmpresaModel.scheme.key}>
    <Nav />
    <Content />
  </ViewActiveProvider>
)

export default Admin
