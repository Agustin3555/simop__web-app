import { lastVisitedViewEntity } from '@/services/localStorage'
import { Content, Nav, ViewActiveProvider } from './components'
import { SubSecretariaModel } from './models'

const lastVisitedView = lastVisitedViewEntity.get()

const Admin = () => (
  <ViewActiveProvider
    initView={lastVisitedView || SubSecretariaModel.scheme.key}
  >
    <Nav />
    <Content />
  </ViewActiveProvider>
)

export default Admin
