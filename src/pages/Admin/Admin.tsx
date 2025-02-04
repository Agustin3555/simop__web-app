import { lastVisitedViewEntity } from '@/services/localStorage'
import { Content, Nav, ViewActiveProvider } from './components'
import { SubSecretariaModel } from './models'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const lastVisitedView = lastVisitedViewEntity.get()
const client = new QueryClient()

const Admin = () => (
  <ViewActiveProvider
    initView={lastVisitedView || SubSecretariaModel.scheme.key}
  >
    <QueryClientProvider {...{ client }}>
      <Nav />
      <Content />
    </QueryClientProvider>
  </ViewActiveProvider>
)

export default Admin
